import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GradientHeader } from '@/components/ui/GradientHeader';
import { WarmCard } from '@/components/ui/WarmCard';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { colors, organic, warmShadow } from '@/lib/theme';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { useActivityHistoryStore } from '@/lib/stores/activity-history-store';
import { usePartnerStore } from '@/lib/stores/partner-store';
import {
  MessageSquareText,
  Heart,
  ShieldAlert,
  Sparkles,
  BookOpen,
  PenLine,
  HelpCircle,
  Gamepad2,
  ClipboardCheck,
  MessageCircle,
} from 'lucide-react-native';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GRATITUDE_CATEGORY_LABELS: Record<string, string> = {
  klein: 'Iets kleins',
  'wie-je-bent': 'Wie je bent',
  grappig: 'Iets grappigs',
  groot: 'Iets groots',
};

const GRATITUDE_CATEGORY_COLORS: Record<string, string> = {
  klein: colors.salie.DEFAULT,
  'wie-je-bent': colors.terracotta.DEFAULT,
  grappig: colors.goud.DEFAULT,
  groot: colors.oceaan.DEFAULT,
};

const MOOD_TAG_COLORS: Record<string, string> = {
  dankbaar: colors.salie.DEFAULT,
  hoopvol: colors.goud.DEFAULT,
  rustig: colors.oceaan.DEFAULT,
  kwetsbaar: colors.terracotta.DEFAULT,
  blij: '#E8A060',
};

type ActivityFilter = 'alles' | 'vragen' | 'spellen' | 'quiz';

