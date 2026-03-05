import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '@/lib/theme';

interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  rightElement?: React.ReactNode;
  height?: number;
}

export function GradientHeader({
  title,
  subtitle,
  children,
  rightElement,
  height = 140,
}: GradientHeaderProps) {
  return (
    <LinearGradient
      colors={gradients.header}
      style={{ minHeight: height }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
    >
      <View className="flex-row items-center justify-between px-6 pt-6 pb-2">
        <View className="flex-1">
          {subtitle && (
            <Text
              className="text-sm font-medium"
              style={{ color: colors.terracotta.DEFAULT, opacity: 0.8 }}
            >
              {subtitle}
            </Text>
          )}
          <Text
            className="text-3xl font-bold"
            style={{ color: colors.nachtblauw }}
          >
            {title}
          </Text>
        </View>
        {rightElement}
      </View>
      {children}
    </LinearGradient>
  );
}
