import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import type { Couple, Profile } from '@/lib/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PartnerState = {
  // Local state (backwards compatible - used by 14+ files)
  myCode: string | null;
  partnerCode: string | null;
  partnerName: string | null;
  isConnected: boolean;

  // Supabase state
  userId: string | null;
  coupleId: string | null;
  couple: Couple | null;
  partnerProfile: Profile | null;
  isOnline: boolean; // true when logged into Supabase AND coupled
  isSyncing: boolean;
  syncError: string | null;
};

type PartnerActions = {
  // Local actions (backwards compatible)
  generateCode: () => string;
  setPartnerName: (name: string) => void;
  connectWithCode: (code: string) => void;
  disconnect: () => void;

  // Supabase actions
  createCoupleOnline: () => Promise<string>; // returns invite code
  joinCoupleOnline: (code: string) => Promise<void>;
  syncFromSupabase: () => Promise<void>;
  setUserId: (id: string | null) => void;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SAMEN-${code}`;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const usePartnerStore = create<PartnerState & PartnerActions>()(
  persist(
    (set, get) => ({
      // Local state
      myCode: null,
      partnerCode: null,
      partnerName: null,
      isConnected: false,

      // Supabase state
      userId: null,
      coupleId: null,
      couple: null,
      partnerProfile: null,
      isOnline: false,
      isSyncing: false,
      syncError: null,

      // -----------------------------------------------------------------------
      // Local actions (backwards compatible)
      // -----------------------------------------------------------------------

      generateCode: () => {
        const existing = get().myCode;
        if (existing) return existing;
        const code = makeCode();
        set({ myCode: code });
        return code;
      },

      setPartnerName: (name) => {
        set({ partnerName: name });
      },

      connectWithCode: (code) => {
        set({ partnerCode: code.toUpperCase(), isConnected: true });
      },

      disconnect: () => {
        set({
          myCode: null,
          partnerCode: null,
          partnerName: null,
          isConnected: false,
          coupleId: null,
          couple: null,
          partnerProfile: null,
          isOnline: false,
        });
      },

      // -----------------------------------------------------------------------
      // Supabase actions
      // -----------------------------------------------------------------------

      setUserId: (id) => {
        set({ userId: id });
      },

      createCoupleOnline: async () => {
        try {
          set({ isSyncing: true, syncError: null });

          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) throw new Error('Niet ingelogd');

          const inviteCode = makeCode();

          const { data: couple, error } = await supabase
            .from('couples')
            .insert({
              partner_a: user.id,
              invite_code: inviteCode,
              status: 'pending',
            })
            .select()
            .single();

          if (error) throw error;

          // Link profile to couple
          await supabase
            .from('profiles')
            .update({ couple_id: couple.id })
            .eq('id', user.id);

          set({
            myCode: inviteCode,
            couple,
            coupleId: couple.id,
            userId: user.id,
          });

          return inviteCode;
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Koppel aanmaken mislukt';
          set({ syncError: message });
          throw err;
        } finally {
          set({ isSyncing: false });
        }
      },

      joinCoupleOnline: async (code: string) => {
        try {
          set({ isSyncing: true, syncError: null });

          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) throw new Error('Niet ingelogd');

          // Find couple by invite code
          const { data: couple, error: findError } = await supabase
            .from('couples')
            .select('*')
            .eq('invite_code', code.toUpperCase())
            .eq('status', 'pending')
            .single();

          if (findError || !couple) {
            throw new Error('Ongeldige uitnodigingscode');
          }

          if (couple.partner_a === user.id) {
            throw new Error('Je kunt niet je eigen koppel joinen');
          }

          // Set partner_b and activate
          const { data: updatedCouple, error: updateError } = await supabase
            .from('couples')
            .update({
              partner_b: user.id,
              status: 'active',
            })
            .eq('id', couple.id)
            .select()
            .single();

          if (updateError) throw updateError;

          // Link profile to couple
          await supabase
            .from('profiles')
            .update({ couple_id: updatedCouple.id })
            .eq('id', user.id);

          // Load partner profile
          const { data: partner } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', couple.partner_a)
            .single();

          set({
            couple: updatedCouple,
            coupleId: updatedCouple.id,
            userId: user.id,
            partnerProfile: partner ?? null,
            partnerName: partner?.name ?? get().partnerName,
            partnerCode: code.toUpperCase(),
            isConnected: true,
            isOnline: true,
          });
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Koppel joinen mislukt';
          set({ syncError: message });
          throw err;
        } finally {
          set({ isSyncing: false });
        }
      },

      syncFromSupabase: async () => {
        try {
          set({ isSyncing: true, syncError: null });

          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (!user) {
            set({ userId: null, isOnline: false });
            return;
          }

          set({ userId: user.id });

          // Get profile to find couple_id
          const { data: profile } = await supabase
            .from('profiles')
            .select('couple_id')
            .eq('id', user.id)
            .single();

          if (!profile?.couple_id) {
            set({ coupleId: null, couple: null, partnerProfile: null, isOnline: false });
            return;
          }

          // Load couple
          const { data: couple, error: coupleError } = await supabase
            .from('couples')
            .select('*')
            .eq('id', profile.couple_id)
            .single();

          if (coupleError) throw coupleError;

          // Load partner profile
          const partnerId =
            couple.partner_a === user.id ? couple.partner_b : couple.partner_a;

          let partnerProfile: Profile | null = null;
          if (partnerId) {
            const { data } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', partnerId)
              .single();
            partnerProfile = data ?? null;
          }

          const isActive = couple.status === 'active' && partnerId != null;

          set({
            couple,
            coupleId: couple.id,
            partnerProfile,
            partnerName: partnerProfile?.name ?? get().partnerName,
            isConnected: isActive || get().isConnected,
            isOnline: isActive,
            myCode: couple.status === 'pending' ? couple.invite_code : get().myCode,
          });
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : 'Synchronisatie mislukt';
          set({ syncError: message });
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: 'partner-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Don't persist transient state
      partialize: (state) => ({
        myCode: state.myCode,
        partnerCode: state.partnerCode,
        partnerName: state.partnerName,
        isConnected: state.isConnected,
        userId: state.userId,
        coupleId: state.coupleId,
      }),
    },
  ),
);
