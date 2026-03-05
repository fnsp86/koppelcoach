import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, organic, warmShadow } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Layers,
  MessageCircle,
  Gamepad2,
  HelpCircle,
  ChevronRight,
  CalendarHeart,
  Sparkles,
  Home,
  Baby,
  Gem,
  HeartHandshake,
  MapPin,
} from 'lucide-react-native';
import {
  ALL_SITUATIONS,
  getActivitiesForSituation,
  type SituationId,
} from '@/lib/recommendations';

const SITUATION_ICONS: Record<string, any> = {
  Sparkles,
  Home,
  Baby,
  Gem,
  HeartHandshake,
  MapPin,
};

const TYPE_ICONS: Record<string, any> = {
  vraag: MessageCircle,
  quiz: HelpCircle,
  spel: Gamepad2,
};

const TYPE_COLORS: Record<string, string> = {
  vraag: colors.oceaan.DEFAULT,
  quiz: colors.salie.DEFAULT,
  spel: colors.goud.DEFAULT,
};

export default function SituationScreen() {
  const { situation } = useLocalSearchParams<{ situation: string }>();
  const sit = ALL_SITUATIONS.find((s) => s.id === situation);

  if (!sit) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#6B7C8F' }}>Situatie niet gevonden</Text>
      </SafeAreaView>
    );
  }

  const { decks, activities, dates } = getActivitiesForSituation(situation as SituationId);
  const Icon = SITUATION_ICONS[sit.icon] ?? Sparkles;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={[sit.color + '15', colors.warmwit]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 220 }}
      />

      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
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
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Situation info */}
        <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: sit.color + '18',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Icon size={28} color={sit.color} strokeWidth={1.5} />
          </View>
          <Text style={{ fontSize: 28, fontWeight: '700', color: colors.nachtblauw }}>
            {sit.title}
          </Text>
          <Text style={{ fontSize: 15, color: '#6B7C8F', marginTop: 4, lineHeight: 22 }}>
            {sit.subtitle}
          </Text>
        </View>

        {/* Card decks for this situation */}
        {decks.length > 0 && (
          <View style={{ paddingHorizontal: 24, paddingTop: 28 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginBottom: 12 }}>
              Kaartendecks
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
            >
              {decks.map((deck: any) => (
                <TouchableOpacity
                  key={deck.id}
                  activeOpacity={0.7}
                  onPress={() =>
                    router.push({
                      pathname: '/activity/card-deck' as any,
                      params: { deckId: deck.id },
                    })
                  }
                  style={{
                    width: 160,
                    borderRadius: organic.card,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: deck.color + '18',
                    overflow: 'hidden',
                    ...warmShadow,
                    shadowOpacity: 0.05,
                  }}
                >
                  <View style={{ padding: 14 }}>
                    <View
                      style={{
                        height: 36,
                        width: 36,
                        borderRadius: 10,
                        backgroundColor: deck.color + '12',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 8,
                      }}
                    >
                      <Layers size={16} color={deck.color} strokeWidth={1.8} />
                    </View>
                    <Text
                      style={{ fontSize: 13, fontWeight: '700', color: colors.nachtblauw }}
                      numberOfLines={1}
                    >
                      {deck.title}
                    </Text>
                    <Text style={{ fontSize: 11, color: '#6B7C8F', marginTop: 2 }} numberOfLines={2}>
                      {deck.description}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                      <Text style={{ fontSize: 11, fontWeight: '600', color: deck.color }}>
                        {deck.cardCount} kaarten
                      </Text>
                      <ChevronRight size={10} color={deck.color} strokeWidth={2.5} />
                    </View>
                  </View>
                  <View style={{ height: 2.5, backgroundColor: deck.color, opacity: 0.4 }} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Activities for this situation */}
        {activities.length > 0 && (
          <View style={{ paddingHorizontal: 24, paddingTop: 28 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginBottom: 12 }}>
              Activiteiten
            </Text>
            {activities.slice(0, 12).map((a: any) => {
              const TypeIcon = TYPE_ICONS[a.type] ?? MessageCircle;
              const typeColor = TYPE_COLORS[a.type] ?? colors.oceaan.DEFAULT;
              return (
                <TouchableOpacity
                  key={a.id}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (a.type === 'quiz') {
                      router.push('/activity/quiz' as any);
                    } else if (a.type === 'spel') {
                      router.push('/activity/game' as any);
                    } else {
                      router.push({
                        pathname: '/activity/question' as any,
                        params: {
                          questionId: a.id,
                          questionText: a.title,
                          questionCategory: a.topic,
                          followUp: '',
                        },
                      });
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 14,
                    padding: 14,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: colors.zand.DEFAULT,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: typeColor + '12',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}
                  >
                    <TypeIcon size={16} color={typeColor} strokeWidth={1.8} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{ fontSize: 14, fontWeight: '600', color: colors.nachtblauw }}
                      numberOfLines={1}
                    >
                      {a.title}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#6B7C8F', marginTop: 1 }} numberOfLines={1}>
                      {a.description}
                    </Text>
                  </View>
                  <ChevronRight size={16} color="#9CA3AF" strokeWidth={2} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Date ideas */}
        <View style={{ paddingHorizontal: 24, paddingTop: 28 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw }}>
              Date-ideeen
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/activity/dates' as any)}
              activeOpacity={0.7}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ fontSize: 13, fontWeight: '600', color: colors.terracotta.DEFAULT }}>
                Alle dates
              </Text>
              <ChevronRight size={14} color={colors.terracotta.DEFAULT} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {dates.slice(0, 8).map((d: any) => (
              <View
                key={d.id}
                style={{
                  width: 180,
                  borderRadius: organic.card,
                  backgroundColor: '#FFFFFF',
                  padding: 14,
                  borderWidth: 1,
                  borderColor: colors.zand.DEFAULT,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: '#8B7EC8' + '12',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8,
                  }}
                >
                  <CalendarHeart size={16} color="#8B7EC8" strokeWidth={1.8} />
                </View>
                <Text
                  style={{ fontSize: 13, fontWeight: '700', color: colors.nachtblauw }}
                  numberOfLines={2}
                >
                  {d.title}
                </Text>
                <Text
                  style={{ fontSize: 11, color: '#6B7C8F', marginTop: 4, lineHeight: 15 }}
                  numberOfLines={3}
                >
                  {d.description}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
