import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PremiumFeature =
  | 'unlimited-activities'
  | 'photo-upload'
  | 'all-topics'
  | 'conflict-navigator'
  | 'date-roulette'
  | 'love-language'
  | 'insights'
  | 'unlimited-verhaal';

// Features that are always accessible without premium
const FREE_FEATURES = new Set<string>([
  'basic-checkin',
  'daily-question',
  'basic-verhaal',
]);

type PremiumState = {
  isPremium: boolean;
  trialEndsAt: string | null;
};

type PremiumActions = {
  setPremium: (value: boolean) => void;
  startTrial: (days?: number) => void;
  isTrialActive: () => boolean;
  checkFeatureAccess: (feature: PremiumFeature) => boolean;
};

export const usePremiumStore = create<PremiumState & PremiumActions>()(
  persist(
    (set, get) => ({
      isPremium: false,
      trialEndsAt: null,

      setPremium: (value) => {
        set({ isPremium: value });
      },

      startTrial: (days = 7) => {
        const trialEnd = new Date();
        trialEnd.setDate(trialEnd.getDate() + days);
        set({ trialEndsAt: trialEnd.toISOString() });
      },

      isTrialActive: () => {
        const { trialEndsAt } = get();
        if (!trialEndsAt) return false;
        return new Date(trialEndsAt) > new Date();
      },

      checkFeatureAccess: (feature) => {
        // Free features are always accessible
        if (FREE_FEATURES.has(feature)) return true;

        const { isPremium } = get();
        if (isPremium) return true;

        // Check trial
        const { trialEndsAt } = get();
        if (trialEndsAt && new Date(trialEndsAt) > new Date()) return true;

        return false;
      },
    }),
    {
      name: 'premium-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