const FILTER_TABS: { key: ActivityFilter; label: string }[] = [
  { key: 'alles', label: 'Alles' },
  { key: 'vragen', label: 'Vragen' },
  { key: 'spellen', label: 'Spellen' },
  { key: 'quiz', label: 'Quiz' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Vandaag';
  if (diffDays === 1) return 'Gisteren';
  if (diffDays < 7) return `${diffDays} dagen geleden`;

  const day = date.getDate();
  const months = [
    'jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
    'jul', 'aug', 'sep', 'okt', 'nov', 'dec',
  ];
  return `${day} ${months[date.getMonth()]}`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FilterPills({
  active,
  onChange,
}: {
  active: ActivityFilter;
  onChange: (f: ActivityFilter) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
      {FILTER_TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => onChange(tab.key)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 20,
              backgroundColor: isActive ? colors.nachtblauw : colors.zand.light,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: isActive ? '#FFFFFF' : colors.nachtblauw,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function QuestionCard({
  id,
  questionText,
  myAnswer,
  partnerAnswer,
  date,
  partnerName,
}: {
  id: string;
  questionText: string;
  myAnswer: string;
  partnerAnswer?: string;
  date: string;
  partnerName: string;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        router.push({
          pathname: '/activity/bespreek-detail',
          params: { type: 'question', id },
        })
      }
    >
    <WarmCard style={{ marginBottom: 12, padding: 16 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: colors.nachtblauw, marginBottom: 10 }}>
        {questionText}
      </Text>

      {/* My answer */}
      <View
        style={{
          borderLeftWidth: 3,
          borderLeftColor: colors.terracotta.DEFAULT,
          paddingLeft: 10,
          marginBottom: 8,
        }}
      >
        <Text style={{ fontSize: 11, fontWeight: '600', color: colors.terracotta.DEFAULT, marginBottom: 2 }}>
          Jij
        </Text>
        <Text style={{ fontSize: 13, color: colors.nachtblauw, lineHeight: 18 }}>{myAnswer}</Text>
      </View>

      {/* Partner answer */}
      <View
        style={{
          borderLeftWidth: 3,
          borderLeftColor: partnerAnswer ? colors.oceaan.DEFAULT : '#D1D5DB',
          paddingLeft: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 11,
            fontWeight: '600',
            color: partnerAnswer ? colors.oceaan.DEFAULT : '#9CA3AF',
            marginBottom: 2,
          }}
        >
          {partnerName}
        </Text>
        {partnerAnswer ? (
          <Text style={{ fontSize: 13, color: colors.nachtblauw, lineHeight: 18 }}>{partnerAnswer}</Text>
        ) : (
          <Text style={{ fontSize: 13, color: '#9CA3AF', fontStyle: 'italic' }}>Wacht op je partner</Text>
        )}
      </View>

      {/* Date badge */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 11, color: '#6B7C8F', fontStyle: 'italic' }}>
          Tik om te vergelijken
        </Text>
        <View style={{ backgroundColor: colors.zand.light, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
          <Text style={{ fontSize: 11, color: '#6B7C8F' }}>{formatRelativeDate(date)}</Text>
        </View>
      </View>
    </WarmCard>
    </TouchableOpacity>
  );
}

function GameCard({
  id,
  traits,
  date,
}: {
  id: string;
  traits: { trait: string; myChoice: 'me' | 'partner'; partnerChoice?: 'me' | 'partner' }[];
  date: string;
}) {
  const agreementCount = traits.filter(
    (t) => t.partnerChoice !== undefined && t.myChoice === t.partnerChoice,
  ).length;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        router.push({
          pathname: '/activity/bespreek-detail',
          params: { type: 'game', id },
        })
      }
    >
    <WarmCard style={{ marginBottom: 12, padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Gamepad2 size={16} color={colors.goud.DEFAULT} strokeWidth={1.8} />
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.nachtblauw, marginLeft: 6 }}>
          Jij of Ik?
        </Text>
      </View>

      <Text style={{ fontSize: 13, color: colors.nachtblauw, marginBottom: 10 }}>
        Eens over {agreementCount}/{traits.length}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 11, color: '#6B7C8F', fontStyle: 'italic' }}>
          Tik om te vergelijken
        </Text>
        <View style={{ backgroundColor: colors.zand.light, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
          <Text style={{ fontSize: 11, color: '#6B7C8F' }}>{formatRelativeDate(date)}</Text>
        </View>
      </View>
    </WarmCard>
    </TouchableOpacity>
  );
}

function QuizCard({
  id,
  scores,
  date,
}: {
  id: string;
  scores: { area: string; myScore: number; partnerScore?: number }[];
  date: string;
}) {
  const topScores = scores.slice(0, 3);
  const maxScore = Math.max(...scores.map((s) => Math.max(s.myScore, s.partnerScore ?? 0)), 1);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        router.push({
          pathname: '/activity/bespreek-detail',
          params: { type: 'quiz', id },
        })
      }
    >
    <WarmCard style={{ marginBottom: 12, padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <ClipboardCheck size={16} color={colors.salie.DEFAULT} strokeWidth={1.8} />
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.nachtblauw, marginLeft: 6 }}>
          Relatie Check-up
        </Text>
      </View>

      {topScores.map((s) => (
        <View key={s.area} style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 12, color: colors.nachtblauw, marginBottom: 3 }}>{s.area}</Text>
          {/* My score bar */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <View
              style={{
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.terracotta.DEFAULT,
                width: `${Math.round((s.myScore / maxScore) * 100)}%`,
                maxWidth: '80%',
                minWidth: 8,
              }}
            />
            <Text style={{ fontSize: 10, color: colors.terracotta.DEFAULT, marginLeft: 4 }}>{s.myScore}</Text>
          </View>
          {/* Partner score bar */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                height: 6,
                borderRadius: 3,
                backgroundColor: s.partnerScore != null ? colors.oceaan.DEFAULT : '#D1D5DB',
                width: s.partnerScore != null ? `${Math.round((s.partnerScore / maxScore) * 100)}%` : '10%',
                maxWidth: '80%',
                minWidth: 8,
              }}
            />
            <Text style={{ fontSize: 10, color: s.partnerScore != null ? colors.oceaan.DEFAULT : '#9CA3AF', marginLeft: 4 }}>
              {s.partnerScore != null ? s.partnerScore : '?'}
            </Text>
          </View>
        </View>
      ))}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
        <Text style={{ fontSize: 11, color: '#6B7C8F', fontStyle: 'italic' }}>
          Tik om te vergelijken
        </Text>
        <View style={{ backgroundColor: colors.zand.light, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
          <Text style={{ fontSize: 11, color: '#6B7C8F' }}>{formatRelativeDate(date)}</Text>
        </View>
      </View>
    </WarmCard>
    </TouchableOpacity>
  );
}

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------

export default function PraatScreen() {
  const entries = useVerhaalStore((s) => s.entries);
  const questions = useActivityHistoryStore((s) => s.questions);
  const games = useActivityHistoryStore((s) => s.games);
  const quizzes = useActivityHistoryStore((s) => s.quizzes);
  const partnerName = usePartnerStore((s) => s.partnerName) ?? 'Je partner';

  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('alles');

  const hasAnyActivity = questions.length > 0 || games.length > 0 || quizzes.length > 0;

  // Build a combined + sorted list for "Alles"
  const combinedActivities = useMemo(() => {
    type Item =
      | { kind: 'question'; data: (typeof questions)[number] }
      | { kind: 'game'; data: (typeof games)[number] }
      | { kind: 'quiz'; data: (typeof quizzes)[number] };

    const items: Item[] = [
      ...questions.map((q) => ({ kind: 'question' as const, data: q })),
      ...games.map((g) => ({ kind: 'game' as const, data: g })),
      ...quizzes.map((q) => ({ kind: 'quiz' as const, data: q })),
    ];
    items.sort((a, b) => new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime());
    return items;
  }, [questions, games, quizzes]);

  const filteredActivities = useMemo(() => {
    if (activityFilter === 'vragen') return combinedActivities.filter((i) => i.kind === 'question');
    if (activityFilter === 'spellen') return combinedActivities.filter((i) => i.kind === 'game');
    if (activityFilter === 'quiz') return combinedActivities.filter((i) => i.kind === 'quiz');
    return combinedActivities;
  }, [combinedActivities, activityFilter]);

  const reflectionEntries = useMemo(
    () =>
      entries
        .filter((e) => e.type === 'reflection')
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5),
    [entries],
  );

  const gratitudeEntries = useMemo(
    () =>
      entries
        .filter((e) => e.type === 'gratitude')
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10),
    [entries],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Header */}
        <GradientHeader title="Samen" />

        {/* 2. Short explanation */}
        <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 }}>
          <Text style={{ fontSize: 14, lineHeight: 20, color: '#6B7C8F' }}>
            Vergelijk jullie antwoorden en bespreek ze samen. Hier vinden jullie alle uitslagen van
            activiteiten die jullie hebben gedaan.
          </Text>
        </View>

        {/* 3. Activity results section */}
        <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginBottom: 12 }}>
            Activiteitresultaten
          </Text>

          {!hasAnyActivity ? (
            <WarmCard style={{ alignItems: 'center', padding: 32 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: colors.zand.DEFAULT,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                <MessageCircle size={24} color="#9CA3AF" strokeWidth={1.5} />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: colors.nachtblauw,
                  textAlign: 'center',
                  marginBottom: 6,
                }}
              >
                Doe samen een activiteit om hier te vergelijken
              </Text>
              <Text style={{ fontSize: 13, color: '#6B7C8F', textAlign: 'center', lineHeight: 18 }}>
                Jullie resultaten van vragen, spellen en quizzen verschijnen hier
              </Text>
            </WarmCard>
          ) : (
            <>
              <FilterPills active={activityFilter} onChange={setActivityFilter} />

              {filteredActivities.length === 0 ? (
                <Text style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', paddingVertical: 24 }}>
                  Geen resultaten in deze categorie
                </Text>
              ) : (
                filteredActivities.map((item) => {
                  if (item.kind === 'question') {
                    return (
                      <QuestionCard
                        key={item.data.id}
                        id={item.data.id}
                        questionText={item.data.questionText}
                        myAnswer={item.data.myAnswer}
                        partnerAnswer={item.data.partnerAnswer}
                        date={item.data.createdAt}
                        partnerName={partnerName}
                      />
                    );
                  }
                  if (item.kind === 'game') {
                    return (
                      <GameCard
                        key={item.data.id}
                        id={item.data.id}
                        traits={item.data.traits}
                        date={item.data.createdAt}
                      />
                    );
                  }
                  if (item.kind === 'quiz') {
                    return (
                      <QuizCard
                        key={item.data.id}
                        id={item.data.id}
                        scores={item.data.scores}
                        date={item.data.createdAt}
                      />
                    );
                  }
                  return null;
                })
              )}
            </>
          )}
        </View>

        <SectionDivider variant="dot" />

        {/* 4. Hulpmiddelen section */}
        <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginBottom: 12 }}>
            Hulpmiddelen
          </Text>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 14,
                backgroundColor: colors.salie.DEFAULT + '10',
                borderWidth: 1,
                borderColor: colors.salie.DEFAULT + '20',
                borderRadius: organic.card,
              }}
              activeOpacity={0.7}
              onPress={() => router.push('/activity/gratitude')}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: colors.salie.DEFAULT + '15',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                <Heart size={20} color={colors.salie.DEFAULT} strokeWidth={1.5} />
              </View>
              <Text
                numberOfLines={1}
                style={{ fontSize: 13, fontWeight: '700', color: colors.nachtblauw }}
              >
                Dankbaarheid
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontSize: 11, color: '#6B7C8F', marginTop: 2, textAlign: 'center' }}
              >
                Stuur iets liefs
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 14,
                backgroundColor: '#E06B50' + '10',
                borderWidth: 1,
                borderColor: '#E06B50' + '20',
                borderRadius: organic.card,
              }}
              activeOpacity={0.7}
              onPress={() => router.push('/activity/conflict')}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: '#E06B50' + '15',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                <ShieldAlert size={20} color="#E06B50" strokeWidth={1.5} />
              </View>
              <Text
                numberOfLines={1}
                style={{ fontSize: 13, fontWeight: '700', color: colors.nachtblauw }}
              >
                Conflict hulp
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontSize: 11, color: '#6B7C8F', marginTop: 2, textAlign: 'center' }}
              >
                Rustig oplossen
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 14,
                backgroundColor: colors.oceaan.DEFAULT + '10',
                borderWidth: 1,
                borderColor: colors.oceaan.DEFAULT + '20',
                borderRadius: organic.card,
              }}
              activeOpacity={0.7}
              onPress={() => router.push('/activity/date-roulette')}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: colors.oceaan.DEFAULT + '15',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                <Sparkles size={20} color={colors.oceaan.DEFAULT} strokeWidth={1.5} />
              </View>
              <Text
                numberOfLines={1}
                style={{ fontSize: 13, fontWeight: '700', color: colors.nachtblauw }}
              >
                Date Roulette
              </Text>
              <Text
                numberOfLines={1}
                style={{ fontSize: 11, color: '#6B7C8F', marginTop: 2, textAlign: 'center' }}
              >
                Verrassingsdate
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <SectionDivider variant="dot" />

        {/* 5. Samen Dagboek section */}
        <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <BookOpen size={18} color={colors.oceaan.DEFAULT} strokeWidth={1.8} />
              <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: '700', color: colors.nachtblauw }}>
                Samen Dagboek
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/activity/dagboek-entry' as any)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: colors.oceaan.DEFAULT + '12',
              }}
              activeOpacity={0.7}
            >
              <PenLine size={12} color={colors.oceaan.DEFAULT} strokeWidth={2} />
              <Text style={{ marginLeft: 6, fontSize: 12, fontWeight: '600', color: colors.oceaan.DEFAULT }}>
                Schrijf
              </Text>
            </TouchableOpacity>
          </View>

          {reflectionEntries.length === 0 ? (
            <WarmCard style={{ alignItems: 'center', padding: 24 }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.oceaan.DEFAULT + '15',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                <BookOpen size={20} color={colors.oceaan.DEFAULT} strokeWidth={1.8} />
              </View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.nachtblauw, textAlign: 'center' }}>
                Jullie dagboek begint hier
              </Text>
              <Text style={{ fontSize: 12, color: '#6B7C8F', textAlign: 'center', lineHeight: 16, marginTop: 4 }}>
                Schrijf samen over hoe jullie je voelen en wat jullie bezighoudt
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 12,
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: colors.oceaan.DEFAULT,
                }}
                activeOpacity={0.7}
                onPress={() => router.push('/activity/dagboek-entry' as any)}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>Begin met schrijven</Text>
              </TouchableOpacity>
            </WarmCard>
          ) : (
            <View>
              {reflectionEntries.map((entry) => {
                const moodTag = entry.type === 'reflection' ? entry.data.mood_tag : undefined;
                const moodColor = moodTag ? MOOD_TAG_COLORS[moodTag] ?? colors.oceaan.DEFAULT : colors.oceaan.DEFAULT;
                return (
                  <WarmCard key={entry.id} style={{ marginBottom: 12, padding: 16 }}>
                    <Text
                      style={{ fontSize: 14, lineHeight: 20, color: colors.nachtblauw }}
                      numberOfLines={3}
                    >
                      {entry.type === 'reflection' ? entry.data.text : ''}
                    </Text>
                    <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      {moodTag ? (
                        <View
                          style={{
                            borderRadius: 6,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            backgroundColor: moodColor + '12',
                          }}
                        >
                          <Text style={{ fontSize: 12, fontWeight: '500', color: moodColor }}>
                            {moodTag.charAt(0).toUpperCase() + moodTag.slice(1)}
                          </Text>
                        </View>
                      ) : (
                        <View />
                      )}
                      <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                        {formatRelativeDate(entry.created_at)}
                      </Text>
                    </View>
                  </WarmCard>
                );
              })}
            </View>
          )}
        </View>

        <SectionDivider variant="heart" />

        {/* 6. Dankbaarheidsberichten section */}
        <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw }}>
              Dankbaarheidsberichten
            </Text>
          </View>

          {gratitudeEntries.length === 0 ? (
            <WarmCard style={{ alignItems: 'center', padding: 24 }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.salie.DEFAULT + '15',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                <Heart size={20} color={colors.salie.DEFAULT} strokeWidth={1.8} />
              </View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.nachtblauw, textAlign: 'center' }}>
                Nog geen berichten
              </Text>
              <Text style={{ fontSize: 12, color: '#6B7C8F', textAlign: 'center', lineHeight: 16, marginTop: 4 }}>
                Schrijf een dankbaarheidsbericht om hier te bewaren
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 12,
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: colors.salie.DEFAULT,
                }}
                activeOpacity={0.7}
                onPress={() => router.push('/activity/gratitude')}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>Schrijf een bericht</Text>
              </TouchableOpacity>
            </WarmCard>
          ) : (
            <View>
              {gratitudeEntries.map((entry) => {
                const catColor =
                  entry.type === 'gratitude'
                    ? GRATITUDE_CATEGORY_COLORS[entry.data.category] ?? colors.salie.DEFAULT
                    : colors.salie.DEFAULT;
                const catLabel =
                  entry.type === 'gratitude'
                    ? GRATITUDE_CATEGORY_LABELS[entry.data.category] ?? ''
                    : '';
                return (
                  <WarmCard key={entry.id} style={{ marginBottom: 12, padding: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <View style={{ marginRight: 12, flex: 1 }}>
                        <Text style={{ fontSize: 14, lineHeight: 20, color: colors.nachtblauw }}>
                          {entry.type === 'gratitude' ? entry.data.text : ''}
                        </Text>
                      </View>
                      <Heart size={14} color={catColor} strokeWidth={1.8} />
                    </View>
                    <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      {catLabel ? (
                        <View style={{ borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, backgroundColor: catColor + '12' }}>
                          <Text style={{ fontSize: 12, fontWeight: '500', color: catColor }}>{catLabel}</Text>
                        </View>
                      ) : (
                        <View />
                      )}
                      <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                        {formatRelativeDate(entry.created_at)}
                      </Text>
                    </View>
                  </WarmCard>
                );
              })}
              <TouchableOpacity
                style={{
                  marginTop: 4,
                  alignItems: 'center',
                  borderRadius: 12,
                  paddingVertical: 12,
                  backgroundColor: colors.salie.DEFAULT + '10',
                }}
                activeOpacity={0.7}
                onPress={() => router.push('/activity/gratitude')}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.salie.DEFAULT }}>
                  Nieuw bericht schrijven
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
