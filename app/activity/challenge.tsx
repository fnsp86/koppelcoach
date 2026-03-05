import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, warmShadow, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Target,
  Check,
  ChevronRight,
  Star,
} from 'lucide-react-native';
import { challenges } from '@/content/challenges';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';

const DAY_LABELS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

export default function ChallengeScreen() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [completedDays, setCompletedDays] = useState<boolean[]>(
    new Array(7).fill(false)
  );
  const addEntry = useVerhaalStore((s) => s.addEntry);

  const currentChallenge = challenges[challengeIndex];
  const todayIndex = new Date().getDay();
  // Convert from Sunday=0 to Monday=0
  const adjustedToday = todayIndex === 0 ? 6 : todayIndex - 1;

  const completedCount = completedDays.filter(Boolean).length;
  const progress = (completedCount / 7) * 100;
  const allComplete = completedCount === 7;

  const toggleDay = (index: number) => {
    // Only allow toggling today or past days
    if (index > adjustedToday) return;
    setCompletedDays((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      // Log entry when all 7 days are completed
      if (next.every(Boolean)) {
        addEntry({ type: 'activity', data: { title: 'Weekuitdaging voltooid', activityType: 'challenge' } });
      }
      return next;
    });
  };

  const nextChallenge = () => {
    if (challengeIndex < challenges.length - 1) {
      setChallengeIndex(challengeIndex + 1);
      setCompletedDays(new Array(7).fill(false));
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={gradients.headerSoft }
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
          className="ml-3 text-lg font-bold"
          style={{ color: colors.nachtblauw }}
        >
          Uitdaging
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Challenge card */}
        <View
          className="mt-4 p-6"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: organic.card,
            ...warmShadow,
          }}
        >
          {/* Challenge icon & number */}
          <View className="flex-row items-center">
            <View
              className="h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.terracotta.DEFAULT + '15' }}
            >
              <Target size={24} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-xs font-medium" style={{ color: '#9CA3AF' }}>
                Uitdaging {challengeIndex + 1} van {challenges.length}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text
            className="mt-4 text-xl font-bold"
            style={{ color: colors.nachtblauw }}
          >
            {currentChallenge.title}
          </Text>

          {/* Description */}
          <Text
            className="mt-2 text-base leading-6"
            style={{ color: '#6B7C8F' }}
          >
            {currentChallenge.description}
          </Text>

          {/* Daily action */}
          <View
            className="mt-4 p-4"
            style={{ backgroundColor: colors.salie.DEFAULT + '10', borderRadius: organic.card }}
          >
            <Text className="text-xs font-semibold" style={{ color: colors.salie.dark }}>
              Dagelijkse actie
            </Text>
            <Text
              className="mt-1.5 text-sm leading-5"
              style={{ color: colors.nachtblauw }}
            >
              {currentChallenge.dailyAction}
            </Text>
          </View>
        </View>

        {/* 7-day progress */}
        <View className="mt-6">
          <Text className="mb-3 text-sm font-semibold" style={{ color: colors.nachtblauw }}>
            Weekvoortgang
          </Text>
          <View className="flex-row justify-between">
            {DAY_LABELS.map((day, index) => {
              const isCompleted = completedDays[index];
              const isToday = index === adjustedToday;
              const isFuture = index > adjustedToday;

              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => toggleDay(index)}
                  activeOpacity={isFuture ? 1 : 0.7}
                  className="items-center"
                >
                  <View
                    className="h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: isCompleted
                        ? colors.salie.DEFAULT
                        : isToday
                          ? colors.terracotta.DEFAULT + '15'
                          : isFuture
                            ? colors.zand.light
                            : colors.zand.DEFAULT,
                      borderWidth: isToday && !isCompleted ? 2 : 0,
                      borderColor: isToday ? colors.terracotta.DEFAULT : 'transparent',
                    }}
                  >
                    {isCompleted ? (
                      <Check size={18} color="#FFFFFF" strokeWidth={2.5} />
                    ) : (
                      <Text
                        className="text-xs font-medium"
                        style={{
                          color: isFuture ? '#C8CDD3' : colors.nachtblauw,
                        }}
                      >
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  <Text
                    className="mt-1.5 text-xs"
                    style={{
                      color: isToday
                        ? colors.terracotta.DEFAULT
                        : isCompleted
                          ? colors.salie.DEFAULT
                          : '#9CA3AF',
                      fontWeight: isToday ? '700' : '400',
                    }}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Progress bar */}
        <View className="mt-6">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-sm font-medium" style={{ color: '#6B7C8F' }}>
              Voortgang
            </Text>
            <Text className="text-sm font-semibold" style={{ color: colors.nachtblauw }}>
              {completedCount} / 7 dagen
            </Text>
          </View>
          <View
            className="h-3 w-full overflow-hidden rounded-full"
            style={{ backgroundColor: colors.zand.DEFAULT }}
          >
            <View
              className="h-3 rounded-full"
              style={{
                backgroundColor: colors.salie.DEFAULT,
                width: `${progress}%`,
              }}
            />
          </View>
        </View>

        {/* Next challenge button */}
        {allComplete && challengeIndex < challenges.length - 1 && (
          <View className="mt-6">
            <View
              className="mb-4 items-center p-4"
              style={{ backgroundColor: colors.goud.DEFAULT + '12', borderRadius: organic.card }}
            >
              <Star size={24} color={colors.goud.DEFAULT} strokeWidth={1.5} />
              <Text
                className="mt-2 text-base font-bold"
                style={{ color: colors.goud.dark }}
              >
                Uitdaging voltooid!
              </Text>
              <Text className="mt-1 text-center text-sm" style={{ color: '#6B7C8F' }}>
                Geweldig, jullie hebben alle 7 dagen volgehouden
              </Text>
            </View>
            <TouchableOpacity
              onPress={nextChallenge}
              activeOpacity={0.8}
              className="flex-row items-center justify-center py-4"
              style={{ backgroundColor: colors.terracotta.DEFAULT, borderRadius: organic.card }}
            >
              <Text className="text-base font-semibold text-white">
                Volgende uitdaging
              </Text>
              <ChevronRight size={18} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
