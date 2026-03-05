import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Lock } from 'lucide-react-native';
import { usePremiumStore, type PremiumFeature } from '@/lib/stores/premium-store';
import { PaywallModal } from './PaywallModal';
import { colors, organic } from '@/lib/theme';

interface PremiumGateProps {
  children: React.ReactNode;
  feature: PremiumFeature;
  featureLabel?: string;
}

export function PremiumGate({ children, feature, featureLabel }: PremiumGateProps) {
  const checkFeatureAccess = usePremiumStore((s) => s.checkFeatureAccess);
  const [showPaywall, setShowPaywall] = useState(false);

  if (checkFeatureAccess(feature)) {
    return <>{children}</>;
  }

  return (
    <View style={{ position: 'relative' }}>
      {/* Locked content at low opacity */}
      <View style={{ opacity: 0.3 }} pointerEvents="none">
        {children}
      </View>

      {/* Lock overlay */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: organic.card,
            paddingHorizontal: 24,
            paddingVertical: 20,
            shadowColor: colors.terracotta.dark,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 4,
          }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: colors.goud.DEFAULT + '15',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <Lock size={24} color={colors.goud.DEFAULT} strokeWidth={1.8} />
          </View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.nachtblauw,
              marginBottom: 4,
            }}
          >
            Samen Premium
          </Text>

          {featureLabel && (
            <Text
              style={{
                fontSize: 13,
                color: '#6B7C8F',
                marginBottom: 12,
                textAlign: 'center',
              }}
            >
              {featureLabel}
            </Text>
          )}

          <Pressable
            onPress={() => setShowPaywall(true)}
            style={({ pressed }) => ({
              backgroundColor: colors.goud.DEFAULT,
              borderRadius: organic.button,
              paddingHorizontal: 20,
              paddingVertical: 10,
              opacity: pressed ? 0.9 : 1,
            })}
            accessibilityRole="button"
            accessibilityLabel="Ontgrendel Samen Premium"
          >
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>
              Ontgrendel
            </Text>
          </Pressable>
        </View>
      </View>

      <PaywallModal
        visible={showPaywall}
        onClose={() => setShowPaywall(false)}
      />
    </View>
  );
}
