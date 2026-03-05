import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, organic, gradients, warmShadow } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Layers, ChevronRight } from 'lucide-react-native';
import { CARD_DECKS } from '@/content/card-decks';

export default function CardDecksScreen() {
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
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <Text
          className="ml-3 text-xl font-bold"
          style={{ color: colors.nachtblauw }}
        >
          Kaartendecks
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          className="mt-1 text-sm leading-5"
          style={{ color: '#6B7C8F' }}
        >
          Kies een thema en wissel kaarten uit om het gesprek op gang te brengen
        </Text>

        <View className="mt-6 flex-row flex-wrap" style={{ gap: 12 }}>
          {CARD_DECKS.map((deck) => (
            <TouchableOpacity
              key={deck.id}
              activeOpacity={0.7}
              onPress={() =>
                router.push({
                  pathname: '/activity/card-deck',
                  params: { deckId: deck.id },
                })
              }
              style={{
                width: '47%' as any,
                borderRadius: organic.card,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: deck.color + '18',
                overflow: 'hidden',
                ...warmShadow,
              }}
            >
              <View className="p-4">
                <View
                  className="mb-3 h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: deck.color + '12' }}
                >
                  <Layers size={22} color={deck.color} strokeWidth={1.8} />
                </View>
                <Text
                  className="text-base font-bold"
                  style={{ color: colors.nachtblauw }}
                  numberOfLines={1}
                >
                  {deck.title}
                </Text>
                <Text
                  className="mt-1 text-xs leading-4"
                  style={{ color: '#6B7C8F' }}
                  numberOfLines={3}
                >
                  {deck.description}
                </Text>
                <View className="mt-3 flex-row items-center">
                  <Text
                    className="text-xs font-semibold"
                    style={{ color: deck.color }}
                  >
                    {deck.cardCount} kaarten
                  </Text>
                  <ChevronRight size={12} color={deck.color} strokeWidth={2.5} />
                </View>
              </View>
              {/* Color accent bar */}
              <View style={{ height: 3, backgroundColor: deck.color, opacity: 0.5 }} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
