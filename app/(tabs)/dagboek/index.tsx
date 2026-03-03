import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/Card';
import { colors } from '@/lib/theme';

const MOMENTS = [
  {
    id: '1',
    story: 'Spontaan samen ontbijt gemaakt. Thomas maakte de pannenkoeken, ik deed de koffie. Soms zijn het dit soort ochtenden die het verschil maken.',
    date: '2 maart 2026',
    location: 'Thuis',
    isFavorite: true,
  },
  {
    id: '2',
    story: 'Lange wandeling door het park na het werk. We praatten over onze dromen voor de zomer. Het voelde licht en hoopvol.',
    date: '28 februari 2026',
    location: 'Vondelpark',
    isFavorite: false,
  },
  {
    id: '3',
    story: 'Film avond op de bank met warme chocolademelk. We hebben allebei gehuild bij het einde, haha.',
    date: '25 februari 2026',
    location: null,
    isFavorite: true,
  },
];

export default function DagboekScreen() {
  const hasMoments = MOMENTS.length > 0;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <View className="flex-row items-center justify-between">
            <View>
              <Text
                className="text-2xl font-bold"
                style={{ color: colors.nachtblauw }}
              >
                Dagboek
              </Text>
              <Text className="mt-1 text-sm" style={{ color: '#6B7C8F' }}>
                Jullie mooiste momenten samen
              </Text>
            </View>
          </View>
        </View>

        {/* New moment button */}
        <View className="px-6 pt-3">
          <TouchableOpacity
            className="flex-row items-center justify-center rounded-2xl py-4"
            style={{ backgroundColor: colors.terracotta.DEFAULT }}
            activeOpacity={0.8}
          >
            <Text className="mr-2 text-xl text-white">+</Text>
            <Text className="text-base font-semibold text-white">
              Nieuw moment
            </Text>
          </TouchableOpacity>
        </View>

        {hasMoments ? (
          <>
            {/* Month section */}
            <View className="px-6 pt-6">
              <Text
                className="mb-3 text-sm font-semibold uppercase tracking-wider"
                style={{ color: '#9CA3AF' }}
              >
                Maart 2026
              </Text>

              {MOMENTS.filter((m) => m.date.includes('maart')).map(
                (moment) => (
                  <Card key={moment.id} className="mb-3 p-5" onPress={() => {}}>
                    {/* Photo placeholder */}
                    <View
                      className="mb-4 h-44 items-center justify-center rounded-xl"
                      style={{ backgroundColor: colors.zand.light }}
                    >
                      <Text className="text-4xl">{'\uD83D\uDCF7'}</Text>
                      <Text
                        className="mt-1 text-xs"
                        style={{ color: '#9CA3AF' }}
                      >
                        Foto toevoegen
                      </Text>
                    </View>

                    <Text
                      className="text-base leading-6"
                      style={{ color: colors.nachtblauw }}
                    >
                      {moment.story}
                    </Text>

                    <View className="mt-3 flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Text className="text-xs" style={{ color: '#9CA3AF' }}>
                          {moment.date}
                        </Text>
                        {moment.location && (
                          <Text
                            className="text-xs"
                            style={{ color: '#9CA3AF' }}
                          >
                            {' '}
                            · {moment.location}
                          </Text>
                        )}
                      </View>
                      <Text className="text-lg">
                        {moment.isFavorite ? '\u2665' : '\u2661'}
                      </Text>
                    </View>
                  </Card>
                ),
              )}
            </View>

            <View className="px-6 pt-2">
              <Text
                className="mb-3 text-sm font-semibold uppercase tracking-wider"
                style={{ color: '#9CA3AF' }}
              >
                Februari 2026
              </Text>

              {MOMENTS.filter((m) => m.date.includes('februari')).map(
                (moment) => (
                  <Card key={moment.id} className="mb-3 p-5" onPress={() => {}}>
                    <View
                      className="mb-4 h-44 items-center justify-center rounded-xl"
                      style={{ backgroundColor: colors.zand.light }}
                    >
                      <Text className="text-4xl">{'\uD83D\uDCF7'}</Text>
                      <Text
                        className="mt-1 text-xs"
                        style={{ color: '#9CA3AF' }}
                      >
                        Foto toevoegen
                      </Text>
                    </View>

                    <Text
                      className="text-base leading-6"
                      style={{ color: colors.nachtblauw }}
                    >
                      {moment.story}
                    </Text>

                    <View className="mt-3 flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Text className="text-xs" style={{ color: '#9CA3AF' }}>
                          {moment.date}
                        </Text>
                        {moment.location && (
                          <Text
                            className="text-xs"
                            style={{ color: '#9CA3AF' }}
                          >
                            {' '}
                            · {moment.location}
                          </Text>
                        )}
                      </View>
                      <Text className="text-lg">
                        {moment.isFavorite ? '\u2665' : '\u2661'}
                      </Text>
                    </View>
                  </Card>
                ),
              )}
            </View>
          </>
        ) : (
          /* Empty state */
          <View className="flex-1 items-center justify-center px-8 pt-32">
            <Text className="text-5xl">{'\uD83D\uDCF8'}</Text>
            <Text
              className="mt-4 text-center text-lg font-semibold"
              style={{ color: colors.nachtblauw }}
            >
              Leg jullie eerste moment samen vast!
            </Text>
            <Text
              className="mt-2 text-center text-sm leading-5"
              style={{ color: '#6B7C8F' }}
            >
              Deel foto's, verhalen en herinneringen. Samen bouw je een
              prachtig dagboek op.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
