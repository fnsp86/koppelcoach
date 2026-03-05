import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '@/lib/theme';
import { TOPIC_ACTIVITIES, type ActivityType } from '@/content/topic-activities';
import {
  ArrowLeft,
  MessageCircle,
  HelpCircle,
  Gamepad2,
} from 'lucide-react-native';

const TYPE_CONFIG: Record<ActivityType, { label: string; color: string; icon: typeof MessageCircle }> = {
  vraag: { label: 'Vraag', color: colors.terracotta.DEFAULT, icon: MessageCircle },
  quiz: { label: 'Quiz', color: colors.oceaan.DEFAULT, icon: HelpCircle },
  spel: { label: 'Spel', color: colors.goud.DEFAULT, icon: Gamepad2 },
};

const TOPIC_LABELS: Record<string, string> = {
  communicatie: 'Communicatie',
  conflict: 'Conflict',
  intimiteit: 'Intimiteit',
  connectie: 'Connectie',
  groei: 'Groei',
  geld: 'Geld',
  plezier: 'Plezier',
  werk: 'Huis & Werk',
  familie: 'Familie',
};

export default function TypeListScreen() {
  const { type, label } = useLocalSearchParams<{ type: string; label: string }>();

  const activities = useMemo(() => {
    return TOPIC_ACTIVITIES.filter((a) => a.type === (type as ActivityType));
  }, [type]);

  const config = TYPE_CONFIG[type as ActivityType] ?? TYPE_CONFIG.vraag;

  function handlePress(activity: typeof activities[0]) {
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
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.zand.DEFAULT }}
        >
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <View className="ml-3 flex-row items-center">
          <View
            className="mr-2 rounded-md px-2.5 py-1"
            style={{ backgroundColor: config.color + '15' }}
          >
            <Text className="text-xs font-bold" style={{ color: config.color }}>
              {label ?? config.label}
            </Text>
          </View>
          <Text className="text-lg font-bold" style={{ color: colors.nachtblauw }}>
            {activities.length} activiteiten
          </Text>
        </View>
      </View>

      {/* Activities list */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {activities.map((activity) => {
          const Icon = config.icon;
          const topicLabel = TOPIC_LABELS[activity.topic] ?? activity.topic;

          return (
            <TouchableOpacity
              key={activity.id}
              activeOpacity={0.7}
              onPress={() => handlePress(activity)}
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
              <View
                className="mr-4 h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: config.color + '10' }}
              >
                <Icon size={24} color={config.color} strokeWidth={1.3} />
              </View>

              <View className="flex-1">
                <Text
                  className="text-xs font-medium"
                  style={{ color: '#9CA3AF' }}
                >
                  {topicLabel}
                </Text>
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.nachtblauw }}
                  numberOfLines={2}
                >
                  {activity.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
