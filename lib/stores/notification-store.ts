import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NotificationState = {
  dailyReminder: boolean;
  partnerActivity: boolean;
  challengeReminder: boolean;
};

type NotificationActions = {
  setDailyReminder: (value: boolean) => void;
  setPartnerActivity: (value: boolean) => void;
  setChallengeReminder: (value: boolean) => void;
};

export const useNotificationStore = create<NotificationState & NotificationActions>()(
  persist(
    (set) => ({
      dailyReminder: true,
      partnerActivity: true,
      challengeReminder: true,

      setDailyReminder: (value) => set({ dailyReminder: value }),
      setPartnerActivity: (value) => set({ partnerActivity: value }),
      setChallengeReminder: (value) => set({ challengeReminder: value }),
    }),
    {
      name: 'notification-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
