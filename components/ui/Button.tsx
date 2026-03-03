import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
} from 'react-native';
import { colors } from '@/lib/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'premium';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  lg: 'px-8 py-4',
};

const textSizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  size = 'md',
  fullWidth = false,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const containerClasses = [
    'flex-row items-center justify-center rounded-xl',
    sizeClasses[size],
    fullWidth ? 'w-full' : 'self-start',
    variant === 'secondary' ? 'border-2' : '',
    isDisabled ? 'opacity-50' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'font-semibold text-center',
    textSizeClasses[size],
  ].join(' ');

  // Resolve colors for each variant via style props (reliable with NativeWind)
  const variantStyles = getVariantStyles(variant);

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={containerClasses}
      style={({ pressed }) => [
        variantStyles.container,
        pressed && !isDisabled ? { opacity: 0.8 } : undefined,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyles.spinnerColor}
          style={{ marginRight: 8 }}
        />
      ) : null}
      <Text className={textClasses} style={variantStyles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

function getVariantStyles(variant: ButtonVariant) {
  switch (variant) {
    case 'primary':
      return {
        container: { backgroundColor: colors.terracotta.DEFAULT },
        text: { color: '#FFFFFF' },
        spinnerColor: '#FFFFFF',
      };
    case 'secondary':
      return {
        container: {
          backgroundColor: 'transparent',
          borderColor: colors.terracotta.DEFAULT,
        },
        text: { color: colors.terracotta.DEFAULT },
        spinnerColor: colors.terracotta.DEFAULT,
      };
    case 'ghost':
      return {
        container: { backgroundColor: 'transparent' },
        text: { color: colors.terracotta.DEFAULT },
        spinnerColor: colors.terracotta.DEFAULT,
      };
    case 'premium':
      return {
        container: { backgroundColor: colors.goud.DEFAULT },
        text: { color: '#FFFFFF' },
        spinnerColor: '#FFFFFF',
      };
  }
}
