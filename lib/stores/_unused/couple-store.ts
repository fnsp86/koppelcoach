import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Couple, Profile } from '@/lib/types';

type CoupleState = {
  couple: Couple | null;
  partner: Profile | null;
  inviteCode: string | null;
  isLoading: boolean;
  error: string | null;
};

type CoupleActions = {
  createCouple: () => Promise<void>;
  joinCouple: (code: string) => Promise<void>;
  loadCouple: () => Promise<void>;
  generateInviteCode: () => string;
};

export const useCoupleStore = create<CoupleState & CoupleActions>()(
  (set, get) => ({
    couple: null,
    partner: null,
    inviteCode: null,
    isLoading: false,
    error: null,

    generateInviteCode: () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return `SAMEN-${code}`;
    },

    createCouple: async () => {
      try {
        set({ isLoading: true, error: null });

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Niet ingelogd');

        const inviteCode = get().generateInviteCode();

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

        set({ couple, inviteCode });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Koppel aanmaken mislukt';
        set({ error: message });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    joinCouple: async (code: string) => {
      try {
        set({ isLoading: true, error: null });

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
          partner: partner ?? null,
          inviteCode: null,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Koppel joinen mislukt';
        set({ error: message });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    loadCouple: async () => {
      try {
        set({ isLoading: true, error: null });

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Niet ingelogd');

        // Get profile to find couple_id
        const { data: profile } = await supabase
          .from('profiles')
          .select('couple_id')
          .eq('id', user.id)
          .single();

        if (!profile?.couple_id) {
          set({ couple: null, partner: null });
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

        let partner: Profile | null = null;
        if (partnerId) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', partnerId)
            .single();
          partner = data ?? null;
        }

        set({
          couple,
          partner,
          inviteCode: couple.status === 'pending' ? couple.invite_code : null,
        });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Koppelgegevens laden mislukt';
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },
  }),
);
