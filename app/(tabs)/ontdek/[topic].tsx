import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '@/lib/theme';
import { getActivitiesForTopic, type ActivityType } from '@/content/topic-activities';
import {
  ArrowLeft,
  MessageCircle,
  HelpCircle,
  Gamepad2,
  MessageSquare,
  ShieldAlert,
  Flame,
  Link2,
  TrendingUp,
  Wallet,
  PartyPopper,
  Briefcase,
  Users,
} from 'lucide-react-native';

const TOPIC_META: Record<string, { label: string; description: string; icon: typeof MessageSquare; color: string }> = {
  communicatie: {
    label: 'Communicatie',
    description: 'Verbeter hoe jullie communiceren en begrijp elkaars behoeften beter.',
    icon: MessageSquare,
    color: colors.oceaan.DEFAULT,
  },
  conflict: {
    label: 'Conflict',
    description: 'Leer hoe jullie omgaan met meningsverschillen en werk samen aan oplossingen.',
    icon: ShieldAlert,
    color: '#E06B50',
  },
  intimiteit: {
    label: 'Sex & Intimiteit',
    description: 'Verdiep jullie intimiteit en versterk de fysieke en emotionele verbinding.',
    icon: Flame,
    color: colors.terracotta.DEFAULT,
  },
  connectie: {
    label: 'Connectie',
    description: 'Versterk de band tussen jullie en bouw aan een diepere verbinding.',
    icon: Link2,
    color: colors.salie.DEFAULT,
  },
  groei: {
    label: 'Groei & Betekenis',
    description: 'Groei samen en als individu, en vind betekenis in jullie relatie.',
    icon: TrendingUp,
    color: colors.goud.DEFAULT,
  },
  geld: {
    label: 'Geld & Financien',
    description: 'Bespreek financiele onderwerpen open en werk samen aan jullie doelen.',
    icon: Wallet,
    color: '#6B8E8E',
  },
  plezier: {
    label: 'Plezier & Avontuur',
    description: 'Breng meer plezier en spontaniteit in jullie relatie.',
    icon: PartyPopper,
    color: '#D4728C',
  },
  werk: {
    label: 'Huis & Werk',
    description: 'Vind balans tussen werk en thuis en steun elkaar in het dagelijks leven.',
    icon: Briefcase,
    color: '#7B8794',
  },
  familie: {
    label: 'Familie & Vrienden',
    description: 'Navigeer samen door familiedynamiek en sociale relaties.',
    icon: Users,
    color: '#8B7EC8',
  },
};

const TYPE_CONFIG: Record<ActivityType, { label: string; color: string; icon: typeof MessageCircle; route: string }> = {
  vraag: { label: 'Vraag', color: colors.terracotta.DEFAULT, icon: MessageCircle, route: '/activity/question' },
  quiz: { label: 'Quiz', color: colors.oceaan.DEFAULT, icon: HelpCircle, route: '/activity/quiz' },
  spel: { label: 'Spel', color: colors.goud.DEFAULT, icon: Gamepad2, route: '/activity/game' },
};

const FILTERS = ['Alles', 'Vragen', 'Quizzen', 'Spellen'] as const;
const FILTER_TYPE_MAP: Record<string, ActivityType | null> = {
  Alles: null,
  Vragen: 'vraag',
  Quizzen: 'quiz',
  Spellen: 'spel',
};

export default function TopicDetailScreen() {
  const { topic } = useLocalSearchParams<{ topic: string }>();
  const [activeFilter, setActiveFilter] = useState<string>('Alles');

  const activities = useMemo(() => {
    const all = getActivitiesForTopic(topic ?? '');
    const typeFilter = FILTER_TYPE_MAP[activeFilter];
    if (!typeFilter) return all;
    return all.filter((a) => a.type === typeFilter);
  }, [topic, activeFilter]);

  const meta = TOPIC_META[topic ?? ''];
  const TopicIcon = meta?.icon;

  function handleActivityPress(activity: { id: string; type: ActivityType; title: string; description: string; topic: string }) {
    const config = TYPE_CONFIG[activity.type];
    if (activity.type === 'vraag') {
      router.push({
        pathname: '/activity/question',
        params: {
          questionId: activity.id,
          questionText: activity.title,
          questionCategory: activity.topic,
          followUp: activity.description,
        },
      });
    } else if (activity.type === 'quiz') {
      router.push('/activity/quiz');
    } else {
      router.push('/activity/game');
    }
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      {/* Navigation header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.zand.DEFAULT }}
        >
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Topic header with description */}
      {meta && (
        <View className="px-6 pb-4">
          <View className="flex-row items-start">
            <View className="flex-1">
              <Text
                className="text-2xl font-bold"
                style={{ color: colors.nachtblauw }}
              >
                {meta.label}
              </Text>
              <Text
                className="mt-2 text-sm leading-5"
                style={{ color: '#6B7C8F' }}
              >
                {meta.description}
              </Text>
            </View>
            <View
              className="ml-4 h-16 w-16 items-center justify-center rounded-2xl"
              style={{ backgroundColor: meta.color + '12' }}
            >
              <TopicIcon size={28} color={meta.color} strokeWidth={1.5} />
            </View>
          </View>
        </View>
      )}

      {/* Filter tabs */}
      <View className="mx-6 flex-row rounded-xl p-1" style={{ backgroundColor: colors.zand.light }}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            className="flex-1 items-center rounded-lg py-2"
            style={{
              backgroundColor: activeFilter === filter ? '#FFFFFF' : 'transparent',
              shadowColor: activeFilter === filter ? '#000' : 'transparent',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: activeFilter === filter ? 0.08 : 0,
              shadowRadius: 2,
            }}
          >
            <Text
              className="text-sm font-semibold"
              style={{
                color: activeFilter === filter ? colors.nachtblauw : '#9CA3AF',
              }}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Activities list */}
      <ScrollView
        className="mt-4 flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {activities.map((activity) => {
          const config = TYPE_CONFIG[activity.type];
          const Icon = config.icon;

          return (
            <TouchableOpacity
              key={activity.id}
              activeOpacity={0.7}
              onPress={() => handleActivityPress(activity)}
              className="mb-3 flex-row items-center rounded-2xl p-4"
              style={{
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              {/* Illustration thumbnail */}
              <View
                className="mr-4 h-16 w-16 items-center justify-center rounded-2xl"
                style={{ backgroundColor: config.color + '10' }}
              >
                <Icon size={26} color={config.color} strokeWidth={1.3} />
              </View>

              <View className="flex-1">
                {/* Type badge */}
                <View
                  className="mb-1 self-start rounded-md px-2 py-0.5"
                  style={{ backgroundColor: config.color + '15' }}
                >
                  <Text
                    className="text-xs font-bold"
                    style={{ color: config.color }}
                  >
                    {config.label}
                  </Text>
                </View>

                {/* Title */}
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.nachtblauw }}
                  numberOfLines={1}
                >
                  {activity.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {activities.length === 0 && (
          <View className="items-center py-12">
            <Text className="text-sm" style={{ color: '#9CA3AF' }}>
              Geen activiteiten gevonden voor dit filter
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
