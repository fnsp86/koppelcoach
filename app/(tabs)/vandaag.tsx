import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GradientHeader } from '@/components/ui/GradientHeader';
import { MomentjesBalk } from '@/components/ui/MomentjesBalk';
import { WarmCard } from '@/components/ui/WarmCard';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { colors } from '@/lib/theme';
import { PaywallModal } from '@/components/ui/PaywallModal';
import { dailyQuestions } from '@/content/daily-questions';
import { getTodayAppreciations } from '@/content/daily-appreciations';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { usePartnerStore } from '@/lib/stores/partner-store';
import { useCheckInStore } from '@/lib/stores/checkin-store';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {
  Heart,
  MessageCircle,
  HelpCircle,
  Gamepad2,
  ChevronRight,
  Users,
  Lock,
  Flame,
  Activity,
  Gift,
  ShieldAlert,
  Sparkles,
  Check,
  PenLine,
} from 'lucide-react-native';

function getTodayQuestion() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = dayOfYear % dailyQuestions.length;
  return dailyQuestions[index];
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Goedemorgen';
  if (hour < 18) return 'Goedemiddag';
  return 'Goedenavond';
}

const CATEGORY_ICONS: Record<string, typeof MessageCircle> = {
  communicatie: MessageCircle,
  intimiteit: Heart,
  dromen: Sparkles,
  gezin: Users,
  geld: Gift,
  plezier: Gamepad2,
  groei: Activity,
  conflict: ShieldAlert,
  herinneringen: Heart,
  toekomst: Sparkles,
  dagelijks: MessageCircle,
};

type TimelineItemProps = {
  dotColor: string;
  showLine: boolean;
  children: React.ReactNode;
};

function TimelineItem({ dotColor, showLine, children }: TimelineItemProps) {
  return (
    <View className="flex-row">
      <View className="mr-4 items-center" style={{ width: 24 }}>
        <View
          className="h-6 w-6 items-center justify-center rounded-full"
          style={{ backgroundColor: dotColor, opacity: 0.85 }}
        >
          <View className="h-2 w-2 rounded-full bg-white" />
        </View>
        {showLine && (
          <View
            className="flex-1"
            style={{
              width: 1.5,
              backgroundColor: colors.zand.dark,
              opacity: 0.5,
            }}
          />
        )}
        {!showLine && <View className="flex-1" />}
      </View>
      <View className="mb-4 flex-1">{children}</View>
    </View>
  );
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

function AnimatedStreakBadge({ streak }: { streak: number }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (streak > 0) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.08, { duration: 800 }),
          withTiming(1, { duration: 800 }),
        ),
        -1,
      );
    }
  }, [streak]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      className="mr-3 flex-row items-center rounded-full px-3 py-1.5"
      style={[{ backgroundColor: colors.terracotta.DEFAULT + '12' }, animatedStyle]}
    >
      <Flame size={14} color={colors.terracotta.DEFAULT} strokeWidth={2} />
      <Text className="ml-1 text-sm font-bold" style={{ color: colors.terracotta.DEFAULT }}>
        {streak}
      </Text>
    </Animated.View>
  );
}

