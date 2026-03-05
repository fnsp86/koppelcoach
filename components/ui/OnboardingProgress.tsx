import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { colors } from '@/lib/theme';

type Props = {
  step: number;
  total?: number;
};

export function OnboardingProgress({ step, total = 6 }: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16 }}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          height: 40,
          width: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: colors.zand.DEFAULT,
        }}
      >
        <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {Array.from({ length: total }, (_, i) => (
          <View
            key={i}
            style={{
              height: 4,
              width: 28,
              borderRadius: 2,
              backgroundColor: i < step ? colors.terracotta.DEFAULT : colors.zand.DEFAULT,
            }}
          />
        ))}
      </View>
      <View style={{ width: 40 }} />
    </View>
  );
}
