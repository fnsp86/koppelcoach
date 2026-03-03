import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { colors } from '@/lib/theme';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Goedemorgen';
  if (hour < 18) return 'Goedemiddag';
  return 'Goedenavond';
}

const MOODS = [
  { emoji: '\uD83D\uDE14', label: 'Laag' },
  { emoji: '\uD83D\uDE15', label: 'Mwah' },
  { emoji: '\uD83D\uDE42', label: 'Oké' },
  { emoji: '\uD83D\uDE0A', label: 'Goed' },
  { emoji: '\uD83E\uDD29', label: 'Top' },
];

export default function VandaagScreen() {
  const [selectedMood, setSelectedMood] = React.useState<number | null>(null);

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
            {getGreeting()}, Emma!
          </Text>
          <View className="mt-1 flex-row items-center">
            <View
              className="mr-2 h-2 w-2 rounded-full"
              style={{ backgroundColor: colors.salie.DEFAULT }}
            />
            <Text className="text-sm" style={{ color: '#6B7C8F' }}>
              Thomas is online
            </Text>
          </View>
        </View>

        {/* Daily Question */}
        <View className="px-6 pt-4">
          <Card className="p-6">
            <View className="mb-3 flex-row items-center justify-between">
              <Text
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: colors.terracotta.DEFAULT }}
              >
                Vraag van de dag
              </Text>
              <Text className="text-xs" style={{ color: '#9CA3AF' }}>
                Dag 14
              </Text>
            </View>
            <Text
              className="text-xl font-semibold leading-7"
              style={{ color: colors.nachtblauw }}
            >
              Wat is iets kleins dat ik onlangs voor je deed en dat je blij
              maakte?
            </Text>
            <TouchableOpacity
              className="mt-5 items-center rounded-xl py-3.5"
              style={{ backgroundColor: colors.terracotta.DEFAULT }}
              activeOpacity={0.8}
            >
              <Text className="text-base font-semibold text-white">
                Beantwoorden
              </Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Check-in */}
        <View className="px-6 pt-4">
          <Card className="p-6">
            <Text
              className="mb-1 text-xs font-semibold uppercase tracking-wider"
              style={{ color: colors.salie.DEFAULT }}
            >
              Dagelijkse check-in
            </Text>
            <Text
              className="mb-5 text-lg font-semibold"
              style={{ color: colors.nachtblauw }}
            >
              Hoe voel je je vandaag?
            </Text>
            <View className="flex-row justify-between">
              {MOODS.map((mood, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedMood(index)}
                  className="items-center rounded-2xl px-3 py-3"
                  style={{
                    backgroundColor:
                      selectedMood === index
                        ? colors.terracotta.light + '20'
                        : 'transparent',
                    borderWidth: selectedMood === index ? 2 : 0,
                    borderColor: colors.terracotta.DEFAULT,
                  }}
                >
                  <Text className="text-3xl">{mood.emoji}</Text>
                  <Text
                    className="mt-1 text-xs"
                    style={{
                      color:
                        selectedMood === index
                          ? colors.terracotta.DEFAULT
                          : '#9CA3AF',
                      fontWeight: selectedMood === index ? '600' : '400',
                    }}
                  >
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </View>

        {/* Jullie ritme */}
        <View className="px-6 pt-4">
          <Card className="p-6">
            <Text
              className="mb-4 text-xs font-semibold uppercase tracking-wider"
              style={{ color: colors.oceaan.DEFAULT }}
            >
              Jullie ritme
            </Text>

            <View className="flex-row justify-between">
              <View className="items-center">
                <Text
                  className="text-3xl font-bold"
                  style={{ color: colors.terracotta.DEFAULT }}
                >
                  14
                </Text>
                <Text className="mt-1 text-xs" style={{ color: '#6B7C8F' }}>
                  Dagen streak
                </Text>
              </View>

              <View
                className="mx-4"
                style={{ width: 1, backgroundColor: colors.zand.DEFAULT }}
              />

              <View className="items-center">
                <Text
                  className="text-3xl font-bold"
                  style={{ color: colors.salie.DEFAULT }}
                >
                  87%
                </Text>
                <Text className="mt-1 text-xs" style={{ color: '#6B7C8F' }}>
                  Consistentie
                </Text>
              </View>

              <View
                className="mx-4"
                style={{ width: 1, backgroundColor: colors.zand.DEFAULT }}
              />

              <View className="items-center">
                <Text
                  className="text-3xl font-bold"
                  style={{ color: colors.goud.DEFAULT }}
                >
                  42
                </Text>
                <Text className="mt-1 text-xs" style={{ color: '#6B7C8F' }}>
                  Vragen beantwoord
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Relationship pulse mini */}
        <View className="px-6 pt-4">
          <Card className="p-6">
            <View className="flex-row items-center justify-between">
              <View>
                <Text
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: colors.goud.DEFAULT }}
                >
                  Relatiepols
                </Text>
                <Text
                  className="mt-1 text-2xl font-bold"
                  style={{ color: colors.nachtblauw }}
                >
                  8.2 / 10
                </Text>
              </View>
              <View
                className="h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.salie.light + '30' }}
              >
                <Text className="text-2xl">{'\u2665'}</Text>
              </View>
            </View>
            <Text className="mt-2 text-xs" style={{ color: '#6B7C8F' }}>
              Jullie scoren hoger dan vorige week. Goed bezig!
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
