import React from 'react';
import { Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';
import { colors, warmShadow } from '@/lib/theme';

interface FABProps {
  onPress: () => void;
  icon?: React.ReactNode;
}

export function FAB({ onPress, icon }: FABProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          position: 'absolute',
          bottom: 32,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: colors.terracotta.DEFAULT,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          ...warmShadow,
          shadowOpacity: 0.25,
        },
        pressed ? { opacity: 0.85 } : undefined,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Toevoegen"
    >
      {icon ?? <Plus size={26} color="#FFFFFF" strokeWidth={2.5} />}
    </Pressable>
  );
}
