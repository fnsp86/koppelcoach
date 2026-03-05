import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/lib/auth';
import { useSupabaseSync } from '@/lib/hooks/useSupabaseSync';
import { useRealtimeCouple } from '@/lib/hooks/useRealtimeCouple';

function AppContent() {
  useSupabaseSync();
  useRealtimeCouple();

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="activity"
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
