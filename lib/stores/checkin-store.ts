import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { CheckIn } from '@/lib/types';

type CheckInState = {
  todayCheckIn: CheckIn | null;
  partnerCheckIn: CheckIn | null;
  history: CheckIn[];
  isLoading: boolean;
  error: string | null;
};

type CheckInActions = {
  submitCheckIn: (mood: CheckIn['mood'], pulse: CheckIn['pulse']) => Promise<void>;
  loadTodayCheckIn: () => Promise<void>;
  loadHistory: (days: number) => Promise<void>;
};

function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useCheckInStore = create<CheckInState & CheckInActions>()(
  (set) => ({
    todayCheckIn: null,
    partnerCheckIn: null,
    history: [],
    isLoading: false,
    error: null,

    submitCheckIn: async (mood, pulse) => {
      try {
        set({ isLoading: true, error: null });

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Niet ingelogd');

        const { data: profile } = await supabase
          .from('profiles')
          .select('couple_id')
          .eq('id', user.id)
          .single();

        if (!profile?.couple_id) {
          throw new Error('Je bent nog niet gekoppeld');
        }

        const today = todayDateString();

        // Upsert: update if already checked in today, insert otherwise
        const { data: checkIn, error } = await supabase
          .from('check_ins')
          .upsert(
            {
              user_id: user.id,
              couple_id: profile.couple_id,
              mood,
              pulse,
              date: today,
            },
            { onConflict: 'user_id,date' },
          )
          .select()
          .single();

        if (error) throw error;

        set({ todayCheckIn: checkIn });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Check-in opslaan mislukt';
        set({ error: message });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    loadTodayCheckIn: async () => {
      try {
        set({ isLoading: true, error: null });

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Niet ingelogd');

        const { data: profile } = await supabase
          .from('profiles')
          .select('couple_id')
          .eq('id', user.id)
          .single();

        if (!profile?.couple_id) return;

        const today = todayDateString();

        // Load own check-in
        const { data: myCheckIn } = await supabase
          .from('check_ins')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', today)
          .single();

        // Load partner check-in
        const { data: couple } = await supabase
          .from('couples')
          .select('partner_a, partner_b')
          .eq('id', profile.couple_id)
          .single();

        let partnerCheckIn: CheckIn | null = null;
        if (couple) {
          const partnerId =
            couple.partner_a === user.id
              ? couple.partner_b
              : couple.partner_a;

          if (partnerId) {
            const { data } = await supabase
              .from('check_ins')
              .select('*')
              .eq('user_id', partnerId)
              .eq('date', today)
              .single();
            partnerCheckIn = data ?? null;
          }
        }

        set({
          todayCheckIn: myCheckIn ?? null,
          partnerCheckIn,
        });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Check-in laden mislukt';
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },

    loadHistory: async (days: number) => {
      try {
        set({ isLoading: true, error: null });

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Niet ingelogd');

        const { data: profile } = await supabase
          .from('profiles')
          .select('couple_id')
          .eq('id', user.id)
          .single();

        if (!profile?.couple_id) return;

        const since = new Date();
        since.setDate(since.getDate() - days);
        const sinceStr = since.toISOString().slice(0, 10);

        const { data: history, error } = await supabase
          .from('check_ins')
          .select('*')
          .eq('couple_id', profile.couple_id)
          .gte('date', sinceStr)
          .order('date', { ascending: false });

        if (error) throw error;

        set({ history: history ?? [] });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Geschiedenis laden mislukt';
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },
  }),
);