function WaarderingVanDeDag() {
  const appreciations = useMemo(() => getTodayAppreciations(6), []);
  const entries = useVerhaalStore((s) => s.entries);
  const addEntry = useVerhaalStore((s) => s.addEntry);
  const [sentIndex, setSentIndex] = useState<number | null>(null);

  const today = new Date().toISOString().slice(0, 10);
  const alreadySentToday = useMemo(
    () => entries.some((e) => e.type === 'gratitude' && e.created_at.slice(0, 10) === today),
    [entries, today],
  );

  const handleSend = async (text: string, index: number) => {
    if (alreadySentToday || sentIndex !== null) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addEntry({ type: 'gratitude', data: { text, category: 'klein' } });
    setSentIndex(index);
  };

  const showSent = alreadySentToday || sentIndex !== null;

  return (
    <View className="mt-4 px-6">
      <View
        className="overflow-hidden rounded-2xl"
        style={{
          backgroundColor: colors.salie.DEFAULT + '08',
          borderWidth: 1,
          borderColor: colors.salie.DEFAULT + '15',
        }}
      >
        <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
          <Text className="text-sm font-bold" style={{ color: colors.nachtblauw }}>
            Waardering van de dag
          </Text>
          {showSent && (
            <View className="flex-row items-center">
              <Check size={12} color={colors.salie.DEFAULT} strokeWidth={2.5} />
              <Text className="ml-1 text-xs font-medium" style={{ color: colors.salie.DEFAULT }}>
                Verstuurd
              </Text>
            </View>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, paddingTop: 8, gap: 8 }}
        >
          {appreciations.map((text, i) => {
            const isSent = sentIndex === i;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => handleSend(text, i)}
                activeOpacity={0.7}
                disabled={showSent}
                className="items-center justify-center rounded-xl px-4 py-3"
                style={{
                  backgroundColor: isSent ? colors.salie.DEFAULT : '#FFFFFF',
                  borderWidth: 1,
                  borderColor: isSent ? colors.salie.DEFAULT : colors.zand.dark,
                  opacity: showSent && !isSent ? 0.5 : 1,
                  maxWidth: 200,
                }}
              >
                <Text
                  className="text-sm"
                  style={{ color: isSent ? '#FFFFFF' : colors.nachtblauw }}
                >
                  {text}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            onPress={() => router.push('/activity/gratitude')}
            activeOpacity={0.7}
            className="items-center justify-center rounded-xl px-4 py-3"
            style={{
              backgroundColor: colors.salie.DEFAULT + '10',
              borderWidth: 1,
              borderColor: colors.salie.DEFAULT + '20',
            }}
          >
            <PenLine size={16} color={colors.salie.DEFAULT} strokeWidth={1.8} />
            <Text
              className="mt-1 text-xs font-semibold"
              style={{ color: colors.salie.DEFAULT }}
            >
              Zelf schrijven
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

export default function VandaagScreen() {
  const todayQuestion = useMemo(() => getTodayQuestion(), []);
  const QuestionIcon = CATEGORY_ICONS[todayQuestion.category] ?? MessageCircle;
  const [paywallVisible, setPaywallVisible] = useState(false);
  const entries = useVerhaalStore((s) => s.entries);
  const streak = useMemo(() => computeStreak(entries), [entries]);
  const isConnected = usePartnerStore((s) => s.isConnected);
  const isOnline = usePartnerStore((s) => s.isOnline);
  const partnerName = usePartnerStore((s) => s.partnerName);
  const partnerCheckIn = useCheckInStore((s) => s.partnerCheckIn);

  const today = new Date().toISOString().split('T')[0];
  const checkinDone = useMemo(() => entries.some(
    (e) => e.type === 'checkin' && e.created_at.startsWith(today)
  ), [entries, today]);
  const questionDone = useMemo(() => entries.some(
    (e) => e.type === 'activity' && e.data.activityType === 'question' && e.created_at.startsWith(today)
  ), [entries, today]);
  const quizDone = useMemo(() => entries.some(
    (e) => e.type === 'activity' && e.data.activityType === 'quiz' && e.created_at.startsWith(today)
  ), [entries, today]);
  const gameDone = useMemo(() => entries.some(
    (e) => e.type === 'activity' && e.data.activityType === 'game' && e.created_at.startsWith(today)
  ), [entries, today]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with streak */}
        <GradientHeader
          title="Vandaag"
          subtitle={getGreeting()}
          rightElement={
            <View className="flex-row items-center">
              <AnimatedStreakBadge streak={streak} />
              <TouchableOpacity
                onPress={() => router.push('/activity/conflict')}
                className="h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.zand.DEFAULT }}
              >
                <ShieldAlert size={18} color={colors.nachtblauw} strokeWidth={1.8} />
              </TouchableOpacity>
            </View>
          }
        />

        {/* Momentjes-balk */}
        <MomentjesBalk
          onCreateMomentje={() => router.push('/activity/momentje')}
          onViewMomentje={(m) => router.push(`/activity/momentje-viewer?momentjeId=${m.id}`)}
        />

        {/* Waardering van de dag */}
        <WaarderingVanDeDag />

        {/* Partner status / invite banner */}
        {isConnected && isOnline && partnerCheckIn ? (
          <View className="mx-6 mt-4">
            <View
              className="flex-row items-center rounded-2xl p-4"
              style={{
                backgroundColor: colors.salie.DEFAULT + '10',
                borderWidth: 1,
                borderColor: colors.salie.DEFAULT + '20',
              }}
            >
              <View
                className="h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.salie.DEFAULT + '20' }}
              >
                <Text className="text-sm font-bold" style={{ color: colors.salie.DEFAULT }}>
                  {(partnerName ?? 'P').charAt(0).toUpperCase()}
                </Text>
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold" style={{ color: colors.nachtblauw }}>
                  {partnerName} heeft ingecheckt
                </Text>
                <Text className="text-xs" style={{ color: '#6B7C8F' }}>
                  Stemming: {partnerCheckIn.mood}/5 - Verbinding: {partnerCheckIn.pulse}/5
                </Text>
              </View>
            </View>
          </View>
        ) : isConnected && isOnline ? (
          <View className="mx-6 mt-4">
            <View
              className="flex-row items-center rounded-2xl p-4"
              style={{
                backgroundColor: colors.oceaan.DEFAULT + '08',
                borderWidth: 1,
                borderColor: colors.oceaan.DEFAULT + '15',
              }}
            >
              <View
                className="h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.oceaan.DEFAULT + '15' }}
              >
                <Text className="text-sm font-bold" style={{ color: colors.oceaan.DEFAULT }}>
                  {(partnerName ?? 'P').charAt(0).toUpperCase()}
                </Text>
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold" style={{ color: colors.nachtblauw }}>
                  Verbonden met {partnerName}
                </Text>
                <Text className="text-xs" style={{ color: '#6B7C8F' }}>
                  Wacht op check-in van je partner
                </Text>
              </View>
            </View>
          </View>
        ) : !isConnected ? (
          <View className="mx-6 mt-4">
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
                  Nodig je partner uit om samen te beginnen
                </Text>
              </View>
              <ChevronRight size={18} color={colors.terracotta.DEFAULT} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        ) : null}

        <SectionDivider variant="heart" />

        {/* Daily Activities */}
        <View className="px-6 pt-4">
          <Text
            className="mb-4 text-lg font-bold"
            style={{ color: colors.nachtblauw }}
          >
            Dagelijkse activiteiten
          </Text>

          <TimelineItem dotColor={colors.salie.DEFAULT} showLine>
            <View className="mb-1.5">
              <View className="self-start rounded-md px-2.5 py-1" style={{ backgroundColor: colors.salie.DEFAULT + '15' }}>
                <Text className="text-xs font-bold" style={{ color: colors.salie.DEFAULT }}>Check-in</Text>
              </View>
            </View>
            <WarmCard accentColor={colors.salie.DEFAULT} onPress={() => router.push('/activity/checkin')} className="overflow-hidden p-0" style={checkinDone ? { opacity: 0.6 } : undefined}>
              <View className="flex-row items-center p-5">
                <View className="flex-1">
                  <Text className="text-lg font-semibold" style={{ color: colors.nachtblauw }}>Relatiepols</Text>
                  <Text className="mt-1 text-sm" style={{ color: '#6B7C8F' }}>Hoe voelen jullie je vandaag? (10 sec)</Text>
                </View>
                <View className="ml-3 h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: colors.salie.DEFAULT + '10' }}>
                  <Activity size={28} color={colors.salie.DEFAULT} strokeWidth={1.2} />
                </View>
              </View>
              {checkinDone && (
                <View style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.salie.DEFAULT, alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={13} color="#FFFFFF" strokeWidth={3} />
                </View>
              )}
            </WarmCard>
          </TimelineItem>

          <TimelineItem dotColor={colors.terracotta.DEFAULT} showLine>
            <View className="mb-1.5">
              <View className="self-start rounded-md px-2.5 py-1" style={{ backgroundColor: colors.terracotta.DEFAULT + '15' }}>
                <Text className="text-xs font-bold" style={{ color: colors.terracotta.DEFAULT }}>Vraag</Text>
              </View>
            </View>
            <WarmCard
              accentColor={colors.terracotta.DEFAULT}
              onPress={() =>
                router.push({
                  pathname: '/activity/question',
                  params: {
                    questionId: todayQuestion.id,
                    questionText: todayQuestion.text,
                    questionCategory: todayQuestion.category,
                    followUp: todayQuestion.followUp ?? '',
                  },
                })
              }
              className="overflow-hidden p-0"
              style={questionDone ? { opacity: 0.6 } : undefined}
            >
              <View className="p-5">
                <Text className="text-lg font-semibold leading-6" style={{ color: colors.nachtblauw }}>{todayQuestion.text}</Text>
              </View>
              <View className="h-28 items-center justify-center" style={{ backgroundColor: colors.terracotta.DEFAULT + '08' }}>
                <QuestionIcon size={32} color={colors.terracotta.DEFAULT} strokeWidth={1.2} />
              </View>
              {questionDone && (
                <View style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.salie.DEFAULT, alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={13} color="#FFFFFF" strokeWidth={3} />
                </View>
              )}
            </WarmCard>
          </TimelineItem>

          <TimelineItem dotColor={colors.oceaan.DEFAULT} showLine>
            <View className="mb-1.5">
              <View className="self-start rounded-md px-2.5 py-1" style={{ backgroundColor: colors.oceaan.DEFAULT + '15' }}>
                <Text className="text-xs font-bold" style={{ color: colors.oceaan.DEFAULT }}>Quiz</Text>
              </View>
            </View>
            <WarmCard accentColor={colors.oceaan.DEFAULT} onPress={() => router.push('/activity/quiz')} className="overflow-hidden p-0" style={quizDone ? { opacity: 0.6 } : undefined}>
              <View className="flex-row items-center p-5">
                <View className="flex-1">
                  <Text className="text-lg font-semibold" style={{ color: colors.nachtblauw }}>Relatie Check-up</Text>
                  <Text className="mt-1 text-sm" style={{ color: '#6B7C8F' }}>Hoe goed kennen jullie elkaars gevoelens?</Text>
                </View>
                <View className="ml-3 h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: colors.oceaan.DEFAULT + '10' }}>
                  <HelpCircle size={28} color={colors.oceaan.DEFAULT} strokeWidth={1.2} />
                </View>
              </View>
              {quizDone && (
                <View style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.salie.DEFAULT, alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={13} color="#FFFFFF" strokeWidth={3} />
                </View>
              )}
            </WarmCard>
          </TimelineItem>

          <TimelineItem dotColor={colors.goud.DEFAULT} showLine={false}>
            <View className="mb-1.5">
              <View className="self-start rounded-md px-2.5 py-1" style={{ backgroundColor: colors.goud.DEFAULT + '15' }}>
                <Text className="text-xs font-bold" style={{ color: colors.goud.DEFAULT }}>Spel</Text>
              </View>
            </View>
            <WarmCard accentColor={colors.goud.DEFAULT} onPress={() => router.push('/activity/game')} className="overflow-hidden p-0" style={gameDone ? { opacity: 0.6 } : undefined}>
              <View className="flex-row items-center p-5">
                <View className="flex-1">
                  <Text className="text-lg font-semibold" style={{ color: colors.nachtblauw }}>Jij of Ik?</Text>
                  <Text className="mt-1 text-sm" style={{ color: '#6B7C8F' }}>Wie van jullie is het meest...</Text>
                </View>
                <View className="ml-3 h-16 w-16 items-center justify-center rounded-2xl" style={{ backgroundColor: colors.goud.DEFAULT + '10' }}>
                  <Gamepad2 size={28} color={colors.goud.DEFAULT} strokeWidth={1.2} />
                </View>
              </View>
              {gameDone && (
                <View style={{ position: 'absolute', top: 8, right: 8, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.salie.DEFAULT, alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={13} color="#FFFFFF" strokeWidth={3} />
                </View>
              )}
            </WarmCard>
          </TimelineItem>
        </View>

        <SectionDivider variant="dot" />

        {/* Bonus activities */}
        <View className="px-6 pt-4">
          <Text className="mb-3 text-lg font-bold" style={{ color: colors.nachtblauw }}>Verdieping</Text>

          <View className="flex-row gap-3">
            <WarmCard className="flex-1" onPress={() => router.push('/activity/gratitude')}>
              <View className="mb-3 h-14 w-14 items-center justify-center rounded-xl" style={{ backgroundColor: colors.salie.DEFAULT + '15' }}>
                <Heart size={24} color={colors.salie.DEFAULT} strokeWidth={1.5} />
              </View>
              <Text className="text-sm font-bold" style={{ color: colors.nachtblauw }}>Dankbaarheid</Text>
              <Text className="mt-0.5 text-xs leading-4" style={{ color: '#6B7C8F' }}>Stuur iets liefs naar je partner</Text>
            </WarmCard>

            <WarmCard className="flex-1" onPress={() => router.push('/activity/date-roulette')}>
              <View className="mb-3 h-14 w-14 items-center justify-center rounded-xl" style={{ backgroundColor: colors.oceaan.DEFAULT + '15' }}>
                <Sparkles size={24} color={colors.oceaan.DEFAULT} strokeWidth={1.5} />
              </View>
              <Text className="text-sm font-bold" style={{ color: colors.nachtblauw }}>Date Roulette</Text>
              <Text className="mt-0.5 text-xs leading-4" style={{ color: '#6B7C8F' }}>Laat het toeval jullie date bepalen</Text>
            </WarmCard>
          </View>

          <TouchableOpacity
            className="mt-3 flex-row items-center rounded-2xl p-4"
            style={{ backgroundColor: colors.goud.DEFAULT + '10', borderWidth: 1, borderColor: colors.goud.DEFAULT + '20' }}
            activeOpacity={0.7}
            onPress={() => router.push('/activity/challenge')}
          >
            <View className="mr-4 h-14 w-14 items-center justify-center rounded-xl" style={{ backgroundColor: colors.goud.DEFAULT + '15' }}>
              <Gift size={24} color={colors.goud.DEFAULT} strokeWidth={1.5} />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold" style={{ color: colors.nachtblauw }}>Uitdaging van de week</Text>
              <Text className="mt-0.5 text-xs leading-4" style={{ color: '#6B7C8F' }}>Werk samen aan een wekelijkse koppel-challenge</Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Premium upsell - gradient */}
        <View className="mx-6 mt-5">
          <TouchableOpacity activeOpacity={0.9} onPress={() => setPaywallVisible(true)} className="overflow-hidden rounded-2xl">
            <LinearGradient
              colors={[colors.goud.dark ?? '#B8912E', colors.goud.DEFAULT, '#E8C764']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}
            >
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={16} color="#FFFFFF" strokeWidth={2.5} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text className="text-sm font-bold text-white">Probeer Samen Premium</Text>
                <Text className="text-xs text-white" style={{ opacity: 0.85 }}>Onbeperkt activiteiten, AI-coach en meer</Text>
              </View>
              <ChevronRight size={18} color="#FFFFFF" strokeWidth={2} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <PaywallModal visible={paywallVisible} onClose={() => setPaywallVisible(false)} />
    </SafeAreaView>
  );
}
