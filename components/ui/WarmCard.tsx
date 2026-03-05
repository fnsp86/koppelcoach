import React from 'react';
import { View, Pressable, type ViewProps } from 'react-native';
import { colors, warmShadow, organic } from '@/lib/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = { damping: 15, stiffness: 200 };

interface WarmCardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  onPress?: () => void;
}

export function WarmCard({
  children,
  className = '',
  accentColor,
  onPress,
  style,
  ...rest
}: WarmCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const cardStyle = [
    {
      backgroundColor: '#FFFFFF',
      borderRadius: organic.card,
      ...warmShadow,
    },
    style,
  ];

  const content = (
    <>
      {accentColor && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 12,
            bottom: 12,
            width: 3.5,
            borderRadius: 2,
            backgroundColor: accentColor,
          }}
        />
      )}
      {children}
    </>
  );

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.97, SPRING_CONFIG);
        }}
        onPressOut={() => {
          scale.value = withSpring(1, SPRING_CONFIG);
        }}
        className={`p-4 ${className}`}
        style={[...cardStyle, animatedStyle]}
        accessibilityRole="button"
        {...rest}
      >
        {content}
      </AnimatedPressable>
    );
  }

  return (
    <View className={`p-4 ${className}`} style={cardStyle} {...rest}>
      {content}
    </View>
  );
}
