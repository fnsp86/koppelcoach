import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, warmShadow, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  MessageCircle,
  Gamepad2,
  ClipboardCheck,
  Heart,
  Trophy,
} from 'lucide-react-native';
import { useActivityHistoryStore } from '@/lib/stores/activity-history-store';
import { usePartnerStore } from '@/lib/stores/partner-store';

// ---------------------------------------------------------------------------
// Discussion prompts per type
// ---------------------------------------------------------------------------

const QUESTION_PROMPTS = [
  'Wat viel je op aan het antwoord van je partner?',
  'Herken je wat je partner zegt?',
  'Wat zou je anders willen?',
];

const GAME_PROMPTS = [
  'Welke eigenschap verraste je?',
  'Ben je het eens met de keuzes van je partner?',
  'Welke eigenschap zou je graag meer bij jezelf willen zien?',
];

const QUIZ_PROMPTS = [
  'Bij welk onderwerp scoren jullie het meest anders?',
  'Herken je de scores van je partner?',
  'Wat zouden jullie samen willen verbeteren?',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const months = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december',
  ];
  return `${day} ${months[date.getMonth()]}`;
}

// ---------------------------------------------------------------------------
// Question Detail
// ---------------------------------------------------------------------------

function QuestionDetail({
  questionText,
  myAnswer,
  partnerAnswer,
  partnerName,
  date,
}: {
  questionText: string;
  myAnswer: string;
  partnerAnswer?: string;
  partnerName: string;
  date: string;
}) {
  return (
    <>
      {/* Question */}
      <View style={{ marginBottom: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <MessageCircle size={18} color={colors.terracotta.DEFAULT} strokeWidth={1.8} />
          <Text style={{ marginLeft: 8, fontSize: 13, fontWeight: '600', color: colors.terracotta.DEFAULT }}>
            Dagelijkse vraag
          </Text>
        </View>
        <Text style={{ fontSize: 22, fontWeight: '700', lineHeight: 30, color: colors.nachtblauw }}>
          {questionText}
        </Text>
        <Text style={{ marginTop: 8, fontSize: 13, color: '#6B7C8F' }}>
          {formatDate(date)}
        </Text>
      </View>

      {/* Answers side by side */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
        {/* My answer */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors.terracotta.DEFAULT + '10',
            borderRadius: organic.card,
            borderWidth: 1.5,
            borderColor: colors.terracotta.DEFAULT + '30',
            padding: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: colors.terracotta.DEFAULT,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#FFFFFF' }}>J</Text>
            </View>
            <Text style={{ fontSize: 13, fontWeight: '600', color: colors.terracotta.DEFAULT }}>Jij</Text>
          </View>
          <Text style={{ fontSize: 15, lineHeight: 22, color: colors.nachtblauw }}>{myAnswer}</Text>
        </View>

        {/* Partner answer */}
        <View
          style={{
            flex: 1,
            backgroundColor: partnerAnswer ? colors.oceaan.DEFAULT + '10' : colors.zand.light,
            borderRadius: organic.card,
            borderWidth: 1.5,
            borderColor: partnerAnswer ? colors.oceaan.DEFAULT + '30' : colors.zand.DEFAULT,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: partnerAnswer ? colors.oceaan.DEFAULT : '#D1D5DB',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#FFFFFF' }}>
                {partnerName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: partnerAnswer ? colors.oceaan.DEFAULT : '#9CA3AF',
              }}
            >
              {partnerName}
            </Text>
          </View>
          {partnerAnswer ? (
            <Text style={{ fontSize: 15, lineHeight: 22, color: colors.nachtblauw }}>{partnerAnswer}</Text>
          ) : (
            <Text style={{ fontSize: 14, color: '#9CA3AF', fontStyle: 'italic' }}>
              Wacht op antwoord...
            </Text>
          )}
        </View>
      </View>

      {/* Discussion prompts */}
      <DiscussionSection prompts={QUESTION_PROMPTS} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Game Detail
// ---------------------------------------------------------------------------

function GameDetail({
  traits,
  myScore,
  partnerScore,
  partnerName,
  date,
}: {
  traits: { trait: string; myChoice: 'me' | 'partner'; partnerChoice?: 'me' | 'partner' }[];
  myScore: number;
  partnerScore: number;
  partnerName: string;
  date: string;
}) {
  const agreementCount = traits.filter(
    (t) => t.partnerChoice !== undefined && t.myChoice === t.partnerChoice,
  ).length;
  const hasPartnerChoices = traits.some((t) => t.partnerChoice !== undefined);

  return (
    <>
      {/* Header */}
      <View style={{ marginBottom: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Gamepad2 size={18} color={colors.goud.DEFAULT} strokeWidth={1.8} />
          <Text style={{ marginLeft: 8, fontSize: 13, fontWeight: '600', color: colors.goud.DEFAULT }}>
            Spel
          </Text>
        </View>
        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.nachtblauw }}>Jij of Ik?</Text>
        <Text style={{ marginTop: 8, fontSize: 13, color: '#6B7C8F' }}>{formatDate(date)}</Text>
      </View>

      {/* Scores */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
          padding: 20,
          backgroundColor: '#FFFFFF',
          borderRadius: organic.card,
          ...warmShadow,
        }}
      >
        <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
          <View
            style={{
              height: 64,
              width: 64,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.terracotta.DEFAULT + '12',
              borderRadius: organic.card,
            }}
          >
            <Text style={{ fontSize: 26, fontWeight: '700', color: colors.terracotta.DEFAULT }}>
              {myScore}
            </Text>
          </View>
          <Text style={{ marginTop: 6, fontSize: 13, fontWeight: '600', color: colors.nachtblauw }}>Ik</Text>
        </View>

        <Text style={{ fontSize: 18, fontWeight: '700', color: '#D1D5DB' }}>vs</Text>

        <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
          <View
            style={{
              height: 64,
              width: 64,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.oceaan.DEFAULT + '12',
              borderRadius: organic.card,
            }}
          >
            <Text style={{ fontSize: 26, fontWeight: '700', color: colors.oceaan.DEFAULT }}>
              {partnerScore}
            </Text>
          </View>
          <Text style={{ marginTop: 6, fontSize: 13, fontWeight: '600', color: colors.nachtblauw }}>
            {partnerName}
          </Text>
        </View>
      </View>

      {/* Per trait breakdown */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 17, fontWeight: '700', color: colors.nachtblauw, marginBottom: 12 }}>
          Per eigenschap
        </Text>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: organic.card,
            overflow: 'hidden',
            ...warmShadow,
          }}
        >
          {traits.map((t, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderBottomWidth: index < traits.length - 1 ? 1 : 0,
                borderBottomColor: colors.zand.DEFAULT,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: '500', color: colors.nachtblauw, flex: 1, marginRight: 12 }}>
                {t.trait}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                {/* My choice */}
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 10,
                    backgroundColor:
                      t.myChoice === 'me' ? colors.terracotta.DEFAULT + '18' : colors.oceaan.DEFAULT + '18',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: t.myChoice === 'me' ? colors.terracotta.DEFAULT : colors.oceaan.DEFAULT,
                    }}
                  >
                    {t.myChoice === 'me' ? 'Ik' : partnerName}
                  </Text>
                </View>

                {/* Partner choice */}
                {t.partnerChoice !== undefined ? (
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 10,
                      borderWidth: 1.5,
                      borderColor:
                        t.partnerChoice === 'me' ? colors.terracotta.DEFAULT + '30' : colors.oceaan.DEFAULT + '30',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: t.partnerChoice === 'me' ? colors.terracotta.DEFAULT : colors.oceaan.DEFAULT,
                      }}
                    >
                      {t.partnerChoice === 'me' ? 'Ik' : partnerName}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 10,
                      backgroundColor: colors.zand.light,
                    }}
                  >
                    <Text style={{ fontSize: 12, color: '#9CA3AF' }}>?</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Legend */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 10, paddingHorizontal: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                backgroundColor: colors.terracotta.DEFAULT,
              }}
            />
            <Text style={{ fontSize: 12, color: '#6B7C8F' }}>Jouw keuze</Text>
          </View>
          {hasPartnerChoices && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  borderWidth: 1.5,
                  borderColor: colors.oceaan.DEFAULT,
                }}
              />
              <Text style={{ fontSize: 12, color: '#6B7C8F' }}>Keuze van {partnerName}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Agreement summary */}
      {hasPartnerChoices && (
        <View
          style={{
            marginBottom: 24,
            padding: 16,
            backgroundColor: colors.salie.DEFAULT + '12',
            borderRadius: organic.card,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.nachtblauw }}>
            Jullie zijn het eens over {agreementCount} van de {traits.length} eigenschappen
          </Text>
        </View>
      )}

      {/* Discussion prompts */}
      <DiscussionSection prompts={GAME_PROMPTS} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Quiz Detail
