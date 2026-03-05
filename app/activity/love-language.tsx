import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Clock,
  Gift,
  Wrench,
  Hand,
  RotateCcw,
  Users,
} from 'lucide-react-native';
import { colors, warmShadow, organic, gradients, fontSizes, spacing } from '@/lib/theme';
import { WarmCard } from '@/components/ui/WarmCard';
import { loveLanguagePairs, loveLanguageInfo } from '@/content/love-language-quiz';
import { usePartnerStore } from '@/lib/stores/partner-store';
import type { LoveLanguage } from '@/lib/types';

type ScreenState = 'intro' | 'quiz' | 'results' | 'partner-quiz' | 'comparison';

const LANGUAGE_ICONS: Record<LoveLanguage, typeof Heart> = {
  woorden: MessageCircle,
  'quality-time': Clock,
  cadeaus: Gift,
  hulpvaardigheid: Wrench,
  aanraking: Hand,
};

const LANGUAGE_ORDER: LoveLanguage[] = [
  'woorden',
  'quality-time',
  'cadeaus',
  'hulpvaardigheid',
  'aanraking',
];

const LANGUAGE_SUMMARY: { language: LoveLanguage; label: string }[] = [
  { language: 'woorden', label: 'Woorden van bevestiging - complimenten en aanmoediging' },
  { language: 'quality-time', label: 'Quality time - onverdeelde aandacht' },
  { language: 'cadeaus', label: 'Cadeaus - doordachte attenties' },
  { language: 'hulpvaardigheid', label: 'Hulpvaardigheid - helpende handen' },
  { language: 'aanraking', label: 'Fysieke aanraking - knuffels en nabijheid' },
];

function emptyScores(): Record<LoveLanguage, number> {
  return {
    woorden: 0,
    'quality-time': 0,
    cadeaus: 0,
    hulpvaardigheid: 0,
    aanraking: 0,
  };
}

