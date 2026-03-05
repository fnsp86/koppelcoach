import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, warmShadow, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, BarChart3, MessageCircleHeart, Users, Heart, MessageCircle } from 'lucide-react-native';
import { quizStatements } from '@/content/quiz-questions';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { useActivityHistoryStore } from '@/lib/stores/activity-history-store';
import { GraduatedHeart } from '@/components/icons';
import { usePartnerStore } from '@/lib/stores/partner-store';
import * as Haptics from 'expo-haptics';

const LIKERT_LABELS = [
  'Helemaal oneens',
  'Oneens',
  'Neutraal',
  'Eens',
  'Helemaal eens',
];

type Phase = 'playing' | 'my-results' | 'partner-playing' | 'comparison';

export default function QuizScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [partnerAnswers, setPartnerAnswers] = useState<Record<string, number>>({});
  const [partnerIndex, setPartnerIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('playing');
  const [savedSessionId, setSavedSessionId] = useState<string | null>(null);

  const addEntry = useVerhaalStore((s) => s.addEntry);
  const verhaalEntries = useVerhaalStore((s) => s.entries);
  const addQuizSession = useActivityHistoryStore((s) => s.addQuizSession);
  const updateQuizPartnerScores = useActivityHistoryStore((s) => s.updateQuizPartnerScores);
  const partnerName = usePartnerStore((s) => s.partnerName) ?? 'Je partner';

  const total = quizStatements.length;
  const current = quizStatements[currentIndex];
  const partnerCurrent = quizStatements[partnerIndex];
  const progress = (Object.keys(answers).length / total) * 100;
  const partnerProgress = (Object.keys(partnerAnswers).length / total) * 100;

  const handleSelect = async (value: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < total - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    } else {
      // Calculate area scores
      const areaScores: Record<string, { total: number; count: number }> = {};
      quizStatements.forEach((stmt) => {
        const s = newAnswers[stmt.id];
        if (s !== undefined) {
          if (!areaScores[stmt.area]) areaScores[stmt.area] = { total: 0, count: 0 };
          areaScores[stmt.area].total += s;
          areaScores[stmt.area].count += 1;
        }
      });

      // Save to verhaal store
      const today = new Date().toISOString().split('T')[0];
      const alreadyDoneToday = verhaalEntries.some(
        (e) => e.type === 'activity' && e.data.activityType === 'quiz' && e.created_at.startsWith(today)
      );
      const scoresSummary = Object.entries(areaScores)
        .map(([area, d]) => `${area.charAt(0).toUpperCase() + area.slice(1)}: ${(d.total / d.count).toFixed(1)}/5`)
        .join(', ');
      if (!alreadyDoneToday) {
        addEntry({
          type: 'activity',
          data: { title: 'Relatie Check-up voltooid', activityType: 'quiz', summary: scoresSummary },
        });
      }

      // Save to activity history
      const results = Object.entries(areaScores).map(([area, d]) => ({
        area,
        myScore: d.total / d.count,
      }));
      addQuizSession({
        gameType: 'quiz',
        date: new Date().toISOString().slice(0, 10),
        scores: results,
      });

      const quizzes = useActivityHistoryStore.getState().quizzes;
      if (quizzes.length > 0) {
        setSavedSessionId(quizzes[0].id);
      }

      setTimeout(() => setPhase('my-results'), 300);
    }
  };

  const handlePartnerSelect = async (value: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newAnswers = { ...partnerAnswers, [partnerCurrent.id]: value };
    setPartnerAnswers(newAnswers);

    if (partnerIndex < total - 1) {
      setTimeout(() => setPartnerIndex(partnerIndex + 1), 300);
    } else {
      // Calculate partner area scores and save
      const areaScores: Record<string, { total: number; count: number }> = {};
      quizStatements.forEach((stmt) => {
        const s = newAnswers[stmt.id];
        if (s !== undefined) {
          if (!areaScores[stmt.area]) areaScores[stmt.area] = { total: 0, count: 0 };
          areaScores[stmt.area].total += s;
          areaScores[stmt.area].count += 1;
        }
      });

      if (savedSessionId) {
        updateQuizPartnerScores(
          savedSessionId,
          Object.entries(areaScores).map(([area, d]) => ({ area, score: d.total / d.count }))
        );
      }

      setTimeout(() => setPhase('comparison'), 300);
    }
  };

  const getResults = (ans: Record<string, number>) => {
    const areaScores: Record<string, { total: number; count: number }> = {};
    quizStatements.forEach((stmt) => {
      const score = ans[stmt.id];
      if (score !== undefined) {
        if (!areaScores[stmt.area]) areaScores[stmt.area] = { total: 0, count: 0 };
        areaScores[stmt.area].total += score;
        areaScores[stmt.area].count += 1;
      }
    });
    return Object.entries(areaScores).map(([area, data]) => ({
      area,
      average: data.total / data.count,
      label: area.charAt(0).toUpperCase() + area.slice(1),
    }));
  };

  const areaColors: Record<string, string> = {
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

  // ---- Quiz UI (shared between my turn and partner turn) ----
  const renderQuizUI = (
    questionIndex: number,
    progressPct: number,
    totalQuestions: number,
    currentStatement: typeof quizStatements[0],
    answersMap: Record<string, number>,
    onSelect: (value: number) => void,
    isPartner: boolean,
  ) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={gradients.headerSoft}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            height: 40, width: 40, alignItems: 'center', justifyContent: 'center',
            borderRadius: 20, backgroundColor: colors.zand.DEFAULT,
          }}
        >
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 12, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4,
            backgroundColor: isPartner ? colors.oceaan.DEFAULT + '15' : colors.oceaan.DEFAULT + '15',
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '600', color: colors.oceaan.DEFAULT }}>
            {isPartner ? `${partnerName} - Quiz` : 'Quiz'}
          </Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>

      <View style={{ marginHorizontal: 24, marginTop: 4 }}>
        <View
          style={{
            height: 10, width: '100%', overflow: 'hidden', borderRadius: 5,
            backgroundColor: colors.zand.DEFAULT,
          }}
        >
          <View
            style={{
              height: 10, borderRadius: 5,
              backgroundColor: isPartner ? colors.oceaan.DEFAULT : colors.oceaan.DEFAULT,
              width: `${progressPct}%`,
            }}
          />
        </View>
        <Text style={{ marginTop: 8, fontSize: 12, color: '#6B7C8F' }}>
          Vraag {questionIndex + 1} van {totalQuestions}
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        <View
          style={{
            width: '100%', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 40,
            backgroundColor: '#FFFFFF', borderRadius: organic.card, ...warmShadow,
          }}
        >
          <Text
            style={{
              textAlign: 'center', fontSize: 20, fontWeight: '700', lineHeight: 28, color: colors.nachtblauw,
            }}
          >
            {currentStatement.text}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          {LIKERT_LABELS.map((label, index) => {
            const value = index + 1;
            const isSelected = answersMap[currentStatement.id] === value;
            const fillLevel = index as 0 | 1 | 2 | 3 | 4;
            const heartSize = 16 + index * 2;
            const circleSize = 36 + index * 4;
            return (
              <TouchableOpacity
                key={value}
                onPress={() => onSelect(value)}
                activeOpacity={0.7}
                style={{ flex: 1, alignItems: 'center' }}
              >
                <View
                  style={{
                    width: circleSize, height: circleSize,
                    alignItems: 'center', justifyContent: 'center',
                    borderRadius: circleSize / 2,
                    backgroundColor: isSelected ? colors.oceaan.DEFAULT : colors.oceaan.DEFAULT + '10',
                    borderWidth: isSelected ? 0 : 1.5,
                    borderColor: isSelected ? 'transparent' : colors.oceaan.DEFAULT + '25',
                    transform: [{ scale: isSelected ? 1.12 : 1 }],
                  }}
                >
                  <GraduatedHeart
                    size={heartSize}
                    fillLevel={fillLevel}
                    color={isSelected ? '#FFFFFF' : colors.oceaan.DEFAULT}
                    strokeWidth={1.8}
                  />
                </View>
                <Text
                  numberOfLines={2}
                  style={{
                    marginTop: 8, textAlign: 'center', fontSize: 12,
                    color: isSelected ? colors.oceaan.DEFAULT : '#9CA3AF',
                    fontWeight: isSelected ? '600' : '400',
                    maxWidth: 60,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );

  // ---- Playing phase ----
  if (phase === 'playing') {
    return renderQuizUI(currentIndex, progress, total, current, answers, handleSelect, false);
  }

  // ---- Partner playing ----
  if (phase === 'partner-playing') {
    return renderQuizUI(partnerIndex, partnerProgress, total, partnerCurrent, partnerAnswers, handlePartnerSelect, true);
  }

  // ---- My results / partner invite ----
  if (phase === 'my-results') {
    const results = getResults(answers);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
        <LinearGradient
          colors={gradients.headerSoft}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              height: 40, width: 40, alignItems: 'center', justifyContent: 'center',
              borderRadius: 20, backgroundColor: colors.zand.DEFAULT,
            }}
          >
            <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw }}>Resultaten</Text>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 16, alignItems: 'center' }}>
            <View
              style={{
                height: 64, width: 64, alignItems: 'center', justifyContent: 'center',
                borderRadius: 32, backgroundColor: colors.oceaan.DEFAULT + '15',
              }}
            >
              <BarChart3 size={28} color={colors.oceaan.DEFAULT} strokeWidth={1.5} />
            </View>
            <Text style={{ marginTop: 16, fontSize: 20, fontWeight: '700', color: colors.nachtblauw }}>Jouw scores</Text>
            <Text style={{ marginTop: 4, textAlign: 'center', fontSize: 13, color: '#6B7C8F' }}>
              Hoe hoger de score, hoe sterker dit gebied
            </Text>
          </View>

          <View style={{ marginTop: 24 }}>
            {results.map((result) => {
              const barWidth = (result.average / 5) * 100;
              const barColor = areaColors[result.area] ?? colors.oceaan.DEFAULT;
              return (
                <View key={result.area} style={{ marginBottom: 16 }}>
                  <View style={{ marginBottom: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 13, fontWeight: '600', color: colors.nachtblauw }}>{result.label}</Text>
                    <Text style={{ fontSize: 13, fontWeight: '500', color: barColor }}>{result.average.toFixed(1)}</Text>
                  </View>
                  <View style={{ height: 12, width: '100%', overflow: 'hidden', borderRadius: 6, backgroundColor: colors.zand.DEFAULT }}>
                    <View style={{ height: 12, borderRadius: 6, backgroundColor: barColor, width: `${barWidth}%` }} />
                  </View>
                </View>
              );
            })}
          </View>

          {/* Partner invite */}
          <TouchableOpacity
            onPress={() => setPhase('partner-playing')}
            activeOpacity={0.8}
            style={{
              marginTop: 16, padding: 24,
              backgroundColor: colors.oceaan.DEFAULT + '10',
              borderRadius: organic.card,
              borderWidth: 1.5, borderColor: colors.oceaan.DEFAULT + '25',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 56, height: 56, borderRadius: 28,
                backgroundColor: colors.oceaan.DEFAULT + '20',
                alignItems: 'center', justifyContent: 'center', marginBottom: 12,
              }}
            >
              <Users size={28} color={colors.oceaan.DEFAULT} strokeWidth={1.5} />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginBottom: 6 }}>
              Laat {partnerName} ook de quiz doen
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7C8F', textAlign: 'center', lineHeight: 20 }}>
              Geef de telefoon aan je partner voor dezelfde vragen, daarna vergelijken jullie de scores
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={{ marginTop: 16, alignItems: 'center', paddingVertical: 14 }}
          >
            <Text style={{ fontSize: 14, color: '#9CA3AF' }}>Sla over en ga terug</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ---- Comparison phase ----
  const myResults = getResults(answers);
  const partnerResults = getResults(partnerAnswers);
  const partnerMap: Record<string, number> = {};
  partnerResults.forEach((r) => { partnerMap[r.area] = r.average; });

  let biggestDiffArea = '';
  let biggestDiff = 0;
  myResults.forEach((r) => {
    const ps = partnerMap[r.area];
    if (ps !== undefined) {
      const diff = Math.abs(r.average - ps);
      if (diff > biggestDiff) {
        biggestDiff = diff;
        biggestDiffArea = r.label;
      }
    }
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={gradients.headerSoft}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            height: 40, width: 40, alignItems: 'center', justifyContent: 'center',
            borderRadius: 20, backgroundColor: colors.zand.DEFAULT,
          }}
        >
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw }}>Vergelijking</Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 16, alignItems: 'center' }}>
          <View
            style={{
              height: 64, width: 64, alignItems: 'center', justifyContent: 'center',
              borderRadius: 32, backgroundColor: colors.salie.DEFAULT + '15',
            }}
          >
            <Heart size={28} color={colors.salie.DEFAULT} strokeWidth={1.5} />
          </View>
          <Text style={{ marginTop: 16, fontSize: 20, fontWeight: '700', color: colors.nachtblauw }}>
            Jullie scores vergeleken
          </Text>
        </View>

        {/* Legend */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 20, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: colors.terracotta.DEFAULT }} />
            <Text style={{ fontSize: 12, color: '#6B7C8F' }}>Jij</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: colors.oceaan.DEFAULT }} />
            <Text style={{ fontSize: 12, color: '#6B7C8F' }}>{partnerName}</Text>
          </View>
        </View>

        {/* Comparison bars */}
        <View
          style={{
            marginTop: 20, backgroundColor: '#FFFFFF', borderRadius: organic.card, padding: 20, ...warmShadow,
          }}
        >
          {myResults.map((result) => {
            const myWidth = (result.average / 5) * 100;
            const ps = partnerMap[result.area];
            const partnerWidth = ps !== undefined ? (ps / 5) * 100 : 0;
            const isBiggestDiff = result.label === biggestDiffArea;
            return (
              <View
                key={result.area}
                style={{
                  marginBottom: 14,
                  ...(isBiggestDiff ? {
                    backgroundColor: colors.goud.DEFAULT + '12',
                    borderRadius: 12, padding: 10, marginHorizontal: -10,
                  } : {}),
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.nachtblauw }}>
                    {result.label}{isBiggestDiff ? ' *' : ''}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: colors.terracotta.DEFAULT }}>
                      {result.average.toFixed(1)}
                    </Text>
                    {ps !== undefined && (
                      <Text style={{ fontSize: 12, fontWeight: '500', color: colors.oceaan.DEFAULT }}>
                        {ps.toFixed(1)}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ height: 14, width: '100%', overflow: 'hidden', borderRadius: 7, backgroundColor: colors.terracotta.DEFAULT + '18', marginBottom: 5 }}>
                  <View style={{ height: 14, borderRadius: 7, backgroundColor: colors.terracotta.DEFAULT, width: `${myWidth}%` }} />
                </View>
                {ps !== undefined && (
                  <View style={{ height: 14, width: '100%', overflow: 'hidden', borderRadius: 7, backgroundColor: colors.oceaan.DEFAULT + '18' }}>
                    <View style={{ height: 14, borderRadius: 7, backgroundColor: colors.oceaan.DEFAULT, width: `${partnerWidth}%` }} />
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Biggest difference */}
        {biggestDiffArea !== '' && (
          <View
            style={{
              marginTop: 16, backgroundColor: colors.goud.DEFAULT + '18', borderRadius: organic.card,
              padding: 20, borderWidth: 1, borderColor: colors.goud.DEFAULT + '30',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginBottom: 8 }}>
              Jullie grootste verschil zit bij {biggestDiffArea}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 4 }}>
              <MessageCircleHeart size={20} color={colors.terracotta.DEFAULT} strokeWidth={1.5} style={{ marginTop: 2 }} />
              <Text style={{ fontSize: 14, color: '#6B7C8F', lineHeight: 20, flex: 1 }}>
                Vraag elkaar: hoe beleef jij "{biggestDiffArea.toLowerCase()}" in onze relatie? Wat zou je daarin willen veranderen?
              </Text>
            </View>
          </View>
        )}

        {/* Discuss section */}
        <View
          style={{
            marginTop: 20, padding: 20, backgroundColor: colors.salie.DEFAULT + '12',
            borderRadius: organic.card, borderWidth: 1, borderColor: colors.salie.DEFAULT + '25',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Heart size={22} color={colors.salie.DEFAULT} strokeWidth={2} />
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: '700', color: colors.nachtblauw }}>
              Bespreek dit samen
            </Text>
          </View>

          {[
            'Bij welk onderwerp scoren jullie het meest verschillend?',
            'Wat kunnen jullie doen om dat verschil kleiner te maken?',
            'Waar zijn jullie allebei sterk? Hoe houden jullie dat vast?',
          ].map((prompt, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row', alignItems: 'flex-start',
                marginBottom: i < 2 ? 10 : 0, paddingLeft: 4,
              }}
            >
              <MessageCircle
                size={16} color={colors.salie.DEFAULT} strokeWidth={2}
                style={{ marginTop: 2, marginRight: 10 }}
              />
              <Text style={{ fontSize: 15, lineHeight: 22, color: colors.nachtblauw, flex: 1 }}>
                {prompt}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          style={{
            marginTop: 20, width: '100%', alignItems: 'center', paddingVertical: 16,
            backgroundColor: colors.terracotta.DEFAULT, borderRadius: organic.card,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>Klaar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