// ---------------------------------------------------------------------------

const AREA_COLORS: Record<string, string> = {
  communicatie: colors.oceaan.DEFAULT,
  'quality time': colors.salie.DEFAULT,
  vertrouwen: colors.terracotta.DEFAULT,
  financien: colors.goud.DEFAULT,
  intimiteit: '#D4728C',
  samenwerking: colors.oceaan.dark,
  steun: colors.salie.dark,
  plezier: colors.goud.dark,
  toekomst: colors.terracotta.light,
};

function QuizDetail({
  scores,
  partnerName,
  date,
}: {
  scores: { area: string; myScore: number; partnerScore?: number }[];
  partnerName: string;
  date: string;
}) {
  const hasPartner = scores.some((s) => s.partnerScore !== undefined);

  // Find biggest difference
  let biggestDiffArea = '';
  let biggestDiff = 0;
  if (hasPartner) {
    scores.forEach((s) => {
      if (s.partnerScore !== undefined) {
        const diff = Math.abs(s.myScore - s.partnerScore);
        if (diff > biggestDiff) {
          biggestDiff = diff;
          biggestDiffArea = s.area;
        }
      }
    });
  }

  return (
    <>
      {/* Header */}
      <View style={{ marginBottom: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <ClipboardCheck size={18} color={colors.oceaan.DEFAULT} strokeWidth={1.8} />
          <Text style={{ marginLeft: 8, fontSize: 13, fontWeight: '600', color: colors.oceaan.DEFAULT }}>
            Quiz
          </Text>
        </View>
        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.nachtblauw }}>Relatie Check-up</Text>
        <Text style={{ marginTop: 8, fontSize: 13, color: '#6B7C8F' }}>{formatDate(date)}</Text>
      </View>

      {/* Legend */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: colors.terracotta.DEFAULT }} />
          <Text style={{ fontSize: 12, color: '#6B7C8F' }}>Jij</Text>
        </View>
        {hasPartner && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: colors.oceaan.DEFAULT }} />
            <Text style={{ fontSize: 12, color: '#6B7C8F' }}>{partnerName}</Text>
          </View>
        )}
      </View>

      {/* Score bars */}
      <View style={{ marginBottom: 24 }}>
        {scores.map((s) => {
          const label = s.area.charAt(0).toUpperCase() + s.area.slice(1);
          const barColor = AREA_COLORS[s.area] ?? colors.oceaan.DEFAULT;
          const myWidth = (s.myScore / 5) * 100;
          const partnerWidth = s.partnerScore !== undefined ? (s.partnerScore / 5) * 100 : 0;
          const isBiggestDiff = s.area === biggestDiffArea;

          return (
            <View
              key={s.area}
              style={{
                marginBottom: 16,
                ...(isBiggestDiff
                  ? {
                      backgroundColor: colors.goud.DEFAULT + '12',
                      borderRadius: 12,
                      padding: 12,
                      marginHorizontal: -12,
                    }
                  : {}),
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.nachtblauw }}>
                  {label}
                  {isBiggestDiff ? ' *' : ''}
                </Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Text style={{ fontSize: 13, fontWeight: '500', color: colors.terracotta.DEFAULT }}>
                    {s.myScore.toFixed(1)}
                  </Text>
                  {s.partnerScore !== undefined && (
                    <Text style={{ fontSize: 13, fontWeight: '500', color: colors.oceaan.DEFAULT }}>
                      {s.partnerScore.toFixed(1)}
                    </Text>
                  )}
                </View>
              </View>

              {/* My score bar */}
              <View
                style={{
                  height: 14,
                  width: '100%',
                  overflow: 'hidden',
                  borderRadius: 7,
                  backgroundColor: colors.terracotta.DEFAULT + '18',
                  marginBottom: hasPartner ? 5 : 0,
                }}
              >
                <View
                  style={{
                    height: 14,
                    borderRadius: 7,
                    backgroundColor: colors.terracotta.DEFAULT,
                    width: `${myWidth}%`,
                  }}
                />
              </View>

              {/* Partner score bar */}
              {s.partnerScore !== undefined && (
                <View
                  style={{
                    height: 14,
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: 7,
                    backgroundColor: colors.oceaan.DEFAULT + '18',
                  }}
                >
                  <View
                    style={{
                      height: 14,
                      borderRadius: 7,
                      backgroundColor: colors.oceaan.DEFAULT,
                      width: `${partnerWidth}%`,
                    }}
                  />
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Biggest difference callout */}
      {biggestDiffArea !== '' && (
        <View
          style={{
            marginBottom: 24,
            backgroundColor: colors.goud.DEFAULT + '18',
            borderRadius: organic.card,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.goud.DEFAULT + '30',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.nachtblauw, marginBottom: 8 }}>
            Jullie grootste verschil: {biggestDiffArea.charAt(0).toUpperCase() + biggestDiffArea.slice(1)}
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7C8F', lineHeight: 20 }}>
            Vraag elkaar: hoe beleef jij "{biggestDiffArea}" in onze relatie?
          </Text>
        </View>
      )}

      {/* No partner data note */}
      {!hasPartner && (
        <View
          style={{
            marginBottom: 24,
            backgroundColor: colors.oceaan.DEFAULT + '10',
            borderRadius: organic.card,
            padding: 20,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '500', color: colors.nachtblauw, textAlign: 'center', lineHeight: 20 }}>
            Laat je partner ook de quiz doen om jullie scores te vergelijken!
          </Text>
        </View>
      )}

      {/* Discussion prompts */}
      <DiscussionSection prompts={QUIZ_PROMPTS} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Shared: Discussion Section
// ---------------------------------------------------------------------------

function DiscussionSection({ prompts }: { prompts: string[] }) {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: colors.salie.DEFAULT + '12',
        borderRadius: organic.card,
        borderWidth: 1,
        borderColor: colors.salie.DEFAULT + '25',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Heart size={20} color={colors.salie.DEFAULT} strokeWidth={2} />
        <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: '700', color: colors.nachtblauw }}>
          Bespreek dit samen
        </Text>
      </View>

      <Text style={{ fontSize: 14, color: '#6B7C8F', marginBottom: 12 }}>
        Gebruik deze vragen om het gesprek te starten:
      </Text>

      {prompts.map((prompt, i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: i < prompts.length - 1 ? 10 : 0,
            paddingLeft: 4,
          }}
        >
          <MessageCircle
            size={16}
            color={colors.salie.DEFAULT}
            strokeWidth={2}
            style={{ marginTop: 2, marginRight: 10 }}
          />
          <Text style={{ fontSize: 15, lineHeight: 22, color: colors.nachtblauw, flex: 1 }}>
            {prompt}
          </Text>
        </View>
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Main Screen
// ---------------------------------------------------------------------------

export default function BespreekDetailScreen() {
  const { type, id } = useLocalSearchParams<{ type: string; id: string }>();

  const questions = useActivityHistoryStore((s) => s.questions);
  const games = useActivityHistoryStore((s) => s.games);
  const quizzes = useActivityHistoryStore((s) => s.quizzes);
  const partnerName = usePartnerStore((s) => s.partnerName) ?? 'Je partner';

  const question = type === 'question' ? questions.find((q) => q.id === id) : undefined;
  const game = type === 'game' ? games.find((g) => g.id === id) : undefined;
  const quiz = type === 'quiz' ? quizzes.find((q) => q.id === id) : undefined;

  const notFound = !question && !game && !quiz;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={gradients.headerSoft}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
      />

      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
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
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {notFound ? (
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <Text style={{ fontSize: 16, color: '#6B7C8F' }}>Activiteit niet gevonden</Text>
          </View>
        ) : (
          <>
            {question && (
              <QuestionDetail
                questionText={question.questionText}
                myAnswer={question.myAnswer}
                partnerAnswer={question.partnerAnswer}
                partnerName={partnerName}
                date={question.createdAt}
              />
            )}

            {game && (
              <GameDetail
                traits={game.traits}
                myScore={game.myScore}
                partnerScore={game.partnerScore}
                partnerName={partnerName}
                date={game.createdAt}
              />
            )}

            {quiz && (
              <QuizDetail
                scores={quiz.scores}
                partnerName={partnerName}
                date={quiz.createdAt}
              />
            )}
          </>
        )}

        {/* Back button */}
        {!notFound && (
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            style={{
              marginTop: 24,
              width: '100%',
              alignItems: 'center',
              paddingVertical: 16,
              backgroundColor: colors.terracotta.DEFAULT,
              borderRadius: organic.card,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>Terug</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
