import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal as RNModal,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Crown, Check, X } from 'lucide-react-native';
import { usePremiumStore } from '@/lib/stores/premium-store';
import { colors, organic } from '@/lib/theme';

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

const BENEFITS = [
  'Onbeperkte dagelijkse activiteiten',
  'Ons Verhaal met foto\'s',
  'Momentjes delen',
  'Conflict Navigator',
  'Date Roulette',
  'Liefdestaal Quiz',
];

export function PaywallModal({ visible, onClose }: PaywallModalProps) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const startTrial = usePremiumStore((s) => s.startTrial);

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

  const handleStartTrial = () => {
    startTrial(7);
    onClose();
  };

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
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
          opacity: backdropOpacity,
        }}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={onClose}
          accessibilityLabel="Sluit venster"
        />

        {/* Bottom sheet */}
        <Animated.View
          style={{
            transform: [{ translateY }],
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingBottom: 34,
            maxHeight: SCREEN_HEIGHT * 0.85,
          }}
        >
          {/* Gold accent bar at top */}
          <View
            style={{
              height: 4,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              backgroundColor: colors.goud.DEFAULT,
            }}
          />

          {/* Handle bar */}
          <View style={{ alignItems: 'center', paddingTop: 8, paddingBottom: 4 }}>
            <View
              style={{
                height: 4,
                width: 40,
                borderRadius: 2,
                backgroundColor: colors.zand.dark,
              }}
            />
          </View>

          {/* Close button */}
          <View style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
            <Pressable
              onPress={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: colors.zand.light,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              accessibilityLabel="Sluiten"
              accessibilityRole="button"
              hitSlop={8}
            >
              <X size={16} color={colors.leisteen} />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 8 }}
          >
            {/* Crown icon */}
            <View style={{ alignItems: 'center', marginTop: 8 }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: colors.goud.DEFAULT + '18',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Crown size={32} color={colors.goud.DEFAULT} strokeWidth={1.5} />
              </View>
            </View>

            {/* Title & subtitle */}
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: colors.nachtblauw,
                textAlign: 'center',
                marginTop: 16,
              }}
            >
              Samen Premium
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: '#6B7C8F',
                textAlign: 'center',
                marginTop: 6,
                lineHeight: 21,
              }}
            >
              Ontgrendel alle features voor jou en je partner
            </Text>

            {/* Benefits list */}
            <View style={{ marginTop: 24 }}>
              {BENEFITS.map((benefit, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 14,
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: colors.salie.DEFAULT + '18',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}
                  >
                    <Check size={14} color={colors.salie.DEFAULT} strokeWidth={2.5} />
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.nachtblauw,
                      fontWeight: '500',
                    }}
                  >
                    {benefit}
                  </Text>
                </View>
              ))}
            </View>

            {/* Price section */}
            <View
              style={{
                marginTop: 8,
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderRadius: organic.card,
                backgroundColor: colors.zand.light,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '700',
                  color: colors.nachtblauw,
                }}
              >
                7,99{' '}
                <Text style={{ fontSize: 16, fontWeight: '500' }}>per maand</Text>
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#6B7C8F',
                  marginTop: 4,
                }}
              >
                of 59,99 per jaar (bespaar 37%)
              </Text>
            </View>

            {/* CTA buttons */}
            <Pressable
              onPress={handleStartTrial}
              style={({ pressed }) => ({
                backgroundColor: colors.terracotta.DEFAULT,
                borderRadius: organic.button,
                paddingVertical: 16,
                alignItems: 'center',
                marginTop: 20,
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              })}
              accessibilityRole="button"
              accessibilityLabel="Start 7 dagen gratis proefperiode"
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
                Start 7 dagen gratis
              </Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              style={({ pressed }) => ({
                paddingVertical: 14,
                alignItems: 'center',
                opacity: pressed ? 0.6 : 1,
              })}
              accessibilityRole="button"
            >
              <Text style={{ fontSize: 14, color: '#6B7C8F', fontWeight: '500' }}>
                Misschien later
              </Text>
            </Pressable>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
}
