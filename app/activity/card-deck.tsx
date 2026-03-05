import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, warmShadow, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react-native';
import { CARD_DECKS } from '@/content/card-decks';
import * as Haptics from 'expo-haptics';

export default function CardDeckScreen() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const deck = CARD_DECKS.find((d) => d.id === deckId);

  if (!deck) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: colors.warmwit }}>
        <Text className="text-base" style={{ color: '#6B7C8F' }}>
          Deck niet gevonden
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          className="mt-4 px-6 py-3"
          style={{ backgroundColor: colors.terracotta.DEFAULT, borderRadius: organic.card }}
        >
          <Text className="text-base font-semibold text-white">Terug</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const total = deck.cards.length;
  const isFinished = currentIndex >= total;
  const progress = ((currentIndex) / total) * 100;

  const goNext = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentIndex((i) => i + 1);
  };

  const goPrevious = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  if (isFinished) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
        <LinearGradient
          colors={gradients.headerSoft}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
        />
        <View className="flex-row items-center px-5 py-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.zand.DEFAULT }}
          >
            <X size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center justify-center px-8">
          <View
            className="w-full items-center px-6 py-12"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: organic.card,
              ...warmShadow,
              borderTopWidth: 4,
              borderTopColor: deck.color,
            }}
          >
            <View
              className="mb-5 h-20 w-20 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.salie.DEFAULT + '15' }}
            >
              <Check size={40} color={colors.salie.DEFAULT} strokeWidth={2} />
            </View>
            <Text
              className="text-center text-xl font-bold"
              style={{ color: colors.nachtblauw }}
            >
              Alle {total} kaarten doorlopen!
            </Text>
            <Text
              className="mt-2 text-center text-sm leading-5"
              style={{ color: '#6B7C8F' }}
            >
              Goed gedaan! Probeer volgende keer een ander deck voor nieuwe gesprekken.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            className="mt-8 w-full items-center py-4"
            style={{ backgroundColor: deck.color, borderRadius: organic.card }}
          >
            <Text className="text-base font-semibold text-white">Terug</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const card = deck.cards[currentIndex];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={gradients.headerSoft}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
      />

      {/* Header */}
      <View className="flex-row items-center px-5 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.zand.DEFAULT }}
        >
          <X size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <View className="ml-3 flex-1">
          <Text className="text-lg font-bold" style={{ color: colors.nachtblauw }}>
            {deck.title}
          </Text>
        </View>
        <Text className="text-sm font-medium" style={{ color: '#6B7C8F' }}>
          {currentIndex + 1} / {total}
        </Text>
      </View>

      {/* Progress bar */}
      <View className="mx-6 mt-1">
        <View
          className="h-2.5 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: colors.zand.DEFAULT }}
        >
          <View
            className="h-2.5 rounded-full"
            style={{
              backgroundColor: deck.color,
              width: `${progress}%`,
            }}
          />
        </View>
      </View>

      {/* Card */}
      <View className="flex-1 items-center justify-center px-6">
        <View
          className="w-full overflow-hidden"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: organic.card,
            ...warmShadow,
            shadowOpacity: 0.12,
            borderWidth: 1,
            borderColor: deck.color + '15',
          }}
        >
          {/* Color accent top bar */}
          <View style={{ height: 4, backgroundColor: deck.color, opacity: 0.7 }} />
          <View className="items-center px-8 py-14">
            <Text
              className="text-center text-xl font-bold leading-8"
              style={{ color: colors.nachtblauw }}
            >
              {card.text}
            </Text>
            {card.followUp && (
              <View
                className="mt-5 rounded-xl px-4 py-3"
                style={{ backgroundColor: deck.color + '08' }}
              >
                <Text
                  className="text-center text-sm italic leading-5"
                  style={{ color: deck.color }}
                >
                  {card.followUp}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Navigation buttons */}
      <View className="flex-row px-6 pb-8">
        <TouchableOpacity
          onPress={goPrevious}
          activeOpacity={0.7}
          disabled={currentIndex === 0}
          className="mr-2 flex-1 flex-row items-center justify-center py-4"
          style={{
            backgroundColor: currentIndex === 0 ? colors.zand.DEFAULT : colors.zand.dark,
            borderRadius: organic.card,
          }}
        >
          <ChevronLeft
            size={20}
            color={currentIndex === 0 ? '#9CA3AF' : colors.nachtblauw}
            strokeWidth={2}
          />
          <Text
            className="ml-1 text-base font-semibold"
            style={{ color: currentIndex === 0 ? '#9CA3AF' : colors.nachtblauw }}
          >
            Vorige
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goNext}
          activeOpacity={0.7}
          className="ml-2 flex-1 flex-row items-center justify-center py-4"
          style={{
            backgroundColor: deck.color,
            borderRadius: organic.card,
          }}
        >
          <Text className="mr-1 text-base font-semibold text-white">
            Volgende
          </Text>
          <ChevronRight size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
