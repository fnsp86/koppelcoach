import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { colors } from '@/lib/theme';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';
import { useAuth } from '@/lib/auth';

export default function Index() {
  const { session, loading } = useAuth();
  const isOnboarded = useOnboardingStore((s) => s.isOnboarded);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.warmwit }}>
        <ActivityIndicator size="large" color={colors.terracotta.DEFAULT} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!isOnboarded) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return <Redirect href="/(tabs)/vandaag" />;
}
