import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, organic, gradients, warmShadow } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, TrendingUp, Calendar, Flame, Heart, Lightbulb } from 'lucide-react-native';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import Svg, { Circle } from 'react-native-svg';

const DAY_NAMES = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];

type WeekData = { week: string; mood: number; pulse: number };

function computeCheckinWeeks(
  entries: { type: string; created_at: string; data: any }[],
): WeekData[] {
  const checkins = entries.filter((e) => e.type === 'checkin');
  if (checkins.length === 0) return [];

  const now = new Date();
  const weeks: Map<string, { moods: number[]; pulses: number[] }> = new Map();

  checkins.forEach((e) => {
    const date = new Date(e.created_at);
    const diffMs = now.getTime() - date.getTime();
    const weeksAgo = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
    if (weeksAgo >= 4) return;

    const key = `W${4 - weeksAgo}`;
    if (!weeks.has(key)) weeks.set(key, { moods: [], pulses: [] });
    const w = weeks.get(key)!;
    w.moods.push(e.data.mood);
    w.pulses.push(e.data.pulse);
  });

  const result: WeekData[] = [];
  for (let i = 1; i <= 4; i++) {
    const key = `W${i}`;
    const w = weeks.get(key);
    if (w && w.moods.length > 0) {
      result.push({
        week: key,
        mood: w.moods.reduce((a: number, b: number) => a + b, 0) / w.moods.length,
        pulse: w.pulses.reduce((a: number, b: number) => a + b, 0) / w.pulses.length,
      });
    } else {
      result.push({ week: key, mood: 0, pulse: 0 });
    }
  }
  return result;
}

function computeStats(entries: { type: string; created_at: string; data: any }[]) {
  const checkins = entries.filter((e) => e.type === 'checkin');

  if (checkins.length === 0) {
    return { avgMood: 0, avgPulse: 0, bestDay: null as string | null, longestStreak: 0, totalCheckins: 0, score: 0 };
  }

  const moods = checkins.map((e) => e.data.mood);
  const pulses = checkins.map((e) => e.data.pulse);
  const avgMood = moods.reduce((a: number, b: number) => a + b, 0) / moods.length;
  const avgPulse = pulses.reduce((a: number, b: number) => a + b, 0) / pulses.length;

  // Best day of week
  const dayTotals: Record<number, { sum: number; count: number }> = {};
  checkins.forEach((e) => {
    const day = new Date(e.created_at).getDay();
    if (!dayTotals[day]) dayTotals[day] = { sum: 0, count: 0 };
    dayTotals[day].sum += e.data.mood + e.data.pulse;
    dayTotals[day].count += 1;
  });
  let bestDay: string | null = null;
  let bestAvg = 0;
  Object.entries(dayTotals).forEach(([day, { sum, count }]) => {
    const avg = sum / count;
    if (avg > bestAvg) {
      bestAvg = avg;
      bestDay = DAY_NAMES[parseInt(day)];
    }
  });

  // Longest streak
  const dates = [...new Set(
    checkins.map((e) => new Date(e.created_at).toISOString().slice(0, 10)),
  )].sort().reverse();

  let longestStreak = 1;
  let currentStreak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diffDays = (prev.getTime() - curr.getTime()) / 86400000;
    if (Math.abs(diffDays - 1) < 0.5) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  const score = Math.round(((avgMood + avgPulse) / 10) * 100);

  return { avgMood, avgPulse, bestDay, longestStreak, totalCheckins: checkins.length, score };
}

function ScoreCircle({ score }: { score: number }) {
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <View className="items-center">
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.zand.DEFAULT}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.salie.DEFAULT}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference - progress}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View
          className="items-center justify-center"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Text className="text-4xl font-bold" style={{ color: colors.nachtblauw }}>
            {score}%
          </Text>
        </View>
      </View>
    </View>
  );
}

