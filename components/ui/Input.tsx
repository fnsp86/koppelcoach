import React, { useState } from 'react';
import { View, Text, TextInput, type TextInputProps } from 'react-native';
import { colors } from '@/lib/theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
  maxLength?: number;
}

export function Input({
  label,
  error,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  multiline = false,
  maxLength,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? '#DC2626'
    : isFocused
      ? colors.terracotta.DEFAULT
      : colors.zand.dark;

  return (
    <View className="w-full">
      {label ? (
        <Text
          className="mb-1.5 text-sm font-medium"
          style={{ color: colors.nachtblauw }}
        >
          {label}
        </Text>
      ) : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`rounded-xl px-4 text-base ${multiline ? 'py-3' : 'py-3.5'}`}
        style={{
          backgroundColor: colors.warmwit,
          borderWidth: 1.5,
          borderColor,
          color: colors.nachtblauw,
          minHeight: multiline ? 100 : undefined,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
        accessibilityLabel={label}
        {...rest}
      />

      {error ? (
        <Text className="mt-1 text-xs" style={{ color: '#DC2626' }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
