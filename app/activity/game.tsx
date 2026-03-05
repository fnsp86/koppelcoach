import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, warmShadow, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, User, Users, Trophy, Heart, MessageCircle, Check, X as XIcon } from 'lucide-react-native';
import { gameTraits } from '@/content/game-traits';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { useActivityHistoryStore } from '@/lib/stores/activity-history-store';
import { usePartnerStore } from '@/lib/stores/partner-store';
import * as Haptics from 'expo-haptics';

const CARDS_PER_GAME = 10;

type TraitChoice = { trait: string; myChoice: 'me' | 'partner' };
type PartnerTraitChoice = { trait: string; partnerChoice: 'me' | 'partner' };
type Phase = 'playing' | 'my-results' | 'partner-turn' | 'partner-playing' | 'comparison';

export default function GameScreen() {
  const [shuffledTraits] = useState(() => {
    const shuffled = [...gameTraits].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, CARDS_PER_GAME);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choices, setChoices] = useState<TraitChoice[]>([]);
  const [partnerChoices, setPartnerChoices] = useState<PartnerTraitChoice[]>([]);
  const [partnerIndex, setPartnerIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('playing');
  const [savedSessionId, setSavedSessionId] = useState<string | null>(null);

  const addEntry = useVerhaalStore((s) => s.addEntry);
  const verhaalEntries = useVerhaalStore((s) => s.entries);
  const addGameSession = useActivityHistoryStore((s) => s.addGameSession);
  const updateGamePartnerChoices = useActivityHistoryStore((s) => s.updateGamePartnerChoices);
  const partnerName = usePartnerStore((s) => s.partnerName) ?? 'Je partner';

  const current = shuffledTraits[currentIndex];
  const partnerCurrent = shuffledTraits[partnerIndex];

  const myCount = choices.filter((c) => c.myChoice === 'me').length;
  const partnerCount = choices.filter((c) => c.myChoice === 'partner').length;

  const handleChoice = async (choice: 'me' | 'partner') => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const newChoice: TraitChoice = {
      trait: shuffledTraits[currentIndex].trait,
      myChoice: choice,
    };
    const updatedChoices = [...choices, newChoice];
    setChoices(updatedChoices);

    if (currentIndex < CARDS_PER_GAME - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 250);
    } else {
      const finalMy = updatedChoices.filter((c) => c.myChoice === 'me').length;
      const finalPartner = updatedChoices.filter((c) => c.myChoice === 'partner').length;

      // Save to verhaal store (only once per day)
      const today = new Date().toISOString().split('T')[0];
      const alreadyDoneToday = verhaalEntries.some(
        (e) => e.type === 'activity' && e.data.activityType === 'game' && e.created_at.startsWith(today)
      );
      if (!alreadyDoneToday) {
        addEntry({
          type: 'activity',
          data: {
            title: 'Jij of Ik? gespeeld',
            activityType: 'game',
            summary: `Score: Ik ${finalMy} - Partner ${finalPartner}`,
          },
        });
      }

      addGameSession({
        gameType: 'jij-of-ik',
        date: new Date().toISOString().slice(0, 10),
        traits: updatedChoices,
        myScore: finalMy,
        partnerScore: finalPartner,
      });

      // Save session ID for partner update
      const games = useActivityHistoryStore.getState().games;
      if (games.length > 0) {
        setSavedSessionId(games[0].id);
      }

      setTimeout(() => setPhase('my-results'), 250);
    }
  };

  const handlePartnerChoice = async (choice: 'me' | 'partner') => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const newChoice: PartnerTraitChoice = {
      trait: shuffledTraits[partnerIndex].trait,
      partnerChoice: choice,
    };
    const updatedChoices = [...partnerChoices, newChoice];
    setPartnerChoices(updatedChoices);

    if (partnerIndex < CARDS_PER_GAME - 1) {
      setTimeout(() => setPartnerIndex(partnerIndex + 1), 250);
    } else {
      // Save partner choices
      if (savedSessionId) {
        updateGamePartnerChoices(
          savedSessionId,
          updatedChoices.map((c) => ({ trait: c.trait, choice: c.partnerChoice }))
        );
      }
      setTimeout(() => setPhase('comparison'), 250);
    }
  };

  // Count agreements in comparison
  const getComparisonData = () => {
    return choices.map((myChoice) => {
      const pc = partnerChoices.find((p) => p.trait === myChoice.trait);
      const agreed = pc ? myChoice.myChoice === pc.partnerChoice : false;
      return {
        trait: myChoice.trait,
        myChoice: myChoice.myChoice,
        partnerChoice: pc?.partnerChoice ?? null,
        agreed,
      };
    });
  };

  // ---- Partner playing phase ----
  if (phase === 'partner-playing') {
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
          <View style={{ marginLeft: 12, flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 28, height: 28, borderRadius: 14,
                backgroundColor: colors.oceaan.DEFAULT,
                alignItems: 'center', justifyContent: 'center', marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#FFFFFF' }}>
                {partnerName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.oceaan.DEFAULT }}>
              {partnerName} speelt
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#6B7C8F' }}>
            Kaart {partnerIndex + 1} van {CARDS_PER_GAME}
          </Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
          <Text style={{ marginBottom: 16, fontSize: 16, color: '#6B7C8F' }}>Wie is meer...</Text>
          <View
            style={{
              width: '100%', alignItems: 'center', paddingHorizontal: 32, paddingVertical: 80,
              backgroundColor: '#FFFFFF', borderRadius: organic.card, ...warmShadow,
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: '700', color: colors.nachtblauw }}>
              {partnerCurrent.trait}
            </Text>
            <View
              style={{
                marginTop: 16, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4,
                backgroundColor: colors.goud.DEFAULT + '12',
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '500', color: colors.goud.dark }}>
                {partnerCurrent.category}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', paddingHorizontal: 24, paddingBottom: 32 }}>
          <TouchableOpacity
            onPress={() => handlePartnerChoice('me')}
            activeOpacity={0.7}
            style={{
              flex: 1, marginRight: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
              paddingVertical: 16, backgroundColor: colors.terracotta.DEFAULT, borderRadius: organic.card,
            }}
          >
            <User size={20} color="#FFFFFF" strokeWidth={2} />
            <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>Ik</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handlePartnerChoice('partner')}
            activeOpacity={0.7}
            style={{
              flex: 1, marginLeft: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
              paddingVertical: 16, backgroundColor: colors.oceaan.DEFAULT, borderRadius: organic.card,
            }}
          >
            <Users size={20} color="#FFFFFF" strokeWidth={2} />
            <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>Mijn partner</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ---- My results / partner invite ----
  if (phase === 'my-results' || phase === 'partner-turn') {
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
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Winner announcement */}
          <View style={{ marginTop: 32, alignItems: 'center' }}>
            <View
              style={{
                height: 80, width: 80, alignItems: 'center', justifyContent: 'center',
                borderRadius: 40, backgroundColor: colors.goud.DEFAULT + '20',
              }}
            >
              <Trophy size={36} color={colors.goud.DEFAULT} strokeWidth={1.5} />
            </View>
            <Text style={{ marginTop: 24, fontSize: 24, fontWeight: '700', color: colors.nachtblauw }}>
              Jouw keuzes zijn klaar!
            </Text>
          </View>

          {/* Scores */}
          <View style={{ marginTop: 32, flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ marginHorizontal: 16, alignItems: 'center' }}>
              <View
                style={{
                  height: 80, width: 80, alignItems: 'center', justifyContent: 'center',
                  backgroundColor: colors.terracotta.DEFAULT + '12', borderRadius: organic.card,
                }}
              >
                <Text style={{ fontSize: 30, fontWeight: '700', color: colors.terracotta.DEFAULT }}>{myCount}</Text>
              </View>
              <Text style={{ marginTop: 8, fontSize: 14, fontWeight: '600', color: colors.nachtblauw }}>Ik</Text>
            </View>

            <View style={{ marginHorizontal: 16, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#9CA3AF' }}>vs</Text>
            </View>

            <View style={{ marginHorizontal: 16, alignItems: 'center' }}>
              <View
                style={{
                  height: 80, width: 80, alignItems: 'center', justifyContent: 'center',
                  backgroundColor: colors.oceaan.DEFAULT + '12', borderRadius: organic.card,
                }}
              >
                <Text style={{ fontSize: 30, fontWeight: '700', color: colors.oceaan.DEFAULT }}>{partnerCount}</Text>
              </View>
              <Text style={{ marginTop: 8, fontSize: 14, fontWeight: '600', color: colors.nachtblauw }}>Mijn partner</Text>
            </View>
          </View>

          {/* Partner invite */}
          <TouchableOpacity
            onPress={() => setPhase('partner-playing')}
            activeOpacity={0.8}
            style={{
              marginTop: 32, padding: 24,
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
              Nu is {partnerName} aan de beurt
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7C8F', textAlign: 'center', lineHeight: 20 }}>
              Geef de telefoon aan je partner. Dezelfde eigenschappen, maar dan hoe zij het zien!
            </Text>
          </TouchableOpacity>

          {/* Skip option */}
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
  if (phase === 'comparison') {
    const comparisonData = getComparisonData();
    const agreements = comparisonData.filter((d) => d.agreed).length;

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
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Agreement score */}
          <View style={{ marginTop: 16, alignItems: 'center' }}>
            <View
              style={{
                height: 80, width: 80, alignItems: 'center', justifyContent: 'center',
                borderRadius: 40, backgroundColor: colors.salie.DEFAULT + '20',
              }}
            >
              <Heart size={36} color={colors.salie.DEFAULT} strokeWidth={1.5} />
            </View>
            <Text style={{ marginTop: 16, fontSize: 24, fontWeight: '700', color: colors.nachtblauw }}>
              {agreements} van {CARDS_PER_GAME} eens
            </Text>
            <Text style={{ marginTop: 4, fontSize: 14, color: '#6B7C8F' }}>
              Op {agreements} eigenschappen zijn jullie het eens
            </Text>
          </View>

          {/* Trait comparison list */}
          <View style={{ marginTop: 28 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginBottom: 16 }}>
              Vergelijking per eigenschap
            </Text>

            <View
              style={{
                backgroundColor: '#FFFFFF', borderRadius: organic.card,
                overflow: 'hidden', ...warmShadow,
              }}
            >
              {comparisonData.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                    paddingHorizontal: 16, paddingVertical: 14,
                    borderBottomWidth: index < comparisonData.length - 1 ? 1 : 0,
                    borderBottomColor: colors.zand.DEFAULT,
                    backgroundColor: item.agreed ? colors.salie.DEFAULT + '08' : 'transparent',
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: '500', color: colors.nachtblauw, flex: 1, marginRight: 8 }}>
                    {item.trait}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    {/* My choice */}
                    <View
                      style={{
                        paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
                        backgroundColor: item.myChoice === 'me' ? colors.terracotta.DEFAULT + '18' : colors.oceaan.DEFAULT + '18',
                      }}
                    >
                      <Text style={{ fontSize: 11, fontWeight: '600', color: item.myChoice === 'me' ? colors.terracotta.DEFAULT : colors.oceaan.DEFAULT }}>
                        {item.myChoice === 'me' ? 'Jij' : 'Partner'}
                      </Text>
                    </View>

                    {/* Partner choice */}
                    {item.partnerChoice && (
                      <View
                        style={{
                          paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
                          backgroundColor: item.partnerChoice === 'me' ? colors.terracotta.DEFAULT + '18' : colors.oceaan.DEFAULT + '18',
                          borderWidth: 1.5, borderColor: item.partnerChoice === 'me' ? colors.terracotta.DEFAULT + '30' : colors.oceaan.DEFAULT + '30',
                        }}
                      >
                        <Text style={{ fontSize: 11, fontWeight: '600', color: item.partnerChoice === 'me' ? colors.terracotta.DEFAULT : colors.oceaan.DEFAULT }}>
                          {item.partnerChoice === 'me' ? 'Jij' : 'Partner'}
                        </Text>
                      </View>
                    )}

                    {/* Agreement indicator */}
                    {item.agreed ? (
                      <Check size={16} color={colors.salie.DEFAULT} strokeWidth={2.5} />
                    ) : (
                      <XIcon size={16} color="#D1D5DB" strokeWidth={2} />
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Discuss section */}
          <View
            style={{
              marginTop: 28, padding: 20,
              backgroundColor: colors.salie.DEFAULT + '12',
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
              'Welke eigenschap verraste je het meest?',
              'Waar zijn jullie het oneens en waarom?',
              'Welke eigenschap zou je graag meer bij jezelf willen zien?',
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

          {/* Back button */}
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

  // ---- Playing phase (default) ----
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
        <View
          style={{
            marginLeft: 12, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4,
            backgroundColor: colors.goud.DEFAULT + '15',
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '600', color: colors.goud.DEFAULT }}>Spel</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#6B7C8F' }}>
          Kaart {currentIndex + 1} van {CARDS_PER_GAME}
        </Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
        <Text style={{ marginBottom: 16, fontSize: 16, color: '#6B7C8F' }}>Wie is meer...</Text>
        <View
          style={{
            width: '100%', alignItems: 'center', paddingHorizontal: 32, paddingVertical: 80,
            backgroundColor: '#FFFFFF', borderRadius: organic.card, ...warmShadow,
          }}
        >
          <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: '700', color: colors.nachtblauw }}>
            {current.trait}
          </Text>
          <View
            style={{
              marginTop: 16, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4,
              backgroundColor: colors.goud.DEFAULT + '12',
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: '500', color: colors.goud.dark }}>{current.category}</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', paddingHorizontal: 24, paddingBottom: 32 }}>
        <TouchableOpacity
          onPress={() => handleChoice('me')}
          activeOpacity={0.7}
          style={{
            flex: 1, marginRight: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
            paddingVertical: 16, backgroundColor: colors.terracotta.DEFAULT, borderRadius: organic.card,
          }}
        >
          <User size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>Ik</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleChoice('partner')}
          activeOpacity={0.7}
          style={{
            flex: 1, marginLeft: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
            paddingVertical: 16, backgroundColor: colors.oceaan.DEFAULT, borderRadius: organic.card,
          }}
        >
          <Users size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>Mijn partner</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
