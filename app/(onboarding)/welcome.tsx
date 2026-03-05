import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, warmShadow } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Activity, TrendingUp, MessageCircle } from 'lucide-react-native';

const FEATURES = [
  { icon: Activity, color: colors.salie.DEFAULT, text: 'Dagelijkse check-ins' },
  { icon: MessageCircle, color: colors.oceaan.DEFAULT, text: 'Samen groeien' },
  { icon: TrendingUp, color: colors.goud.DEFAULT, text: 'Persoonlijke inzichten' },
];

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={[colors.terracotta.DEFAULT + '08', colors.warmwit]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400 }}
      />

      <View className="flex-1 px-8">
        <View className="flex-1 items-center justify-center">
          {/* Decorative circles */}
          <View style={{ marginBottom: 32, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: colors.salie.DEFAULT + '15',
                  marginRight: -12,
                }}
              />
              <View
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 44,
                  backgroundColor: colors.terracotta.DEFAULT + '12',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                <Heart size={36} color={colors.terracotta.DEFAULT} fill={colors.terracotta.DEFAULT} strokeWidth={0} />
              </View>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: colors.oceaan.DEFAULT + '15',
                  marginLeft: -12,
                }}
              />
            </View>
          </View>

          <Text
            className="text-4xl font-bold text-center"
            style={{ color: colors.nachtblauw }}
          >
            Welkom bij Samen
          </Text>
          <Text
            className="mt-3 text-center text-base leading-6"
            style={{ color: '#6B7C8F' }}
          >
            Versterk jullie relatie met dagelijkse activiteiten, check-ins en inzichten
          </Text>

          {/* Feature points */}
          <View style={{ marginTop: 40, gap: 16, width: '100%' }}>
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <View
                  key={f.text}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 16,
                    ...warmShadow,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: f.color + '12',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 14,
                    }}
                  >
                    <Icon size={20} color={f.color} strokeWidth={1.8} />
                  </View>
                  <Text className="text-base font-semibold" style={{ color: colors.nachtblauw }}>
                    {f.text}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Buttons */}
        <View style={{ marginBottom: 40, gap: 12 }}>
          <TouchableOpacity
            onPress={() => router.push('/(onboarding)/name')}
            activeOpacity={0.8}
            style={{
              backgroundColor: colors.terracotta.DEFAULT,
              borderRadius: 16,
              paddingVertical: 18,
              alignItems: 'center',
            }}
          >
            <Text className="text-base font-bold text-white">Laten we beginnen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.7}
            style={{
              paddingVertical: 14,
              alignItems: 'center',
            }}
          >
            <Text className="text-sm font-medium" style={{ color: '#6B7C8F' }}>
              Ik heb al een account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
