import React from 'react';
import { View } from 'react-native';
import { Heart } from 'lucide-react-native';
import { colors } from '@/lib/theme';

type Variant = 'dot' | 'heart' | 'line';

interface SectionDividerProps {
  variant?: Variant;
}

export function SectionDivider({ variant = 'line' }: SectionDividerProps) {
  return (
    <View className="my-2 flex-row items-center px-6">
      <View
        className="flex-1"
        style={{ height: 1, backgroundColor: colors.zand.dark, opacity: 0.3 }}
      />
      {variant === 'dot' && (
        <View
          className="mx-3 h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: colors.zand.dark, opacity: 0.5 }}
        />
      )}
      {variant === 'heart' && (
        <View className="mx-3">
          <Heart
            size={10}
            color={colors.terracotta.DEFAULT}
            fill={colors.terracotta.DEFAULT}
            strokeWidth={0}
            style={{ opacity: 0.3 }}
          />
        </View>
      )}
      <View
        className="flex-1"
        style={{ height: 1, backgroundColor: colors.zand.dark, opacity: 0.3 }}
      />
    </View>
  );
}
