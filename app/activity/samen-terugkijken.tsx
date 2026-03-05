import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, organic, warmShadow } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  MessageCircle,
  Gamepad2,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Users,
} from 'lucide-react-native';
import { useActivityHistoryStore } from '@/lib/stores/activity-history-store';

type Tab = 'vragen' | 'spellen' | 'quiz';

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'vragen', label: 'Vragen', icon: MessageCircle },
  { id: 'spellen', label: 'Spellen', icon: Gamepad2 },
  { id: 'quiz', label: 'Quiz', icon: BarChart3 },
];

export default function SamenTerugkijkenScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('vragen');
  const [expandedGame, setExpandedGame] = useState<string | null>(null);

  const questions = useActivityHistoryStore((s) => s.questions);
  const games = useActivityHistoryStore((s) => s.games);
  const quizzes = useActivityHistoryStore((s) => s.quizzes);
  const totalActivities = questions.length + games.length + quizzes.length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={[colors.zand.light, colors.warmwit]}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
      />

      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
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
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginLeft: 12 }}>
          Samen terugkijken
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats */}
        <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: organic.card,
              padding: 16,
              ...warmShadow,
              shadowOpacity: 0.05,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: colors.terracotta.DEFAULT + '12',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 14,
              }}
            >
              <Users size={22} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.nachtblauw }}>
                Jullie samen
              </Text>
              <Text style={{ fontSize: 13, color: '#6B7C8F', marginTop: 2 }}>
                {totalActivities === 0
                  ? 'Nog geen activiteiten gedaan'
                  : `${questions.length} vragen, ${games.length} spellen, ${quizzes.length} quizzen`}
              </Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 24, paddingTop: 20, gap: 8 }}>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  borderRadius: 12,
                  backgroundColor: isActive ? colors.terracotta.DEFAULT : '#FFFFFF',
                  borderWidth: isActive ? 0 : 1,
                  borderColor: colors.zand.DEFAULT,
                }}
              >
                <Icon
                  size={16}
                  color={isActive ? '#FFFFFF' : '#6B7C8F'}
                  strokeWidth={2}
                />
                <Text
                  style={{
                    marginLeft: 6,
                    fontSize: 13,
                    fontWeight: '600',
                    color: isActive ? '#FFFFFF' : '#6B7C8F',
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
          {activeTab === 'vragen' && (
            <>
              {questions.length === 0 ? (
                <EmptyState text="Nog geen vragen beantwoord. Ga naar Ontdek om te beginnen." />
              ) : (
                questions.map((q) => (
                  <View
                    key={q.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: organic.card,
                      padding: 16,
                      marginBottom: 12,
                      borderWidth: 1,
                      borderColor: colors.zand.DEFAULT,
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.nachtblauw }}>
                      {q.questionText}
                    </Text>
                    <View
                      style={{
                        alignSelf: 'flex-start',
                        borderRadius: 6,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        backgroundColor: colors.oceaan.DEFAULT + '10',
                        marginTop: 6,
                      }}
                    >
                      <Text style={{ fontSize: 10, fontWeight: '600', color: colors.oceaan.DEFAULT }}>
                        {q.category}
                      </Text>
                    </View>

                    {/* Answers */}
                    <View style={{ marginTop: 12, gap: 8 }}>
                      <View
                        style={{
                          backgroundColor: colors.terracotta.DEFAULT + '08',
                          borderRadius: 10,
                          padding: 12,
                          borderLeftWidth: 3,
                          borderLeftColor: colors.terracotta.DEFAULT,
                        }}
                      >
                        <Text style={{ fontSize: 11, fontWeight: '600', color: colors.terracotta.DEFAULT, marginBottom: 4 }}>
                          Jij
                        </Text>
                        <Text style={{ fontSize: 13, color: colors.nachtblauw, lineHeight: 18 }}>
                          {q.myAnswer}
                        </Text>
                      </View>

                      {q.partnerAnswer ? (
                        <View
                          style={{
                            backgroundColor: colors.oceaan.DEFAULT + '08',
                            borderRadius: 10,
                            padding: 12,
                            borderLeftWidth: 3,
                            borderLeftColor: colors.oceaan.DEFAULT,
                          }}
                        >
                          <Text style={{ fontSize: 11, fontWeight: '600', color: colors.oceaan.DEFAULT, marginBottom: 4 }}>
                            Je partner
                          </Text>
                          <Text style={{ fontSize: 13, color: colors.nachtblauw, lineHeight: 18 }}>
                            {q.partnerAnswer}
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            backgroundColor: colors.zand.light,
                            borderRadius: 10,
                            padding: 12,
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                            Je partner heeft nog niet geantwoord
                          </Text>
                        </View>
                      )}
                    </View>

                    <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 8 }}>
                      {q.date}
                    </Text>
                  </View>
                ))
              )}
            </>
          )}

          {activeTab === 'spellen' && (
            <>
              {games.length === 0 ? (
                <EmptyState text="Nog geen spellen gespeeld. Probeer 'Jij of Ik?' bij Ontdek." />
              ) : (
                games.map((g) => {
                  const isExpanded = expandedGame === g.id;
                  const agreedCount = g.traits.filter(
                    (t) => t.partnerChoice && t.myChoice === t.partnerChoice,
                  ).length;
                  const hasPartner = g.traits.some((t) => t.partnerChoice);

                  return (
                    <View
                      key={g.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: organic.card,
                        padding: 16,
                        marginBottom: 12,
                        borderWidth: 1,
                        borderColor: colors.zand.DEFAULT,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setExpandedGame(isExpanded ? null : g.id)}
                        activeOpacity={0.7}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.nachtblauw }}>
                            Jij of Ik?
                          </Text>
                          <Text style={{ fontSize: 13, color: '#6B7C8F', marginTop: 2 }}>
                            Score: Ik {g.myScore} - Partner {g.partnerScore}
                          </Text>
                          {hasPartner && (
                            <Text style={{ fontSize: 12, color: colors.salie.DEFAULT, marginTop: 2 }}>
                              Eens over {agreedCount}/{g.traits.length} eigenschappen
                            </Text>
                          )}
                        </View>
                        {isExpanded ? (
                          <ChevronUp size={18} color="#9CA3AF" strokeWidth={2} />
                        ) : (
                          <ChevronDown size={18} color="#9CA3AF" strokeWidth={2} />
                        )}
                      </TouchableOpacity>

                      {isExpanded && (
                        <View style={{ marginTop: 12 }}>
                          {g.traits.map((t, i) => (
                            <View
                              key={i}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 8,
                                borderTopWidth: i > 0 ? 1 : 0,
                                borderTopColor: colors.zand.light,
                              }}
                            >
                              <Text style={{ flex: 1, fontSize: 13, color: colors.nachtblauw }}>
                                {t.trait}
                              </Text>
                              <View
                                style={{
                                  borderRadius: 6,
                                  paddingHorizontal: 8,
                                  paddingVertical: 3,
                                  backgroundColor:
                                    t.myChoice === 'me'
                                      ? colors.terracotta.DEFAULT + '12'
                                      : colors.oceaan.DEFAULT + '12',
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '600',
                                    color:
                                      t.myChoice === 'me'
                                        ? colors.terracotta.DEFAULT
                                        : colors.oceaan.DEFAULT,
                                  }}
                                >
                                  {t.myChoice === 'me' ? 'Ik' : 'Partner'}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      )}

                      <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 8 }}>
                        {g.date}
                      </Text>
                    </View>
                  );
                })
              )}
            </>
          )}

          {activeTab === 'quiz' && (
            <>
              {quizzes.length === 0 ? (
                <EmptyState text="Nog geen quiz gedaan. Probeer de Relatie Check-up bij Ontdek." />
              ) : (
                quizzes.map((q) => {
                  const hasPartner = q.scores.some((s) => s.partnerScore !== undefined);
                  // Find biggest difference
                  let biggestDiff = { area: '', diff: 0 };
                  if (hasPartner) {
                    for (const s of q.scores) {
                      if (s.partnerScore !== undefined) {
                        const diff = Math.abs(s.myScore - s.partnerScore);
                        if (diff > biggestDiff.diff) {
                          biggestDiff = { area: s.area, diff };
                        }
                      }
                    }
                  }

                  return (
                    <View
                      key={q.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: organic.card,
                        padding: 16,
                        marginBottom: 12,
                        borderWidth: 1,
                        borderColor: colors.zand.DEFAULT,
                      }}
                    >
                      <Text style={{ fontSize: 14, fontWeight: '600', color: colors.nachtblauw, marginBottom: 12 }}>
                        Relatie Check-up
                      </Text>

                      {q.scores.map((s) => {
                        const myWidth = (s.myScore / 5) * 100;
                        const partnerWidth = s.partnerScore
                          ? (s.partnerScore / 5) * 100
                          : 0;
                        return (
                          <View key={s.area} style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                              <Text style={{ fontSize: 12, fontWeight: '600', color: colors.nachtblauw }}>
                                {s.area.charAt(0).toUpperCase() + s.area.slice(1)}
                              </Text>
                              <Text style={{ fontSize: 11, color: '#6B7C8F' }}>
                                {s.myScore.toFixed(1)}
                                {s.partnerScore !== undefined ? ` / ${s.partnerScore.toFixed(1)}` : ''}
                              </Text>
                            </View>
                            {/* My bar */}
                            <View
                              style={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: colors.zand.DEFAULT,
                                marginBottom: 3,
                              }}
                            >
                              <View
                                style={{
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: colors.terracotta.DEFAULT,
                                  width: `${myWidth}%`,
                                }}
                              />
                            </View>
                            {/* Partner bar */}
                            {s.partnerScore !== undefined && (
                              <View
                                style={{
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: colors.zand.DEFAULT,
                                }}
                              >
                                <View
                                  style={{
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: colors.oceaan.DEFAULT,
                                    width: `${partnerWidth}%`,
                                  }}
                                />
                              </View>
                            )}
                          </View>
                        );
                      })}

                      {/* Legend */}
                      <View style={{ flexDirection: 'row', gap: 16, marginTop: 4 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.terracotta.DEFAULT, marginRight: 4 }} />
                          <Text style={{ fontSize: 11, color: '#6B7C8F' }}>Jij</Text>
                        </View>
                        {hasPartner && (
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.oceaan.DEFAULT, marginRight: 4 }} />
                            <Text style={{ fontSize: 11, color: '#6B7C8F' }}>Partner</Text>
                          </View>
                        )}
                      </View>

                      {hasPartner && biggestDiff.area && (
                        <View
                          style={{
                            marginTop: 12,
                            backgroundColor: colors.salie.DEFAULT + '10',
                            borderRadius: 10,
                            padding: 12,
                          }}
                        >
                          <Text style={{ fontSize: 12, fontWeight: '600', color: colors.salie.DEFAULT }}>
                            Grootste verschil: {biggestDiff.area.charAt(0).toUpperCase() + biggestDiff.area.slice(1)}
                          </Text>
                          <Text style={{ fontSize: 11, color: '#6B7C8F', marginTop: 2 }}>
                            Bespreek dit samen - waarom kijken jullie hier anders naar?
                          </Text>
                        </View>
                      )}

                      {!hasPartner && (
                        <View
                          style={{
                            marginTop: 8,
                            backgroundColor: colors.zand.light,
                            borderRadius: 10,
                            padding: 12,
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                            Laat je partner ook de quiz doen om te vergelijken
                          </Text>
                        </View>
                      )}

                      <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 8 }}>
                        {q.date}
                      </Text>
                    </View>
                  );
                })
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: organic.card,
        padding: 32,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.zand.DEFAULT,
      }}
    >
      <Text style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', lineHeight: 20 }}>
        {text}
      </Text>
    </View>
  );
}