function getScoreLabel(score: number): { title: string; subtitle: string } {
  if (score >= 80) return { title: 'Uitstekend', subtitle: 'Jullie relatie bloeit' };
  if (score >= 60) return { title: 'Goed', subtitle: 'Jullie relatie is in balans' };
  if (score >= 40) return { title: 'Redelijk', subtitle: 'Er is ruimte voor groei' };
  return { title: 'Aandacht nodig', subtitle: 'Investeer bewust in jullie relatie' };
}

function getTips(avgMood: number, avgPulse: number): string[] {
  const tips: string[] = [];
  if (avgMood > 0 && avgPulse > 0) {
    if (avgPulse < avgMood) {
      tips.push('Jullie stemming is goed, maar de verbinding kan sterker. Zoek bewust momenten van samen zijn.');
    }
    if (avgMood < avgPulse) {
      tips.push('Jullie voelen je verbonden, maar de stemming kan beter. Neem ook tijd voor individueel welzijn.');
    }
    if (avgMood >= 3.5 && avgPulse >= 3.5) {
      tips.push('Jullie scoren hoog op beide vlakken. Blijf investeren in wat werkt.');
    }
  }
  if (tips.length === 0) {
    tips.push('Doe regelmatig een check-in om jullie patronen beter te leren kennen.');
  }
  return tips;
}

