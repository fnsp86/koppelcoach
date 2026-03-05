import React from 'react';
import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';
import { ArrowLeft, Clock, Heart, Target } from 'lucide-react-native';
import { useNotificationStore } from '@/lib/stores/notification-store';

export default function NotificationSettingsScreen() {
  const {
    dailyReminder,
    partnerActivity,
    challengeReminder,
    setDailyReminder,
    setPartnerActivity,
    setChallengeReminder,
  } = useNotificationStore();

  const items = [
    {
      icon: Clock,
      color: colors.oceaan.DEFAULT,
      label: 'Dagelijkse check-in',
      description: 'Herinnering om samen in te checken',
      value: dailyReminder,
      onChange: setDailyReminder,
    },
    {
      icon: Heart,
      color: colors.terracotta.DEFAULT,
      label: 'Partner activiteit',
      description: 'Melding als je partner iets deelt',
      value: partnerActivity,
      onChange: setPartnerActivity,
    },
    {
      icon: Target,
      color: colors.goud.DEFAULT,
      label: 'Uitdaging herinnering',
      description: 'Herinnering voor actieve uitdagingen',
      value: challengeReminder,
      onChange: setChallengeReminder,
    },
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: colors.zand.DEFAULT,
          }}
        >
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <Text
          className="text-lg font-bold"
          style={{ color: colors.nachtblauw, marginLeft: 12 }}
        >
          Notificaties
        </Text>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.zand.DEFAULT,
            overflow: 'hidden',
          }}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <View
                key={item.label}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  borderBottomWidth: index < items.length - 1 ? 1 : 0,
                  borderBottomColor: colors.zand.light,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: item.color + '12',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Icon size={18} color={item.color} strokeWidth={1.8} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text className="text-base font-medium" style={{ color: colors.nachtblauw }}>
                    {item.label}
                  </Text>
                  <Text className="text-xs" style={{ color: '#9CA3AF' }}>
                    {item.description}
                  </Text>
                </View>
                <Switch
                  value={item.value}
                  onValueChange={item.onChange}
                  trackColor={{ false: colors.zand.DEFAULT, true: colors.salie.DEFAULT }}
                  thumbColor="#FFFFFF"
                />
              </View>
            );
          })}
        </View>

        <Text className="text-xs mt-4 px-1" style={{ color: '#9CA3AF' }}>
          Notificaties worden lokaal verstuurd. Je kunt ze altijd uitzetten via je systeeminstellingen.
        </Text>
      </View>
    </SafeAreaView>
  );
}
