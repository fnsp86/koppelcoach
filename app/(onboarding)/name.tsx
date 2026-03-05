import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, organic } from '@/lib/theme';
import { OnboardingProgress } from '@/components/ui/OnboardingProgress';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';

export default function NameScreen() {
  const storeName = useOnboardingStore((s) => s.name);
  const setName = useOnboardingStore((s) => s.setName);
  const [name, setLocalName] = useState(storeName);

  const handleNext = () => {
    if (name.trim().length === 0) return;
    setName(name.trim());
    router.push('/(onboarding)/relationship');
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <View className="flex-1 px-8">
        <OnboardingProgress step={1} />

        <View className="mt-12">
          <Text className="text-2xl font-bold" style={{ color: colors.nachtblauw }}>
            Hoe heet je?
          </Text>
          <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>
            Je naam wordt in de app gebruikt
          </Text>
        </View>

        <TextInput
          value={name}
          onChangeText={setLocalName}
          placeholder="Je voornaam"
          placeholderTextColor="#9CA3AF"
          autoFocus
          className="mt-8 px-5 py-4 text-lg"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: organic.card,
            borderWidth: 1.5,
            borderColor: name.trim().length > 0 ? colors.terracotta.DEFAULT + '40' : colors.zand.dark,
            color: colors.nachtblauw,
          }}
          onSubmitEditing={handleNext}
        />

        <View className="mt-auto mb-12">
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={{
              backgroundColor: name.trim().length > 0 ? colors.terracotta.DEFAULT : colors.zand.dark,
              borderRadius: 16,
              paddingVertical: 18,
              alignItems: 'center',
            }}
          >
            <Text className="text-base font-bold text-white">Volgende</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