export default function LoveLanguageScreen() {
  const [screenState, setScreenState] = useState<ScreenState>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<LoveLanguage, number>>(emptyScores);
  const [partnerScores, setPartnerScores] = useState<Record<LoveLanguage, number>>(emptyScores);
  const [partnerIndex, setPartnerIndex] = useState(0);

  const partnerName = usePartnerStore((s) => s.partnerName) ?? 'Je partner';

  const total = loveLanguagePairs.length;
  const current = loveLanguagePairs[currentIndex];
  const partnerCurrent = loveLanguagePairs[partnerIndex];
  const progress = (currentIndex / total) * 100;
  const partnerProgress = (partnerIndex / total) * 100;

  const handleSelect = useCallback(
    (language: LoveLanguage) => {
      setScores((prev) => ({ ...prev, [language]: prev[language] + 1 }));

      if (currentIndex < total - 1) {
        setTimeout(() => setCurrentIndex((i) => i + 1), 300);
      } else {
        setTimeout(() => setScreenState('results'), 300);
      }
    },
    [currentIndex, total],
  );

  const handlePartnerSelect = useCallback(
    (language: LoveLanguage) => {
      setPartnerScores((prev) => ({ ...prev, [language]: prev[language] + 1 }));

      if (partnerIndex < total - 1) {
        setTimeout(() => setPartnerIndex((i) => i + 1), 300);
      } else {
        setTimeout(() => setScreenState('comparison'), 300);
      }
    },
    [partnerIndex, total],
  );

  const handleReset = useCallback(() => {
    setScores(emptyScores());
    setPartnerScores(emptyScores());
    setCurrentIndex(0);
    setPartnerIndex(0);
    setScreenState('intro');
  }, []);

  const getSortedResults = useCallback((s: Record<LoveLanguage, number>) => {
    return LANGUAGE_ORDER.map((lang) => ({
      language: lang,
      score: s[lang],
      info: loveLanguageInfo[lang],
    })).sort((a, b) => b.score - a.score);
  }, []);

  // --- Shared quiz UI ---
  const renderQuizUI = (
    questionIndex: number,
    progressPct: number,
    totalQuestions: number,
    currentPair: typeof loveLanguagePairs[0],
    onSelect: (language: LoveLanguage) => void,
    isPartner: boolean,
  ) => (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={gradients.headerSoft}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
      />
      <View className="flex-row items-center px-5 py-3">
        <TouchableOpacity
          onPress={() => {
            if (questionIndex > 0) {
              if (isPartner) setPartnerIndex((i) => i - 1);
              else setCurrentIndex((i) => i - 1);
            } else {
              if (isPartner) setScreenState('results');
              else setScreenState('intro');
            }
          }}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.zand.DEFAULT }}
        >
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <View
          className="ml-3 rounded-full px-3 py-1"
          style={{ backgroundColor: isPartner ? colors.oceaan.DEFAULT + '15' : colors.terracotta.DEFAULT + '15' }}
        >
          <Text
            className="text-xs font-semibold"
            style={{ color: isPartner ? colors.oceaan.DEFAULT : colors.terracotta.DEFAULT }}
          >
            {isPartner ? `${partnerName} - Liefdestaal` : 'Liefdestaal'}
          </Text>
        </View>
        <View className="flex-1" />
      </View>

      <View className="mx-6 mt-1">
        <View className="h-2.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: colors.zand.DEFAULT }}>
          <View
            className="h-2.5 rounded-full"
            style={{
              backgroundColor: isPartner ? colors.oceaan.DEFAULT : colors.terracotta.DEFAULT,
              width: `${progressPct}%`,
            }}
          />
        </View>
        <Text className="mt-2 text-xs" style={{ color: '#6B7C8F' }}>
          Vraag {questionIndex + 1} van {totalQuestions}
        </Text>
      </View>

      <View className="px-6 mt-4">
        <Text style={{ fontSize: fontSizes.sm, color: '#6B7C8F', textAlign: 'center' }}>
          Kies wat het meest bij {isPartner ? 'je' : 'je'} past
        </Text>
      </View>

      <View className="flex-1 justify-center px-6" style={{ gap: 16 }}>
        <WarmCard
          onPress={() => onSelect(currentPair.optionA.language)}
          className="p-5"
          accentColor={isPartner ? colors.oceaan.DEFAULT : colors.terracotta.DEFAULT}
        >
          <Text
            style={{
              fontSize: fontSizes.md, fontWeight: '600', color: colors.nachtblauw,
              lineHeight: 24, paddingLeft: 8,
            }}
          >
            {currentPair.optionA.text}
          </Text>
        </WarmCard>

        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: colors.zand.DEFAULT,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: fontSizes.xs, fontWeight: '700', color: '#6B7C8F' }}>of</Text>
          </View>
        </View>

        <WarmCard
          onPress={() => onSelect(currentPair.optionB.language)}
          className="p-5"
          accentColor={isPartner ? colors.terracotta.DEFAULT : colors.oceaan.DEFAULT}
        >
          <Text
            style={{
              fontSize: fontSizes.md, fontWeight: '600', color: colors.nachtblauw,
              lineHeight: 24, paddingLeft: 8,
            }}
          >
            {currentPair.optionB.text}
          </Text>
        </WarmCard>
      </View>

      <View style={{ height: spacing.xl }} />
    </SafeAreaView>
  );

  // --- INTRO ---
  if (screenState === 'intro') {
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
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-6 items-center">
            <View
              style={{
                width: 96, height: 96, borderRadius: 48,
                backgroundColor: colors.terracotta.DEFAULT + '15',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Heart size={48} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
            </View>
            <Text
              style={{
                fontSize: fontSizes['2xl'], fontWeight: '700', color: colors.nachtblauw,
                textAlign: 'center', marginTop: spacing.lg,
              }}
            >
              Ontdek je liefdestaal
            </Text>
            <Text
              style={{
                fontSize: fontSizes.md, color: '#6B7C8F', textAlign: 'center',
                marginTop: spacing.sm, lineHeight: 24, paddingHorizontal: spacing.sm,
              }}
            >
              Ieder mens geeft en ontvangt liefde op een eigen manier.
              Ontdek welke van de 5 liefdestalen het beste bij jou past.
            </Text>
          </View>

          <View style={{ marginTop: spacing.xl }}>
            {LANGUAGE_SUMMARY.map((item) => {
              const Icon = LANGUAGE_ICONS[item.language];
              const info = loveLanguageInfo[item.language];
              return (
                <View
                  key={item.language}
                  style={{
                    flexDirection: 'row', alignItems: 'center', marginBottom: 12,
                    paddingVertical: 10, paddingHorizontal: 14,
                    backgroundColor: '#FFFFFF', borderRadius: organic.badge,
                    ...warmShadow, shadowOpacity: 0.04,
                  }}
                >
                  <View
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      backgroundColor: colors.terracotta.DEFAULT + '10',
                      alignItems: 'center', justifyContent: 'center', marginRight: 12,
                    }}
                  >
                    <Icon size={18} color={colors.terracotta.DEFAULT} strokeWidth={1.8} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: fontSizes.sm, fontWeight: '600', color: colors.nachtblauw }}>
                      {info.title}
                    </Text>
                    <Text style={{ fontSize: fontSizes.xs, color: '#6B7C8F', marginTop: 1 }}>
                      {info.description}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={() => setScreenState('quiz')}
            activeOpacity={0.8}
            style={{
              backgroundColor: colors.terracotta.DEFAULT, borderRadius: organic.button,
              paddingVertical: 16, alignItems: 'center', marginTop: spacing.xl,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: fontSizes.md, fontWeight: '700' }}>Start de quiz</Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: fontSizes.xs, color: '#9CA3AF', textAlign: 'center', marginTop: spacing.md,
            }}
          >
            30 vragen - duurt ongeveer 5 minuten
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- QUIZ ---
  if (screenState === 'quiz') {
    return renderQuizUI(currentIndex, progress, total, current, handleSelect, false);
  }

  // --- PARTNER QUIZ ---
  if (screenState === 'partner-quiz') {
    return renderQuizUI(partnerIndex, partnerProgress, total, partnerCurrent, handlePartnerSelect, true);
  }

  // --- RESULTS (my results + partner invite) ---
  if (screenState === 'results') {
    const sortedResults = getSortedResults(scores);
    const primary = sortedResults[0];
    const maxScore = primary.score;
    const PrimaryIcon = LANGUAGE_ICONS[primary.language];

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
          <View className="ml-3 flex-1">
            <Text className="text-lg font-bold" style={{ color: colors.nachtblauw }}>Jouw liefdestaal</Text>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-4 items-center">
            <View
              style={{
                width: 80, height: 80, borderRadius: 40,
                backgroundColor: colors.terracotta.DEFAULT + '15',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <PrimaryIcon size={36} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
            </View>
            <Text
              style={{
                fontSize: fontSizes.xl, fontWeight: '700', color: colors.nachtblauw,
                textAlign: 'center', marginTop: spacing.md,
              }}
            >
              {primary.info.title}
            </Text>
            <Text
              style={{
                fontSize: fontSizes.md, color: '#6B7C8F', textAlign: 'center',
                marginTop: spacing.xs, lineHeight: 24, paddingHorizontal: spacing.sm,
              }}
            >
              {primary.info.description}
            </Text>
          </View>

          {/* Bar chart */}
          <View style={{ marginTop: spacing.xl }}>
            <Text style={{ fontSize: fontSizes.md, fontWeight: '700', color: colors.nachtblauw, marginBottom: spacing.md }}>
              Alle liefdestalen
            </Text>
            {sortedResults.map((result, index) => {
              const barWidth = maxScore > 0 ? (result.score / maxScore) * 100 : 0;
              const isPrimary = index === 0;
              const barColor = isPrimary ? colors.terracotta.DEFAULT : colors.zand.dark;
              const Icon = LANGUAGE_ICONS[result.language];
              return (
                <View key={result.language} style={{ marginBottom: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon size={16} color={isPrimary ? colors.terracotta.DEFAULT : '#6B7C8F'} strokeWidth={1.8} />
                      <Text
                        style={{
                          fontSize: fontSizes.sm, fontWeight: isPrimary ? '700' : '500',
                          color: isPrimary ? colors.nachtblauw : '#6B7C8F', marginLeft: 8,
                        }}
                      >
                        {result.info.title}
                      </Text>
                    </View>
                    <Text style={{ fontSize: fontSizes.sm, fontWeight: '600', color: barColor }}>{result.score}</Text>
                  </View>
                  <View className="h-3 w-full overflow-hidden rounded-full" style={{ backgroundColor: colors.zand.DEFAULT }}>
                    <View className="h-3 rounded-full" style={{ backgroundColor: barColor, width: `${Math.max(barWidth, 3)}%` }} />
                  </View>
                </View>
              );
            })}
          </View>

          {/* Partner invite */}
          <TouchableOpacity
            onPress={() => setScreenState('partner-quiz')}
            activeOpacity={0.8}
            style={{
              marginTop: spacing.lg, padding: 24,
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
              Ontdek {partnerName}'s liefdestaal
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7C8F', textAlign: 'center', lineHeight: 20 }}>
              Geef de telefoon aan je partner voor dezelfde quiz, daarna vergelijken jullie de resultaten
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

  // --- COMPARISON ---
  const myResults = getSortedResults(scores);
  const partnerResults = getSortedResults(partnerScores);
  const myPrimary = myResults[0];
  const partnerPrimary = partnerResults[0];
  const MyIcon = LANGUAGE_ICONS[myPrimary.language];
  const PartnerIcon = LANGUAGE_ICONS[partnerPrimary.language];
  const maxBoth = Math.max(myPrimary.score, partnerPrimary.score, 1);

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
        <View className="ml-3 flex-1">
          <Text className="text-lg font-bold" style={{ color: colors.nachtblauw }}>Jullie liefdestalen</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Side by side primary languages */}
        <View style={{ marginTop: 24, flexDirection: 'row', gap: 12 }}>
          {/* My primary */}
          <View
            style={{
              flex: 1, padding: 20, alignItems: 'center',
              backgroundColor: colors.terracotta.DEFAULT + '10',
              borderRadius: organic.card, borderWidth: 1.5,
              borderColor: colors.terracotta.DEFAULT + '25',
            }}
          >
            <View
              style={{
                width: 56, height: 56, borderRadius: 28,
                backgroundColor: colors.terracotta.DEFAULT + '20',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <MyIcon size={28} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
            </View>
            <Text
              style={{
                fontSize: 11, fontWeight: '600', color: colors.terracotta.DEFAULT,
                marginTop: 10, textTransform: 'uppercase', letterSpacing: 0.5,
              }}
            >
              Jij
            </Text>
            <Text
              style={{
                fontSize: 16, fontWeight: '700', color: colors.nachtblauw,
                textAlign: 'center', marginTop: 4,
              }}
            >
              {myPrimary.info.title}
            </Text>
          </View>

          {/* Partner primary */}
          <View
            style={{
              flex: 1, padding: 20, alignItems: 'center',
              backgroundColor: colors.oceaan.DEFAULT + '10',
              borderRadius: organic.card, borderWidth: 1.5,
              borderColor: colors.oceaan.DEFAULT + '25',
            }}
          >
            <View
              style={{
                width: 56, height: 56, borderRadius: 28,
                backgroundColor: colors.oceaan.DEFAULT + '20',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <PartnerIcon size={28} color={colors.oceaan.DEFAULT} strokeWidth={1.5} />
            </View>
            <Text
              style={{
                fontSize: 11, fontWeight: '600', color: colors.oceaan.DEFAULT,
                marginTop: 10, textTransform: 'uppercase', letterSpacing: 0.5,
              }}
            >
              {partnerName}
            </Text>
            <Text
              style={{
                fontSize: 16, fontWeight: '700', color: colors.nachtblauw,
                textAlign: 'center', marginTop: 4,
              }}
            >
              {partnerPrimary.info.title}
            </Text>
          </View>
        </View>

        {/* Comparison bars */}
        <View style={{ marginTop: 28 }}>
          <Text style={{ fontSize: fontSizes.md, fontWeight: '700', color: colors.nachtblauw, marginBottom: 4 }}>
            Vergelijking
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: colors.terracotta.DEFAULT }} />
              <Text style={{ fontSize: 12, color: '#6B7C8F' }}>Jij</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: colors.oceaan.DEFAULT }} />
              <Text style={{ fontSize: 12, color: '#6B7C8F' }}>{partnerName}</Text>
            </View>
          </View>

          {LANGUAGE_ORDER.map((lang) => {
            const myScore = scores[lang];
            const ps = partnerScores[lang];
            const info = loveLanguageInfo[lang];
            const Icon = LANGUAGE_ICONS[lang];
            const myWidth = maxBoth > 0 ? (myScore / maxBoth) * 100 : 0;
            const partnerWidth = maxBoth > 0 ? (ps / maxBoth) * 100 : 0;

            return (
              <View key={lang} style={{ marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon size={16} color={colors.nachtblauw} strokeWidth={1.8} />
                    <Text style={{ fontSize: fontSizes.sm, fontWeight: '600', color: colors.nachtblauw, marginLeft: 8 }}>
                      {info.title}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: colors.terracotta.DEFAULT }}>{myScore}</Text>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: colors.oceaan.DEFAULT }}>{ps}</Text>
                  </View>
                </View>
                <View className="h-3 w-full overflow-hidden rounded-full" style={{ backgroundColor: colors.terracotta.DEFAULT + '18', marginBottom: 4 }}>
                  <View className="h-3 rounded-full" style={{ backgroundColor: colors.terracotta.DEFAULT, width: `${Math.max(myWidth, 3)}%` }} />
                </View>
                <View className="h-3 w-full overflow-hidden rounded-full" style={{ backgroundColor: colors.oceaan.DEFAULT + '18' }}>
                  <View className="h-3 rounded-full" style={{ backgroundColor: colors.oceaan.DEFAULT, width: `${Math.max(partnerWidth, 3)}%` }} />
                </View>
              </View>
            );
          })}
        </View>

        {/* Insight */}
        <View
          style={{
            marginTop: 8, padding: 20,
            backgroundColor: colors.salie.DEFAULT + '12',
            borderRadius: organic.card, borderWidth: 1, borderColor: colors.salie.DEFAULT + '25',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Heart size={22} color={colors.salie.DEFAULT} strokeWidth={2} />
            <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: '700', color: colors.nachtblauw }}>
              Wat betekent dit?
            </Text>
          </View>

          {myPrimary.language === partnerPrimary.language ? (
            <Text style={{ fontSize: 14, lineHeight: 20, color: colors.nachtblauw }}>
              Jullie delen dezelfde liefdestaal! Dat maakt het makkelijker om elkaars behoeften te begrijpen. Let er wel op dat jullie het ook actief blijven uiten.
            </Text>
          ) : (
            <Text style={{ fontSize: 14, lineHeight: 20, color: colors.nachtblauw }}>
              Jullie hebben verschillende liefdestalen. Dat is heel normaal! Het betekent dat je bewust moeite kunt doen om liefde te tonen in de taal van je partner. Jij voelt je het meest geliefd door {myPrimary.info.title.toLowerCase()}, terwijl {partnerName} dat voelt bij {partnerPrimary.info.title.toLowerCase()}.
            </Text>
          )}
        </View>

        {/* Action buttons */}
        <TouchableOpacity
          onPress={handleReset}
          activeOpacity={0.7}
          style={{
            marginTop: spacing.lg, paddingVertical: 14, alignItems: 'center',
            flexDirection: 'row', justifyContent: 'center',
          }}
        >
          <RotateCcw size={16} color="#6B7C8F" strokeWidth={2} />
          <Text style={{ fontSize: fontSizes.sm, color: '#6B7C8F', fontWeight: '500', marginLeft: 6 }}>
            Opnieuw doen
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          style={{
            marginTop: 8, width: '100%', alignItems: 'center', paddingVertical: 16,
            backgroundColor: colors.terracotta.DEFAULT, borderRadius: organic.card,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>Klaar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
