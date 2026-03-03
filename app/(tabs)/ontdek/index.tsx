import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { colors } from '@/lib/theme';

const PACKS = [
  {
    name: 'Communicatie',
    icon: '\uD83D\uDCAC',
    count: 30,
    color: colors.oceaan.DEFAULT,
    free: true,
  },
  {
    name: 'Intimiteit',
    icon: '\uD83D\uDD25',
    count: 25,
    color: colors.terracotta.DEFAULT,
    free: false,
  },
  {
    name: 'Dromen',
    icon: '\u2728',
    count: 20,
    color: colors.goud.DEFAULT,
    free: true,
  },
  {
    name: 'Gezin',
    icon: '\uD83C\uDFE0',
    count: 20,
    color: colors.salie.DEFAULT,
    free: false,
  },
  {
    name: 'Plezier',
    icon: '\uD83C\uDF89',
    count: 25,
    color: '#E879A0',
    free: true,
  },
];

const JOURNEYS = [
  {
    name: '7 Dagen van Verbinding',
    description: 'Een week lang elke dag dichter bij elkaar komen',
    weeks: 1,
    icon: '\uD83C\uDF1F',
    progress: 0.6,
  },
  {
    name: 'Communicatie Verdiepen',
    description: 'Leer elkaars communicatiestijl beter begrijpen',
    weeks: 4,
    icon: '\uD83D\uDDE3\uFE0F',
    progress: 0,
  },
  {
    name: 'Intimiteit Herontdekken',
    description: 'Bouw stap voor stap aan meer verbondenheid',
    weeks: 6,
    icon: '\uD83E\uDDE1',
    progress: 0,
  },
];

export default function OntdekScreen() {
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
            Ontdek
          </Text>
          <Text className="mt-1 text-sm" style={{ color: '#6B7C8F' }}>
            Verken nieuwe manieren om elkaar te leren kennen
          </Text>
        </View>

        {/* Vraagpakketten */}
        <View className="pt-4">
          <View className="flex-row items-center justify-between px-6">
            <Text
              className="text-lg font-semibold"
              style={{ color: colors.nachtblauw }}
            >
              Vraagpakketten
            </Text>
            <TouchableOpacity>
              <Text
                className="text-sm font-medium"
                style={{ color: colors.terracotta.DEFAULT }}
              >
                Alles bekijken
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
            className="mt-3"
          >
            {PACKS.map((pack, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                className="w-36 rounded-2xl p-4"
                style={{
                  backgroundColor: '#FFFFFF',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Text className="text-3xl">{pack.icon}</Text>
                <Text
                  className="mt-2 text-base font-semibold"
                  style={{ color: colors.nachtblauw }}
                >
                  {pack.name}
                </Text>
                <Text className="mt-0.5 text-xs" style={{ color: '#9CA3AF' }}>
                  {pack.count} vragen
                </Text>
                <View className="mt-2">
                  {pack.free ? (
                    <Badge label="Gratis" variant="success" />
                  ) : (
                    <Badge label="Premium" variant="premium" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trajecten */}
        <View className="px-6 pt-8">
          <Text
            className="mb-3 text-lg font-semibold"
            style={{ color: colors.nachtblauw }}
          >
            Trajecten
          </Text>

          {JOURNEYS.map((journey, index) => (
            <Card key={index} className="mb-3 p-5" onPress={() => {}}>
              <View className="flex-row items-start">
                <View
                  className="mr-4 h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: colors.zand.light }}
                >
                  <Text className="text-xl">{journey.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold"
                    style={{ color: colors.nachtblauw }}
                  >
                    {journey.name}
                  </Text>
                  <Text
                    className="mt-0.5 text-sm leading-5"
                    style={{ color: '#6B7C8F' }}
                  >
                    {journey.description}
                  </Text>
                  <Text
                    className="mt-1.5 text-xs"
                    style={{ color: '#9CA3AF' }}
                  >
                    {journey.weeks} {journey.weeks === 1 ? 'week' : 'weken'}
                  </Text>
                  {journey.progress > 0 && (
                    <View className="mt-2">
                      <View
                        className="h-1.5 overflow-hidden rounded-full"
                        style={{ backgroundColor: colors.zand.DEFAULT }}
                      >
                        <View
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: colors.salie.DEFAULT,
                            width: `${journey.progress * 100}%`,
                          }}
                        />
                      </View>
                      <Text
                        className="mt-1 text-xs"
                        style={{ color: colors.salie.DEFAULT }}
                      >
                        {Math.round(journey.progress * 100)}% voltooid
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Koppelspel */}
        <View className="px-6 pt-4">
          <Text
            className="mb-3 text-lg font-semibold"
            style={{ color: colors.nachtblauw }}
          >
            Koppelspel
          </Text>
          <Card className="p-6" onPress={() => {}}>
            <View className="items-center">
              <Text className="text-5xl">{'\uD83C\uDFAE'}</Text>
              <Text
                className="mt-3 text-xl font-bold"
                style={{ color: colors.nachtblauw }}
              >
                Hoe goed kennen jullie elkaar?
              </Text>
              <Text
                className="mt-2 text-center text-sm leading-5"
                style={{ color: '#6B7C8F' }}
              >
                Voorspel elkaars antwoorden en ontdek hoeveel jullie echt van
                elkaar weten.
              </Text>
              <TouchableOpacity
                className="mt-5 rounded-xl px-8 py-3"
                style={{ backgroundColor: colors.terracotta.DEFAULT }}
                activeOpacity={0.8}
              >
                <Text className="text-base font-semibold text-white">
                  Start een ronde
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Date Planner */}
        <View className="px-6 pt-4">
          <Text
            className="mb-3 text-lg font-semibold"
            style={{ color: colors.nachtblauw }}
          >
            Date Planner
          </Text>
          <Card className="p-6" onPress={() => {}}>
            <View className="flex-row items-center">
              <View
                className="mr-4 h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: colors.terracotta.light + '20' }}
              >
                <Text className="text-2xl">{'\uD83D\uDC96'}</Text>
              </View>
              <View className="flex-1">
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.nachtblauw }}
                >
                  Thomas is aan de beurt
                </Text>
                <Text
                  className="mt-0.5 text-sm"
                  style={{ color: '#6B7C8F' }}
                >
                  Volgende date plannen voor dit weekend
                </Text>
              </View>
              <Text
                className="text-sm font-medium"
                style={{ color: colors.terracotta.DEFAULT }}
              >
                Bekijk
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
