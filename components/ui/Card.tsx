import React from 'react';
import { View, Pressable, type ViewProps } from 'react-native';
import { colors } from '@/lib/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  premium?: boolean;
  onPress?: () => void;
}

const baseStyle = {
  backgroundColor: colors.warmwit,
  borderRadius: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
} as const;

const premiumBorder = {
  borderWidth: 1.5,
  borderColor: colors.goud.DEFAULT,
} as const;

export function Card({
  children,
  className = '',
  premium = false,
  onPress,
  style,
  ...rest
}: CardProps) {
  const combinedStyle = [
    baseStyle,
    premium ? premiumBorder : undefined,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={`p-4 ${className}`}
        style={({ pressed }) => [
          ...combinedStyle,
          pressed ? { opacity: 0.9 } : undefined,
        ]}
        accessibilityRole="button"
        {...rest}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={`p-4 ${className}`} style={combinedStyle} {...rest}>
      {children}
    </View>
  );
}
