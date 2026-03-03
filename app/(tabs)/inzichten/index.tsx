import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { colors } from '@/lib/theme';

const WEEKLY_INSIGHTS = [
  {
    title: 'Jullie communicatie verbetert',
    description:
      'Deze week hebben jullie 40% meer vragen beantwoord dan vorige week. Een positieve trend.',
    icon: '\uD83D\uDCC8',
    category: 'Communicatie',
  },
  {
    title: 'Tijd voor kwaliteitstijd',
    description:
      'Jullie check-in scores voor verbondenheid zijn licht gedaald. Plan een gezamenlijke activiteit.',
    icon: '\uD83D\uDCA1',
    category: 'Advies',
  },
  {
    title: 'Sterke week voor waardering',
    description:
      'Jullie hebben allebei veel dankbaarheid gedeeld. Dat versterkt de band.',
    icon: '\u2B50',
    category: 'Hoogtepunt',
  },
];

const PULSE_DATA = [
  { day: 'Ma', value: 7 },
  { day: 'Di', value: 8 },
  { day: 'Wo', value: 6 },
  { day: 'Do', value: 8 },
  { day: 'Vr', value: 9 },
  { day: 'Za', value: 8 },
  { day: 'Zo', value: 9 },
];

export default function InzichtenScreen() {
  const isPremium = false;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <View className="flex-row items-center">
            <Text
              className="text-2xl font-bold"
              style={{ color: colors.nachtblauw }}
            >
              Inzichten
            </Text>
            <View className="ml-2">
              <Badge label="Premium" variant="premium" />
            </View>
          </View>
          <Text className="mt-1 text-sm" style={{ color: '#6B7C8F' }}>
            Begrijp jullie relatie beter
          </Text>
        </View>

        {/* Premium gate */}
        {!isPremium && (
          <View className="mx-6 mt-3">
            <TouchableOpacity
              activeOpacity={0.9}
              className="overflow-hidden rounded-2xl p-5"
              style={{
                backgroundColor: colors.goud.DEFAULT,
              }}
            >
              <View className="flex-row items-center">
                <Text className="text-3xl">{'\uD83D\uDD13'}</Text>
                <View className="ml-3 flex-1">
                  <Text className="text-base font-bold text-white">
                    Ontgrendel alle inzichten
                  </Text>
                  <Text className="mt-0.5 text-sm text-white opacity-90">
                    AI-coach, uitgebreide analyses en persoonlijke tips
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Relationship Pulse Graph */}
        <View className="px-6 pt-6">
          <Card className="p-6">
            <Text
              className="mb-1 text-xs font-semibold uppercase tracking-wider"
              style={{ color: colors.oceaan.DEFAULT }}
            >
              Relatiepols
            </Text>
            <Text
              className="mb-5 text-lg font-semibold"
              style={{ color: colors.nachtblauw }}
            >
              Deze week
            </Text>

            {/* Simple bar chart */}
            <View className="flex-row items-end justify-between" style={{ height: 120 }}>
              {PULSE_DATA.map((item, index) => (
                <View key={index} className="items-center" style={{ flex: 1 }}>
                  <View
                    className="w-6 rounded-t-lg"
                    style={{
                      height: (item.value / 10) * 100,
                      backgroundColor:
                        item.value >= 8
                          ? colors.salie.DEFAULT
                          : item.value >= 6
                            ? colors.oceaan.DEFAULT
                            : colors.terracotta.light,
                    }}
                  />
                  <Text
                    className="mt-2 text-xs"
                    style={{ color: '#9CA3AF' }}
                  >
                    {item.day}
                  </Text>
                </View>
              ))}
            </View>

            <View className="mt-4 flex-row items-center justify-between">
              <Text className="text-xs" style={{ color: '#9CA3AF' }}>
                Gemiddelde: 7.9
              </Text>
              <Text className="text-xs" style={{ color: colors.salie.DEFAULT }}>
                +0.4 t.o.v. vorige week
              </Text>
            </View>
          </Card>
        </View>

        {/* Weekly Insights */}
        <View className="px-6 pt-6">
          <Text
            className="mb-3 text-lg font-semibold"
            style={{ color: colors.nachtblauw }}
          >
            Weekoverzicht
          </Text>

          {WEEKLY_INSIGHTS.map((insight, index) => (
            <Card key={index} className="mb-3 p-5" onPress={() => {}}>
              <View className="flex-row items-start">
                <View
                  className="mr-3 h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: colors.zand.light }}
                >
                  <Text className="text-lg">{insight.icon}</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text
                      className="flex-1 text-base font-semibold"
                      style={{ color: colors.nachtblauw }}
                    >
                      {insight.title}
                    </Text>
                  </View>
                  <Text
                    className="mt-1 text-sm leading-5"
                    style={{ color: '#6B7C8F' }}
                  >
                    {insight.description}
                  </Text>
                  <Text
                    className="mt-2 text-xs"
                    style={{ color: '#9CA3AF' }}
                  >
                    {insight.category}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Chat met coach */}
        <View className="px-6 pt-4">
          <Card className="p-6" onPress={() => {}}>
            <View className="items-center">
              <View
                className="mb-3 h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.oceaan.light + '30' }}
              >
                <Text className="text-3xl">{'\uD83E\uDDD1\u200D\uD83D\uDCBB'}</Text>
              </View>
              <Text
                className="text-lg font-bold"
                style={{ color: colors.nachtblauw }}
              >
                Chat met je coach
              </Text>
              <Text
                className="mt-1 text-center text-sm leading-5"
                style={{ color: '#6B7C8F' }}
              >
                Stel vragen over jullie relatie en krijg persoonlijk advies op
                basis van jullie data.
              </Text>
              <TouchableOpacity
                className="mt-4 rounded-xl px-6 py-3"
                style={{ backgroundColor: colors.oceaan.DEFAULT }}
                activeOpacity={0.8}
              >
                <Text className="text-base font-semibold text-white">
                  Start gesprek
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