export default function InzichtenScreen() {
  const entries = useVerhaalStore((s) => s.entries);
  const weeks = useMemo(() => computeCheckinWeeks(entries), [entries]);
  const stats = useMemo(() => computeStats(entries), [entries]);
  const tips = useMemo(() => getTips(stats.avgMood, stats.avgPulse), [stats]);
  const scoreLabel = getScoreLabel(stats.score);

  const barHeight = 100;
  const maxVal = 5;

  const hasData = stats.totalCheckins > 0;

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
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <Text className="ml-3 text-lg font-bold" style={{ color: colors.nachtblauw }}>
          Relatie-inzichten
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {!hasData ? (
          <View className="items-center px-8 pt-20">
            <View
              className="h-24 w-24 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.oceaan.DEFAULT + '15' }}
            >
              <TrendingUp size={40} color={colors.oceaan.DEFAULT} strokeWidth={1.5} />
            </View>
            <Text className="mt-6 text-xl font-bold" style={{ color: colors.nachtblauw }}>
              Nog geen inzichten
            </Text>
            <Text className="mt-2 text-center text-sm leading-5" style={{ color: '#6B7C8F' }}>
              Doe een paar check-ins om jullie relatie-inzichten te ontgrendelen
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/activity/checkin')}
              activeOpacity={0.8}
              className="mt-6 items-center rounded-xl px-8 py-4"
              style={{ backgroundColor: colors.terracotta.DEFAULT }}
            >
              <Text className="text-base font-semibold text-white">Eerste check-in doen</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Score circle */}
            <View className="items-center px-6 pt-6">
              <ScoreCircle score={stats.score} />
              <Text className="mt-4 text-lg font-bold" style={{ color: colors.nachtblauw }}>
                {scoreLabel.title}
              </Text>
              <Text className="mt-1 text-sm" style={{ color: '#6B7C8F' }}>
                {scoreLabel.subtitle}
              </Text>
            </View>

            {/* Trend chart */}
            <View className="mx-6 mt-6 p-5" style={{ backgroundColor: '#FFFFFF', borderRadius: organic.card, ...warmShadow }}>
              <Text className="mb-4 text-base font-bold" style={{ color: colors.nachtblauw }}>
                Trend (4 weken)
              </Text>
              <View className="flex-row items-end justify-between" style={{ height: barHeight }}>
                {weeks.map((w, i) => (
                  <View key={i} className="flex-1 items-center">
                    <View className="flex-row items-end gap-1.5">
                      <View
                        className="w-5 rounded-t-md"
                        style={{
                          height: Math.max(4, (w.mood / maxVal) * barHeight),
                          backgroundColor: colors.salie.DEFAULT,
                          opacity: w.mood > 0 ? 1 : 0.15,
                        }}
                      />
                      <View
                        className="w-5 rounded-t-md"
                        style={{
                          height: Math.max(4, (w.pulse / maxVal) * barHeight),
                          backgroundColor: colors.oceaan.DEFAULT,
                          opacity: w.pulse > 0 ? 1 : 0.15,
                        }}
                      />
                    </View>
                    <Text className="mt-2 text-xs font-medium" style={{ color: '#9CA3AF' }}>
                      {w.week}
                    </Text>
                  </View>
                ))}
              </View>
              <View className="mt-4 flex-row justify-center gap-5">
                <View className="flex-row items-center">
                  <View className="mr-1.5 h-3 w-3 rounded-full" style={{ backgroundColor: colors.salie.DEFAULT }} />
                  <Text className="text-xs" style={{ color: '#6B7C8F' }}>Stemming</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="mr-1.5 h-3 w-3 rounded-full" style={{ backgroundColor: colors.oceaan.DEFAULT }} />
                  <Text className="text-xs" style={{ color: '#6B7C8F' }}>Verbinding</Text>
                </View>
              </View>
            </View>

            {/* Stats grid */}
            <View className="mx-6 mt-4 flex-row flex-wrap gap-3">
              <View className="flex-1 items-center p-4" style={{ backgroundColor: '#FFFFFF', borderRadius: organic.card, ...warmShadow, minWidth: '45%' }}>
                <Heart size={20} color={colors.salie.DEFAULT} strokeWidth={1.8} />
                <Text className="mt-2 text-xs font-medium" style={{ color: '#6B7C8F' }}>Gem. stemming</Text>
                <Text className="mt-1 text-2xl font-bold" style={{ color: colors.nachtblauw }}>
                  {stats.avgMood.toFixed(1)}
                </Text>
              </View>
              <View className="flex-1 items-center p-4" style={{ backgroundColor: '#FFFFFF', borderRadius: organic.card, ...warmShadow, minWidth: '45%' }}>
                <TrendingUp size={20} color={colors.oceaan.DEFAULT} strokeWidth={1.8} />
                <Text className="mt-2 text-xs font-medium" style={{ color: '#6B7C8F' }}>Gem. verbinding</Text>
                <Text className="mt-1 text-2xl font-bold" style={{ color: colors.nachtblauw }}>
                  {stats.avgPulse.toFixed(1)}
                </Text>
              </View>
              <View className="flex-1 items-center p-4" style={{ backgroundColor: '#FFFFFF', borderRadius: organic.card, ...warmShadow, minWidth: '45%' }}>
                <Calendar size={20} color={colors.goud.DEFAULT} strokeWidth={1.8} />
                <Text className="mt-2 text-xs font-medium" style={{ color: '#6B7C8F' }}>Beste dag</Text>
                <Text className="mt-1 text-2xl font-bold" style={{ color: colors.nachtblauw }}>
                  {stats.bestDay ?? '-'}
                </Text>
              </View>
              <View className="flex-1 items-center p-4" style={{ backgroundColor: '#FFFFFF', borderRadius: organic.card, ...warmShadow, minWidth: '45%' }}>
                <Flame size={20} color={colors.terracotta.DEFAULT} strokeWidth={1.8} />
                <Text className="mt-2 text-xs font-medium" style={{ color: '#6B7C8F' }}>Langste streak</Text>
                <Text className="mt-1 text-2xl font-bold" style={{ color: colors.nachtblauw }}>
                  {stats.longestStreak}
                </Text>
              </View>
            </View>

            {/* Tips */}
            <View className="mx-6 mt-4">
              {tips.map((tip, i) => (
                <View
                  key={i}
                  className="mb-3 flex-row items-start p-4"
                  style={{
                    backgroundColor: colors.salie.DEFAULT + '08',
                    borderWidth: 1,
                    borderColor: colors.salie.DEFAULT + '15',
                    borderRadius: organic.card,
                  }}
                >
                  <Lightbulb size={18} color={colors.salie.DEFAULT} strokeWidth={1.8} />
                  <Text className="ml-3 flex-1 text-sm leading-5" style={{ color: colors.nachtblauw }}>
                    {tip}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
