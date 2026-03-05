import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OnboardingState = {
  name: string;
  birthday: string | null;
  relationshipType: string | null;
  duration: string | null;
  relationshipStartDate: string | null;
  livingTogether: string | null;
  livingTogetherDate: string | null;
  hasChildren: boolean | null;
  childCount: number;
  childBirthDates: string[];
  topics: string[];
  isOnboarded: boolean;
};

type OnboardingActions = {
  setName: (name: string) => void;
  setBirthday: (birthday: string) => void;
  setRelationshipType: (type: string) => void;
  setDuration: (duration: string) => void;
  setRelationshipStartDate: (date: string) => void;
  setLivingTogether: (value: string) => void;
  setLivingTogetherDate: (date: string) => void;
  setChildren: (has: boolean, count?: number) => void;
  setChildBirthDates: (dates: string[]) => void;
  setTopics: (topics: string[]) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

const INITIAL_STATE: OnboardingState = {
  name: '',
  birthday: null,
  relationshipType: null,
  duration: null,
  relationshipStartDate: null,
  livingTogether: null,
  livingTogetherDate: null,
  hasChildren: null,
  childCount: 0,
  childBirthDates: [],
  topics: [],
  isOnboarded: false,
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setName: (name) => set({ name }),
      setBirthday: (birthday) => set({ birthday }),
      setRelationshipType: (type) => set({ relationshipType: type }),
      setDuration: (duration) => set({ duration }),
      setRelationshipStartDate: (date) => set({ relationshipStartDate: date }),
      setLivingTogether: (value) => set({ livingTogether: value }),
      setLivingTogetherDate: (date) => set({ livingTogetherDate: date }),
      setChildren: (has, count = 0) => set({ hasChildren: has, childCount: count }),
      setChildBirthDates: (dates) => set({ childBirthDates: dates }),
      setTopics: (topics) => set({ topics }),
      completeOnboarding: () => set({ isOnboarded: true }),
      resetOnboarding: () => set(INITIAL_STATE),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
