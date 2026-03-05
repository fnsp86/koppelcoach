import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Goal = {
  id: string;
  title: string;
  created_at: string;
  weeklyChecks: Record<string, boolean>;
};

type GoalsState = {
  goals: Goal[];
};

type GoalsActions = {
  addGoal: (title: string) => void;
  toggleWeekCheck: (goalId: string, weekKey: string) => void;
  removeGoal: (goalId: string) => void;
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function getWeekKey(date: Date = new Date()): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const dayOfWeek = d.getDay();
  const diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().slice(0, 10);
}

export function getRecentWeekKeys(count: number = 4): string[] {
  const keys: string[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    keys.push(getWeekKey(d));
  }
  return keys;
}

export function getCurrentWeekKey(): string {
  return getWeekKey();
}

export const useGoalsStore = create<GoalsState & GoalsActions>()(
  persist(
    (set) => ({
      goals: [],

      addGoal: (title) => {
        const newGoal: Goal = {
          id: generateId(),
          title,
          created_at: new Date().toISOString(),
          weeklyChecks: {},
        };
        set((state) => ({
          goals: [newGoal, ...state.goals],
        }));
      },

      toggleWeekCheck: (goalId, weekKey) => {
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== goalId) return g;
            const checks = { ...g.weeklyChecks };
            checks[weekKey] = !checks[weekKey];
            return { ...g, weeklyChecks: checks };
          }),
        }));
      },

      removeGoal: (goalId) => {
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== goalId),
        }));
      },
    }),
    {
      name: 'goals-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
