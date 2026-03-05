import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TimelineEntry, Momentje } from '@/lib/types';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}


type VerhaalState = {
  entries: TimelineEntry[];
  momentjes: Momentje[];
};

type VerhaalActions = {
  addEntry: (entry: Omit<TimelineEntry, 'id' | 'created_at'>, customDate?: string) => void;
  removeEntry: (id: string) => void;
  addMomentje: (
    momentje: Omit<
      Momentje,
      'id' | 'created_at' | 'expires_at' | 'saved_to_verhaal' | 'seen_by_partner'
    >,
  ) => void;
  markMomentjeSeen: (id: string) => void;
  saveMomentjeToVerhaal: (id: string) => void;
  getActiveMomentjes: () => Momentje[];
  cleanExpiredMomentjes: () => void;
};

export const useVerhaalStore = create<VerhaalState & VerhaalActions>()(
  persist(
    (set, get) => ({
      entries: [],
      momentjes: [],

      addEntry: (entry, customDate?: string) => {
        const newEntry = {
          ...entry,
          id: generateId(),
          created_at: customDate ?? new Date().toISOString(),
        } as TimelineEntry;

        set((state) => ({
          entries: [newEntry, ...state.entries],
        }));
      },

      removeEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        }));
      },

      addMomentje: (momentje) => {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        const newMomentje: Momentje = {
          ...momentje,
          id: generateId(),
          created_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
          saved_to_verhaal: false,
          seen_by_partner: false,
        };

        set((state) => ({
          momentjes: [newMomentje, ...state.momentjes],
        }));
      },

      markMomentjeSeen: (id) => {
        set((state) => ({
          momentjes: state.momentjes.map((m) =>
            m.id === id ? { ...m, seen_by_partner: true } : m,
          ),
        }));
      },

      saveMomentjeToVerhaal: (id) => {
        const { momentjes } = get();
        const momentje = momentjes.find((m) => m.id === id);
        if (!momentje) return;

        const entry: TimelineEntry = {
          id: generateId(),
          created_at: momentje.created_at,
          type: 'moment',
          data: {
            photo_url: momentje.image_uri ?? '',
            story: momentje.text ?? '',
          },
        };

        set((state) => ({
          entries: [entry, ...state.entries],
          momentjes: state.momentjes.map((m) =>
            m.id === id ? { ...m, saved_to_verhaal: true } : m,
          ),
        }));
      },

      getActiveMomentjes: () => {
        const now = new Date().toISOString();
        return get().momentjes.filter(
          (m) => m.expires_at > now && !m.saved_to_verhaal,
        );
      },

      cleanExpiredMomentjes: () => {
        const now = new Date().toISOString();
        set((state) => ({
          momentjes: state.momentjes.filter(
            (m) => m.expires_at > now || m.saved_to_verhaal,
          ),
        }));
      },
    }),
    {
      name: 'verhaal-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
