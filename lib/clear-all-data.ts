import AsyncStorage from '@react-native-async-storage/async-storage';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';
import { usePartnerStore } from '@/lib/stores/partner-store';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { useActivityHistoryStore } from '@/lib/stores/activity-history-store';
import { usePremiumStore } from '@/lib/stores/premium-store';
import { useGoalsStore } from '@/lib/stores/goals-store';
import { useBookmarksStore } from '@/lib/stores/bookmarks-store';
import { useNotificationStore } from '@/lib/stores/notification-store';

/**
 * Wist alle lokale data: AsyncStorage + in-memory Zustand stores.
 * Gebruik bij uitloggen of account verwijderen.
 */
export async function clearAllData() {
  // 1. Wis AsyncStorage (persistent storage)
  await AsyncStorage.clear();

  // 2. Reset alle Zustand stores in-memory
  useOnboardingStore.setState({
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
  });

  usePartnerStore.setState({
    myCode: null,
    partnerCode: null,
    partnerName: null,
    isConnected: false,
    userId: null,
    coupleId: null,
    couple: null,
    partnerProfile: null,
    isOnline: false,
    isSyncing: false,
    syncError: null,
  });

  useVerhaalStore.setState({
    entries: [],
    momentjes: [],
  });

  useActivityHistoryStore.setState({
    questions: [],
    games: [],
    quizzes: [],
  });

  usePremiumStore.setState({
    isPremium: false,
  });

  useGoalsStore.setState({
    goals: [],
  });

  useBookmarksStore.setState({
    bookmarks: [],
  });

  useNotificationStore.setState({
    dailyReminder: true,
    partnerActivity: true,
    challengeReminder: true,
  });
}
