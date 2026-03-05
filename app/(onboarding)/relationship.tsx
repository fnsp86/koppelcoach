import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';
import { Heart, Gem, Users, Sparkles } from 'lucide-react-native';
import { OnboardingProgress } from '@/components/ui/OnboardingProgress';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';

const OPTIONS = [
  { id: 'dating', label: 'Daten', icon: Sparkles, color: colors.terracotta.DEFAULT },
  { id: 'relationship', label: 'In een relatie', icon: Heart, color: colors.oceaan.DEFAULT },
  { id: 'engaged', label: 'Verloofd', icon: Gem, color: colors.goud.DEFAULT },
  { id: 'married', label: 'Getrouwd', icon: Users, color: colors.salie.DEFAULT },
];

export default function RelationshipScreen() {
  const storeValue = useOnboardingStore((s) => s.relationshipType);
  const setRelationshipType = useOnboardingStore((s) => s.setRelationshipType);
  const [selected, setSelected] = useState<string | null>(storeValue);

  const handleNext = () => {
    if (!selected) return;
    setRelationshipType(selected);
    router.push('/(onboarding)/duration');
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <View className="flex-1 px-8">
        <OnboardingProgress step={2} />

        <View className="mt-12">
          <Text className="text-2xl font-bold" style={{ color: colors.nachtblauw }}>
            Wat is jullie relatiestatus?
          </Text>
          <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>
            Dit helpt ons relevante content te bieden
          </Text>
        </View>

        <View style={{ marginTop: 32, gap: 12 }}>
          {OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = selected === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelected(option.id)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 16,
                  padding: 18,
                  backgroundColor: isSelected ? option.color + '10' : '#FFFFFF',
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? option.color : colors.zand.DEFAULT,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    backgroundColor: option.color + '15',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}
                >
                  <Icon size={22} color={option.color} strokeWidth={1.5} />
                </View>
                <Text className="flex-1 text-base font-semibold" style={{ color: colors.nachtblauw }}>
                  {option.label}
                </Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    borderWidth: 2,
                    borderColor: isSelected ? option.color : '#D1D5DB',
                    backgroundColor: isSelected ? option.color : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF' }} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="mt-auto mb-12">
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={{
              backgroundColor: selected ? colors.terracotta.DEFAULT : colors.zand.dark,
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
