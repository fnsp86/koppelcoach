import React from 'react';
import { View, Text, Image } from 'react-native';
import { colors } from '@/lib/theme';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  name: string;
  imageUrl?: string | null;
  size?: AvatarSize;
}

const sizeMap: Record<AvatarSize, { container: number; text: number }> = {
  sm: { container: 32, text: 12 },
  md: { container: 44, text: 16 },
  lg: { container: 64, text: 24 },
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({ name, imageUrl, size = 'md' }: AvatarProps) {
  const dimensions = sizeMap[size];

  const containerStyle = {
    width: dimensions.container,
    height: dimensions.container,
    borderRadius: dimensions.container / 2,
    overflow: 'hidden' as const,
  };

  if (imageUrl) {
    return (
      <View style={containerStyle}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: '100%' }}
          accessibilityLabel={`Profielfoto van ${name}`}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        containerStyle,
        {
          backgroundColor: colors.terracotta.DEFAULT,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
      accessibilityLabel={`Avatar van ${name}`}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: dimensions.text,
          fontWeight: '600',
        }}
      >
        {getInitials(name)}
      </Text>
    </View>
  );
}
