import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/types';

type AuthState = {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isOnboarded: boolean;
  error: string | null;
};

type AuthActions = {
  loadSession: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
};

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
  session: null,
  profile: null,
  isLoading: true,
  isOnboarded: false,
  error: null,

  loadSession: async () => {
    try {
      set({ isLoading: true, error: null });

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        set({
          session,
          profile: profile ?? null,
          isOnboarded: profile?.couple_id != null,
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Sessie laden mislukt';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      set({ isLoading: true, error: null });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (error) throw error;

      if (data.session) {
        // Create profile row
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.session.user.id,
            email,
            name,
          })
          .select()
          .single();

        if (profileError) throw profileError;

        set({ session: data.session, profile });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Aanmelden mislukt';
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.session.user.id)
        .single();

      set({
        session: data.session,
        profile: profile ?? null,
        isOnboarded: profile?.couple_id != null,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Inloggen mislukt';
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true, error: null });

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({
        session: null,
        profile: null,
        isOnboarded: false,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Uitloggen mislukt';
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (updates: Partial<Profile>) => {
    try {
      set({ error: null });

      const { profile } = get();
      if (!profile) throw new Error('Niet ingelogd');

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile.id)
        .select()
        .single();

      if (error) throw error;

      set({
        profile: data,
        isOnboarded: data.couple_id != null,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Profiel bijwerken mislukt';
      set({ error: message });
      throw err;
    }
  },
}));
