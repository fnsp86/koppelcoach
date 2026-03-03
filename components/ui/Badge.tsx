import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@/lib/theme';

type BadgeVariant = 'default' | 'premium' | 'success' | 'info';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

function getVariantStyle(variant: BadgeVariant) {
  switch (variant) {
    case 'premium':
      return {
        bg: colors.goud.light,
        text: colors.goud.dark,
      };
    case 'success':
      return {
        bg: colors.salie.light,
        text: colors.salie.dark,
      };
    case 'info':
      return {
        bg: colors.oceaan.light,
        text: colors.oceaan.dark,
      };
    case 'default':
    default:
      return {
        bg: colors.zand.DEFAULT,
        text: colors.nachtblauw,
      };
  }
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const style = getVariantStyle(variant);

  return (
    <View
      className="self-start rounded-full px-3 py-1"
      style={{ backgroundColor: style.bg }}
    >
      <Text
        className="text-xs font-semibold"
        style={{ color: style.text }}
      >
        {label}
      </Text>
    </View>
  );
}
