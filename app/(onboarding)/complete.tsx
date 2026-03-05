import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';
import { Heart, Sparkles, ArrowRight } from 'lucide-react-native';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';

export default function CompleteScreen() {
  const name = useOnboardingStore((s) => s.name);
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding);

  const handleStart = () => {
    completeOnboarding();
    router.replace('/(tabs)/vandaag');
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <View className="flex-1 px-8" style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* Decorative circles */}
        <View style={{ position: 'relative', width: 160, height: 160, marginBottom: 40 }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 20,
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: colors.salie.DEFAULT + '20',
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: colors.goud.DEFAULT + '20',
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.terracotta.DEFAULT + '20',
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 40,
              left: 50,
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: colors.terracotta.DEFAULT,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Heart size={28} color="#FFFFFF" strokeWidth={2} fill="#FFFFFF" />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Sparkles size={20} color={colors.goud.DEFAULT} strokeWidth={2} />
          <Text className="text-sm font-medium ml-2" style={{ color: colors.goud.DEFAULT }}>
            Alles is ingesteld
          </Text>
        </View>

        <Text className="text-3xl font-bold text-center" style={{ color: colors.nachtblauw }}>
          Welkom{name ? `, ${name}` : ''}!
        </Text>

        <Text
          className="text-base text-center mt-3"
          style={{ color: '#6B7C8F', maxWidth: 300, lineHeight: 22 }}
        >
          Jullie zijn klaar om samen te groeien. Ontdek dagelijkse check-ins, gespreksstarters en meer.
        </Text>
      </View>

      <View className="px-8 mb-12">
        <TouchableOpacity
          onPress={handleStart}
          activeOpacity={0.8}
          style={{
            backgroundColor: colors.terracotta.DEFAULT,
            borderRadius: 16,
            paddingVertical: 18,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text className="text-base font-bold text-white">Start met Samen</Text>
          <ArrowRight size={18} color="#FFFFFF" strokeWidth={2} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
