import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { colors } from '@/lib/theme';

const MENU_ITEMS = [
  {
    label: 'Liefdestaal quiz',
    icon: '\u2665',
    description: 'Ontdek elkaars liefdestaal',
  },
  {
    label: 'Relatie-tijdlijn',
    icon: '\uD83D\uDCC5',
    description: 'Jullie mijlpalen en herinneringen',
  },
  {
    label: 'Notificaties',
    icon: '\uD83D\uDD14',
    description: 'Herinneringen en meldingen',
  },
  {
    label: 'Abonnement',
    icon: '\u2B50',
    description: 'Beheer je Samen Premium',
  },
  {
    label: 'Over Samen',
    icon: '\u2139\uFE0F',
    description: 'Versie, privacy en voorwaarden',
  },
];

export default function ProfielScreen() {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <Text
            className="text-2xl font-bold"
            style={{ color: colors.nachtblauw }}
          >
            Profiel
          </Text>
        </View>

        {/* User profile card */}
        <View className="px-6 pt-3">
          <Card className="p-6">
            <View className="flex-row items-center">
              <Avatar name="Emma de Vries" size="lg" />
              <View className="ml-4 flex-1">
                <Text
                  className="text-xl font-bold"
                  style={{ color: colors.nachtblauw }}
                >
                  Emma de Vries
                </Text>
                <Text className="mt-0.5 text-sm" style={{ color: '#6B7C8F' }}>
                  emma@email.nl
                </Text>
                <View className="mt-2">
                  <Badge label="Gratis plan" variant="default" />
                </View>
              </View>
            </View>
          </Card>
        </View>

        {/* Partner info */}
        <View className="px-6 pt-4">
          <Card className="p-5">
            <Text
              className="mb-3 text-xs font-semibold uppercase tracking-wider"
              style={{ color: colors.terracotta.DEFAULT }}
            >
              Je partner
            </Text>
            <View className="flex-row items-center">
              <Avatar name="Thomas Bakker" size="md" />
              <View className="ml-3 flex-1">
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.nachtblauw }}
                >
                  Thomas Bakker
                </Text>
                <Text className="text-sm" style={{ color: '#6B7C8F' }}>
                  Samen sinds 14 februari 2024
                </Text>
              </View>
              <View className="flex-row items-center">
                <View
                  className="mr-1.5 h-2 w-2 rounded-full"
                  style={{ backgroundColor: colors.salie.DEFAULT }}
                />
                <Text className="text-xs" style={{ color: colors.salie.DEFAULT }}>
                  Online
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Menu items */}
        <View className="px-6 pt-6">
          <Card className="overflow-hidden p-0">
            {MENU_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center px-5 py-4"
                style={{
                  borderBottomWidth: index < MENU_ITEMS.length - 1 ? 1 : 0,
                  borderBottomColor: colors.zand.light,
                }}
                activeOpacity={0.6}
              >
                <Text className="mr-3 text-lg">{item.icon}</Text>
                <View className="flex-1">
                  <Text
                    className="text-base font-medium"
                    style={{ color: colors.nachtblauw }}
                  >
                    {item.label}
                  </Text>
                  <Text className="text-xs" style={{ color: '#9CA3AF' }}>
                    {item.description}
                  </Text>
                </View>
                <Text className="text-sm" style={{ color: '#9CA3AF' }}>
                  {'\u203A'}
                </Text>
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Logout */}
        <View className="px-6 pt-4">
          <TouchableOpacity
            className="items-center rounded-2xl border-2 py-3.5"
            style={{ borderColor: '#DC2626' }}
            activeOpacity={0.7}
          >
            <Text className="text-base font-semibold" style={{ color: '#DC2626' }}>
              Uitloggen
            </Text>
          </TouchableOpacity>
        </View>

        {/* App version */}
        <View className="mt-6 items-center pb-4">
          <Text className="text-xs" style={{ color: '#9CA3AF' }}>
            Samen v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
