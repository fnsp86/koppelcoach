import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Avatar } from '@/components/ui/Avatar';
import { WarmCard } from '@/components/ui/WarmCard';
import { Badge } from '@/components/ui/Badge';
import { colors, organic } from '@/lib/theme';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { usePremiumStore } from '@/lib/stores/premium-store';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';
import { usePartnerStore } from '@/lib/stores/partner-store';
import {
  Heart,
  ChevronRight,
  CheckSquare,
  Flame,
  Gift,
  Activity,
  TrendingUp,
  Target,
  Settings,
  Wifi,
  WifiOff,
  Calendar,
  Award,
  MessageCircle,
  Gamepad2,
  Zap,
} from 'lucide-react-native';
import { useActivityHistoryStore } from '@/lib/stores/activity-history-store';
import { LinearGradient } from 'expo-linear-gradient';

const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun',
  'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec',
];

function formatDateLong(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const months = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december',
  ];
  return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

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
        mood: w.moods.reduce((a, b) => a + b, 0) / w.moods.length,
        pulse: w.pulses.reduce((a, b) => a + b, 0) / w.pulses.length,
      });
    } else {
      result.push({ week: key, mood: 0, pulse: 0 });
    }
  }
  return result;
}

function computeStreak(
  entries: { type: string; created_at: string }[],
): number {
  const checkinDates = entries
    .filter((e) => e.type === 'checkin')
    .map((e) => new Date(e.created_at).toISOString().slice(0, 10))
    .sort()
    .reverse();

  if (checkinDates.length === 0) return 0;

  const unique = [...new Set(checkinDates)];
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (unique[0] !== today && unique[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(unique[i - 1]);
    const curr = new Date(unique[i]);
    const diffDays = (prev.getTime() - curr.getTime()) / 86400000;
    if (Math.abs(diffDays - 1) < 0.5) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function MiniGraph({ weeks }: { weeks: WeekData[] }) {
  const maxVal = 5;
  const barHeight = 60;

  if (weeks.every((w) => w.mood === 0 && w.pulse === 0)) {
    return (
      <View className="items-center py-4">
        <Text className="text-sm" style={{ color: '#9CA3AF' }}>
          Doe een check-in om de grafiek te vullen
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-end justify-between" style={{ height: barHeight }}>
      {weeks.map((w, i) => (
        <View key={i} className="items-center flex-1">
          <View className="flex-row items-end gap-1">
            <View
              className="w-3 rounded-t"
              style={{
                height: Math.max(2, (w.mood / maxVal) * barHeight),
                backgroundColor: colors.salie.DEFAULT,
                opacity: w.mood > 0 ? 1 : 0.2,
              }}
            />
            <View
              className="w-3 rounded-t"
              style={{
                height: Math.max(2, (w.pulse / maxVal) * barHeight),
                backgroundColor: colors.oceaan.DEFAULT,
                opacity: w.pulse > 0 ? 1 : 0.2,
              }}
            />
          </View>
          <Text className="mt-1 text-xs" style={{ color: '#9CA3AF' }}>
            {w.week}
          </Text>
        </View>
      ))}
    </View>
  );
}

function computeRelationshipDuration(startDate: string): string {
  const start = new Date(startDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'jaar' : 'jaar'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'maand' : 'maanden'}`);
  if (parts.length === 0) parts.push(`${days} ${days === 1 ? 'dag' : 'dagen'}`);

  return parts.join(' en ');
}

function computeTotalDays(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export default function WijScreen() {
  const entries = useVerhaalStore((s) => s.entries);
  const isPremium = usePremiumStore((s) => s.isPremium);
  const userName = useOnboardingStore((s) => s.name);
  const relationshipStartDate = useOnboardingStore((s) => s.relationshipStartDate);
  const partnerName = usePartnerStore((s) => s.partnerName);
  const isOnline = usePartnerStore((s) => s.isOnline);
  const isConnected = usePartnerStore((s) => s.isConnected);

  const questionCount = useActivityHistoryStore((s) => s.questions.length);
  const gameCount = useActivityHistoryStore((s) => s.games.length);
  const quizCount = useActivityHistoryStore((s) => s.quizzes.length);

  const checkinWeeks = useMemo(() => computeCheckinWeeks(entries), [entries]);
  const streak = useMemo(() => computeStreak(entries), [entries]);
  const totalActivities = entries.length;

  const badges = useMemo(() => {
    const all = [
      { id: 'streak-7', label: '7 dagen streak', icon: Flame, color: colors.terracotta.DEFAULT, earned: streak >= 7 },
      { id: 'streak-30', label: '30 dagen streak', icon: Zap, color: colors.goud.DEFAULT, earned: streak >= 30 },
      { id: 'questions-10', label: '10 vragen beantwoord', icon: MessageCircle, color: colors.oceaan.DEFAULT, earned: questionCount >= 10 },
      { id: 'questions-50', label: '50 vragen beantwoord', icon: MessageCircle, color: colors.oceaan.DEFAULT, earned: questionCount >= 50 },
      { id: 'games-10', label: '10 games gespeeld', icon: Gamepad2, color: colors.salie.DEFAULT, earned: gameCount >= 10 },
      { id: 'checkins-30', label: '30 check-ins', icon: CheckSquare, color: colors.goud.DEFAULT, earned: entries.filter((e) => e.type === 'checkin').length >= 30 },
      { id: 'activities-100', label: '100 activiteiten', icon: Award, color: '#8B7EC8', earned: totalActivities >= 100 },
    ];
    return all;
  }, [streak, questionCount, gameCount, totalActivities, entries]);

  const firstMilestone = useMemo(() => {
    const milestones = entries
      .filter((e) => e.type === 'milestone')
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    return milestones[0] ?? null;
  }, [entries]);

  const samenSinds = relationshipStartDate
    ? formatDateLong(relationshipStartDate)
    : firstMilestone
      ? formatDateLong(firstMilestone.data.date ?? firstMilestone.created_at)
      : null;


  const specialDates = useMemo(() => {
    const dates: { day: string; month: string; label: string }[] = [];

    // Add relationship start date from onboarding
    if (relationshipStartDate) {
      const startDate = new Date(relationshipStartDate);
      dates.push({
        day: String(startDate.getDate()),
        month: MONTH_NAMES_SHORT[startDate.getMonth()],
        label: 'Samen sinds',
      });
    }

    // Add milestone entries
    entries
      .filter((e) => e.type === 'milestone')
      .forEach((e) => {
        const date = new Date(e.data.date ?? e.created_at);
        dates.push({
          day: String(date.getDate()),
          month: MONTH_NAMES_SHORT[date.getMonth()],
          label: e.data.title,
        });
      });

    return dates;
  }, [entries, relationshipStartDate]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with settings button */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 8,
          }}
        >
          <Text className="text-2xl font-bold" style={{ color: colors.nachtblauw }}>
            Wij
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/activity/settings' as any)}
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              backgroundColor: colors.zand.DEFAULT,
            }}
          >
            <Settings size={20} color={colors.nachtblauw} strokeWidth={1.8} />
          </TouchableOpacity>
        </View>

        {/* Couple card */}
        <View className="px-6 pt-3">
          <WarmCard className="p-6" style={{ backgroundColor: colors.zand.light }}>
            <View className="flex-row items-center justify-center">
              <Avatar name={userName || 'Jij'} size="lg" />
              <View className="mx-4">
                <Heart
                  size={20}
                  color={colors.terracotta.DEFAULT}
                  fill={colors.terracotta.DEFAULT}
                  strokeWidth={0}
                />
              </View>
              <Avatar name={partnerName || 'Partner'} size="lg" />
            </View>
            <View className="mt-4 items-center">
              <Text className="text-base font-semibold" style={{ color: colors.nachtblauw }}>
                {userName || 'Jij'} & {partnerName || 'Partner'}
              </Text>
              {samenSinds && (
                <Text className="mt-0.5 text-sm" style={{ color: '#6B7C8F' }}>
                  Samen sinds {samenSinds}
                </Text>
              )}

              {/* Relationship duration */}
              {relationshipStartDate && (
                <View className="mt-2 flex-row items-center rounded-full px-3 py-1" style={{ backgroundColor: colors.terracotta.DEFAULT + '10' }}>
                  <Calendar size={12} color={colors.terracotta.DEFAULT} strokeWidth={2} />
                  <Text className="ml-1.5 text-xs font-semibold" style={{ color: colors.terracotta.DEFAULT }}>
                    {computeRelationshipDuration(relationshipStartDate)} - dag {computeTotalDays(relationshipStartDate)}
                  </Text>
                </View>
              )}

              {/* Connection + plan badges */}
              <View className="mt-2 flex-row items-center" style={{ gap: 8 }}>
                {isConnected && (
                  <View className="flex-row items-center rounded-full px-2.5 py-1" style={{
                    backgroundColor: isOnline ? colors.salie.DEFAULT + '12' : colors.zand.DEFAULT,
                  }}>
                    {isOnline ? (
                      <Wifi size={11} color={colors.salie.DEFAULT} strokeWidth={2} />
                    ) : (
                      <WifiOff size={11} color="#9CA3AF" strokeWidth={2} />
                    )}
                    <Text className="ml-1 text-xs font-medium" style={{
                      color: isOnline ? colors.salie.DEFAULT : '#9CA3AF',
                    }}>
                      {isOnline ? 'Online' : 'Lokaal'}
                    </Text>
                  </View>
                )}
                <Badge
                  label={isPremium ? 'Premium' : 'Gratis plan'}
                  variant={isPremium ? 'success' : 'default'}
                />
              </View>
            </View>
          </WarmCard>
        </View>

        {/* Connect banner (only when not connected) */}
        {!isConnected && (
          <View className="px-6 pt-3">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push('/activity/connect' as any)}
              className="flex-row items-center rounded-2xl p-4"
              style={{
                backgroundColor: colors.terracotta.DEFAULT + '10',
                borderWidth: 1,
                borderColor: colors.terracotta.DEFAULT + '20',
              }}
            >
              <Heart size={20} color={colors.terracotta.DEFAULT} strokeWidth={1.8} />
              <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold" style={{ color: colors.nachtblauw }}>
                  Verbind met je partner
                </Text>
                <Text className="text-xs" style={{ color: '#6B7C8F' }}>
                  Deel een code om samen de app te gebruiken
                </Text>
              </View>
              <ChevronRight size={18} color={colors.terracotta.DEFAULT} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        )}

        {/* Relatiepols graph */}
        <View className="px-6 pt-4">
          <WarmCard className="p-5">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Activity size={18} color={colors.salie.DEFAULT} strokeWidth={1.8} />
                <Text
                  className="ml-2 text-base font-bold"
                  style={{ color: colors.nachtblauw }}
                >
                  Relatiepols
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push('/activity/checkin')}
                className="rounded-lg px-3 py-1.5"
                style={{ backgroundColor: colors.salie.DEFAULT + '12' }}
              >
                <Text className="text-xs font-semibold" style={{ color: colors.salie.DEFAULT }}>
                  Check-in
                </Text>
              </TouchableOpacity>
            </View>

            <MiniGraph weeks={checkinWeeks} />

            <View className="mt-3 flex-row justify-center gap-4">
              <View className="flex-row items-center">
                <View className="mr-1.5 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors.salie.DEFAULT }} />
                <Text className="text-xs" style={{ color: '#6B7C8F' }}>Stemming</Text>
              </View>
              <View className="flex-row items-center">
                <View className="mr-1.5 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors.oceaan.DEFAULT }} />
                <Text className="text-xs" style={{ color: '#6B7C8F' }}>Verbinding</Text>
              </View>
            </View>
          </WarmCard>
        </View>

        {/* Koppel-doelen link */}
        <View className="px-6 pt-4">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/activity/doelen' as any)}
            style={{ borderRadius: organic.card, overflow: 'hidden' }}
          >
            <LinearGradient
              colors={[colors.goud.DEFAULT + '12', colors.goud.DEFAULT + '06']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderWidth: 1,
                borderColor: colors.goud.DEFAULT + '20',
                borderRadius: organic.card,
              }}
            >
              <View
                style={{
                  marginRight: 12,
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                  backgroundColor: colors.goud.DEFAULT + '20',
                }}
              >
                <Target size={20} color={colors.goud.DEFAULT} strokeWidth={1.8} />
              </View>
              <View style={{ flex: 1 }}>
                <Text className="text-sm font-bold" style={{ color: colors.nachtblauw }}>
                  Koppel-doelen
                </Text>
                <Text className="text-xs" style={{ color: '#6B7C8F' }}>
                  Stel samen doelen en volg jullie voortgang
                </Text>
              </View>
              <ChevronRight size={16} color={colors.goud.DEFAULT} strokeWidth={2} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Activity stats */}
        <View className="px-6 pt-4">
          <WarmCard className="p-5">
            <Text
              className="mb-4 text-base font-bold"
              style={{ color: colors.nachtblauw }}
            >
              Activiteit
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('/activity/inzichten' as any)}
                style={{ flex: 1, alignItems: 'center', borderRadius: 12, padding: 12, backgroundColor: colors.warmwit }}
              >
                <CheckSquare size={18} color={colors.oceaan.DEFAULT} strokeWidth={1.8} />
                <Text className="mt-1.5 text-xs font-medium" style={{ color: '#6B7C8F' }}>
                  Totaal
                </Text>
                <Text className="mt-2 text-lg font-bold" style={{ color: colors.nachtblauw }}>
                  {totalActivities}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('/activity/inzichten' as any)}
                style={{ flex: 1, alignItems: 'center', borderRadius: 12, padding: 12, backgroundColor: colors.warmwit }}
              >
                <Flame size={18} color={colors.terracotta.DEFAULT} strokeWidth={1.8} />
                <Text className="mt-1.5 text-xs font-medium" style={{ color: '#6B7C8F' }}>
                  Streak
                </Text>
                <Text className="mt-2 text-lg font-bold" style={{ color: colors.nachtblauw }}>
                  {streak} {streak === 1 ? 'dag' : 'dagen'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push('/activity/checkin')}
                style={{ flex: 1, alignItems: 'center', borderRadius: 12, padding: 12, backgroundColor: colors.warmwit }}
              >
                <Gift size={18} color={colors.goud.DEFAULT} strokeWidth={1.8} />
                <Text className="mt-1.5 text-xs font-medium" style={{ color: '#6B7C8F' }}>
                  Check-ins
                </Text>
                <Text className="mt-2 text-lg font-bold" style={{ color: colors.nachtblauw }}>
                  {entries.filter((e) => e.type === 'checkin').length}
                </Text>
              </TouchableOpacity>
            </View>
          </WarmCard>
        </View>

        {/* Badges */}
        <View className="px-6 pt-4">
          <WarmCard className="p-5">
            <View className="flex-row items-center mb-3">
              <Award size={18} color={colors.goud.DEFAULT} strokeWidth={1.8} />
              <Text
                className="ml-2 text-base font-bold"
                style={{ color: colors.nachtblauw }}
              >
                Badges
              </Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <View
                    key={badge.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 20,
                      backgroundColor: badge.earned ? badge.color + '12' : colors.zand.light,
                      opacity: badge.earned ? 1 : 0.5,
                    }}
                  >
                    <Icon
                      size={14}
                      color={badge.earned ? badge.color : '#9CA3AF'}
                      strokeWidth={1.8}
                    />
                    <Text
                      className="ml-1.5 text-xs font-medium"
                      style={{ color: badge.earned ? badge.color : '#9CA3AF' }}
                    >
                      {badge.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          </WarmCard>
        </View>

        {/* Relatie-inzichten link */}
        <View className="px-6 pt-4">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/activity/inzichten' as any)}
            style={{ borderRadius: organic.card, overflow: 'hidden' }}
          >
            <LinearGradient
              colors={[colors.oceaan.DEFAULT + '15', colors.oceaan.DEFAULT + '08']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderWidth: 1,
                borderColor: colors.oceaan.DEFAULT + '20',
                borderRadius: organic.card,
              }}
            >
              <View
                style={{
                  marginRight: 12,
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                  backgroundColor: colors.oceaan.DEFAULT + '20',
                }}
              >
                <TrendingUp size={20} color={colors.oceaan.DEFAULT} strokeWidth={1.8} />
              </View>
              <View style={{ flex: 1 }}>
                <Text className="text-sm font-bold" style={{ color: colors.nachtblauw }}>
                  Relatie-inzichten
                </Text>
                <Text className="text-xs" style={{ color: '#6B7C8F' }}>
                  Bekijk jullie trends en patronen
                </Text>
              </View>
              <ChevronRight size={16} color={colors.oceaan.DEFAULT} strokeWidth={2} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Special dates from milestones */}
        {specialDates.length > 0 && (
          <View className="px-6 pt-4">
            <WarmCard className="p-5">
              <Text
                className="mb-3 text-base font-bold"
                style={{ color: colors.nachtblauw }}
              >
                Speciale data
              </Text>

              {specialDates.map((date, index) => (
                <View
                  key={index}
                  className="mb-3 flex-row items-center rounded-xl p-3"
                  style={{ backgroundColor: colors.warmwit }}
                >
                  <View
                    className="mr-3 items-center rounded-lg px-2.5 py-1.5"
                    style={{ backgroundColor: colors.salie.DEFAULT }}
                  >
                    <Text className="text-base font-bold text-white">
                      {date.day}
                    </Text>
                    <Text className="text-xs font-medium text-white">
                      {date.month}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: colors.nachtblauw }}
                    >
                      {date.label}
                    </Text>
                  </View>
                </View>
              ))}
            </WarmCard>
          </View>
        )}

        {/* App version */}
        <View className="mt-6 items-center pb-4">
          <Text className="text-xs" style={{ color: '#C8CDD3' }}>
            Samen v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
