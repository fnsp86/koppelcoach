import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal as RNModal,
  Animated,
  Dimensions,
  type LayoutChangeEvent,
} from 'react-native';
import { X } from 'lucide-react-native';
import { colors } from '@/lib/theme';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export function Modal({ visible, onClose, title, children }: ModalProps) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 200,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, backdropOpacity]);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'flex-end',
          opacity: backdropOpacity,
        }}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={onClose}
          accessibilityLabel="Sluit venster"
        />

        {/* Sheet */}
        <Animated.View
          style={{
            transform: [{ translateY }],
            backgroundColor: colors.warmwit,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingBottom: 34,
            maxHeight: SCREEN_HEIGHT * 0.85,
          }}
        >
          {/* Handle bar */}
          <View className="items-center pt-3 pb-1">
            <View
              className="h-1 w-10 rounded-full"
              style={{ backgroundColor: colors.zand.dark }}
            />
          </View>

          {/* Header */}
          <View className="flex-row items-center justify-between px-5 py-3">
            <Text
              className="text-lg font-semibold flex-1"
              style={{ color: colors.nachtblauw }}
              numberOfLines={1}
            >
              {title ?? ''}
            </Text>
            <Pressable
              onPress={onClose}
              className="ml-3 rounded-full p-2"
              style={{ backgroundColor: colors.zand.light }}
              accessibilityLabel="Sluiten"
              accessibilityRole="button"
              hitSlop={8}
            >
              <X size={20} color={colors.leisteen} />
            </Pressable>
          </View>

          {/* Content */}
          <View className="px-5 pb-4">{children}</View>
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
}
