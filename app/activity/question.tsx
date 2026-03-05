import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import {
  X,
  Bookmark,
  Lock,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Send,
  Heart,
  Users,
} from 'lucide-react-native';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { useActivityHistoryStore } from '@/lib/stores/activity-history-store';
import { usePartnerStore } from '@/lib/stores/partner-store';
import { useBookmarksStore } from '@/lib/stores/bookmarks-store';
import * as Haptics from 'expo-haptics';

type Phase = 'answering' | 'submitted' | 'partner-turn' | 'comparison';

export default function QuestionScreen() {
  const { questionId, questionText, questionCategory, followUp } =
    useLocalSearchParams<{
      questionId: string;
      questionText: string;
      questionCategory: string;
      followUp: string;
    }>();

  const [answer, setAnswer] = useState('');
  const [partnerAnswer, setPartnerAnswer] = useState('');
  const toggleBookmark = useBookmarksStore((s) => s.toggleBookmark);
  const isBookmarked = useBookmarksStore((s) => s.isBookmarked('question', questionText ?? ''));
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [phase, setPhase] = useState<Phase>('answering');

  const addEntry = useVerhaalStore((s) => s.addEntry);
  const verhaalEntries = useVerhaalStore((s) => s.entries);
  const addQuestion = useActivityHistoryStore((s) => s.addQuestion);
  const updatePartnerAnswer = useActivityHistoryStore((s) => s.updatePartnerAnswer);
  const partnerName = usePartnerStore((s) => s.partnerName) ?? 'Je partner';

  // Store the question ID after saving so we can update partner answer
  const [savedQuestionId, setSavedQuestionId] = useState<string | null>(null);

  const categoryLabel =
    (questionCategory ?? 'vraag').charAt(0).toUpperCase() +
    (questionCategory ?? 'vraag').slice(1);

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = async () => {
    if (answer.trim().length === 0) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Save to verhaal store (only once per day per question)
    const todayStr = new Date().toISOString().split('T')[0];
    const alreadyDoneToday = verhaalEntries.some(
      (e) => e.type === 'activity' && e.data.activityType === 'question' && e.created_at.startsWith(todayStr)
    );
    if (!alreadyDoneToday) {
      addEntry({
        type: 'activity',
        data: {
          title: questionText ?? 'Dagelijkse vraag',
          activityType: 'question',
          summary: answer.trim(),
        },
      });
    }

    // Save to activity history store
    addQuestion({
      questionText: questionText ?? 'Dagelijkse vraag',
      category: questionCategory ?? 'vraag',
      myAnswer: answer.trim(),
      date: today,
    });

    // Get the saved question ID for later partner update
    const questions = useActivityHistoryStore.getState().questions;
    if (questions.length > 0) {
      setSavedQuestionId(questions[0].id);
    }

    setPhase('submitted');
  };

  const handlePartnerSubmit = async () => {
    if (partnerAnswer.trim().length === 0) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Update partner answer in activity history
    if (savedQuestionId) {
      updatePartnerAnswer(savedQuestionId, partnerAnswer.trim());
    }

    setPhase('comparison');
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={gradients.headerSoft}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
      />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
            <X size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleBookmark({
              type: 'question',
              title: questionText ?? 'Dagelijkse vraag',
              subtitle: questionCategory,
              route: '/activity/question',
              params: { questionId: questionId ?? '', questionText: questionText ?? '', questionCategory: questionCategory ?? '', followUp: followUp ?? '' },
            })}
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              backgroundColor: colors.zand.DEFAULT,
            }}
          >
            <Bookmark
              size={20}
              color={isBookmarked ? colors.goud.DEFAULT : colors.nachtblauw}
              strokeWidth={2}
              fill={isBookmarked ? colors.goud.DEFAULT : 'none'}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Question */}
          <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                lineHeight: 32,
                color: colors.nachtblauw,
              }}
            >
              {questionText}
            </Text>

            {/* Category badge */}
            <View
              style={{
                marginTop: 12,
                alignSelf: 'flex-start',
                borderRadius: 999,
                paddingHorizontal: 12,
                paddingVertical: 4,
                backgroundColor: colors.terracotta.DEFAULT + '15',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: colors.terracotta.DEFAULT,
                }}
              >
                {categoryLabel}
              </Text>
            </View>
          </View>

          {/* Illustration - only in answering phase */}
          {phase === 'answering' && (
            <View
              style={{
                marginHorizontal: 24,
                marginTop: 24,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 40,
                backgroundColor: colors.terracotta.DEFAULT + '08',
                borderRadius: organic.card,
              }}
            >
              <View
                style={{
                  height: 80,
                  width: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 40,
                  backgroundColor: colors.terracotta.DEFAULT + '15',
                }}
              >
                <MessageCircle
                  size={36}
                  color={colors.terracotta.DEFAULT}
                  strokeWidth={1.3}
                />
              </View>
            </View>
          )}

          {/* Follow-up (collapsible) */}
          {followUp && phase === 'answering' ? (
            <View style={{ marginHorizontal: 24, marginTop: 16 }}>
              <TouchableOpacity
                onPress={() => setShowFollowUp(!showFollowUp)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  backgroundColor: colors.salie.DEFAULT + '12',
                  borderRadius: organic.card,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: colors.salie.dark,
                  }}
                >
                  Verdieping
                </Text>
                {showFollowUp ? (
                  <ChevronUp size={18} color={colors.salie.dark} strokeWidth={2} />
                ) : (
                  <ChevronDown size={18} color={colors.salie.dark} strokeWidth={2} />
                )}
              </TouchableOpacity>
              {showFollowUp && (
                <View
                  style={{
                    marginTop: 4,
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                    paddingTop: 8,
                    backgroundColor: colors.salie.DEFAULT + '08',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 20,
                      color: colors.nachtblauw,
                    }}
                  >
                    {followUp}
                  </Text>
                </View>
              )}
            </View>
          ) : null}

          {/* Privacy note */}
          {phase === 'answering' && (
            <View
              style={{
                marginHorizontal: 24,
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Lock size={14} color="#9CA3AF" strokeWidth={2} />
              <Text style={{ marginLeft: 8, fontSize: 12, color: '#9CA3AF' }}>
                Jullie antwoorden zijn prive
              </Text>
            </View>
          )}

          {/* ---- Phase: Answering ---- */}
          {phase === 'answering' && (
            <>
              <View style={{ marginHorizontal: 24, marginTop: 16 }}>
                <TextInput
                  value={answer}
                  onChangeText={setAnswer}
                  placeholder="Jouw antwoord..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    fontSize: 16,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1.5,
                    borderColor: colors.zand.dark,
                    color: colors.nachtblauw,
                    minHeight: 120,
                    textAlignVertical: 'top',
                    borderRadius: organic.card,
                  }}
                />
              </View>

              <View style={{ marginHorizontal: 24, marginTop: 16 }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 16,
                    backgroundColor:
                      answer.trim().length > 0
                        ? colors.terracotta.DEFAULT
                        : colors.zand.dark,
                    borderRadius: organic.card,
                  }}
                >
                  <Send size={18} color="#FFFFFF" strokeWidth={2} />
                  <Text
                    style={{
                      marginLeft: 8,
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#FFFFFF',
                    }}
                  >
                    Verstuur
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* ---- Phase: Submitted - invite partner ---- */}
          {phase === 'submitted' && (
            <View style={{ marginHorizontal: 24, marginTop: 24 }}>
              {/* Confirmation */}
              <View
                style={{
                  padding: 16,
                  backgroundColor: colors.salie.DEFAULT + '12',
                  borderRadius: organic.card,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: colors.salie.DEFAULT + '30',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Text style={{ fontSize: 14 }}>✓</Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: colors.salie.dark,
                  }}
                >
                  Jouw antwoord is opgeslagen
                </Text>
              </View>

              {/* Partner invite */}
              <TouchableOpacity
                onPress={() => setPhase('partner-turn')}
                activeOpacity={0.8}
                style={{
                  marginTop: 16,
                  padding: 24,
                  backgroundColor: colors.oceaan.DEFAULT + '10',
                  borderRadius: organic.card,
                  borderWidth: 1.5,
                  borderColor: colors.oceaan.DEFAULT + '25',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: colors.oceaan.DEFAULT + '20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Users size={28} color={colors.oceaan.DEFAULT} strokeWidth={1.5} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: colors.nachtblauw,
                    marginBottom: 6,
                  }}
                >
                  Geef de telefoon aan {partnerName}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#6B7C8F',
                    textAlign: 'center',
                    lineHeight: 20,
                  }}
                >
                  Laat je partner dezelfde vraag beantwoorden, daarna vergelijken jullie de antwoorden
                </Text>
              </TouchableOpacity>

              {/* Skip option */}
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                style={{
                  marginTop: 16,
                  alignItems: 'center',
                  paddingVertical: 14,
                }}
              >
                <Text style={{ fontSize: 14, color: '#9CA3AF' }}>
                  Sla over en ga terug
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ---- Phase: Partner's turn ---- */}
          {phase === 'partner-turn' && (
            <View style={{ marginHorizontal: 24, marginTop: 24 }}>
              {/* Partner header */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: colors.oceaan.DEFAULT,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF' }}>
                    {partnerName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: colors.oceaan.DEFAULT,
                  }}
                >
                  {partnerName} is aan de beurt
                </Text>
              </View>

              <TextInput
                value={partnerAnswer}
                onChangeText={setPartnerAnswer}
                placeholder={`${partnerName}'s antwoord...`}
                placeholderTextColor="#9CA3AF"
                multiline
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  fontSize: 16,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1.5,
                  borderColor: colors.oceaan.DEFAULT + '40',
                  color: colors.nachtblauw,
                  minHeight: 120,
                  textAlignVertical: 'top',
                  borderRadius: organic.card,
                }}
              />

              <TouchableOpacity
                onPress={handlePartnerSubmit}
                activeOpacity={0.8}
                style={{
                  marginTop: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 16,
                  backgroundColor:
                    partnerAnswer.trim().length > 0
                      ? colors.oceaan.DEFAULT
                      : colors.zand.dark,
                  borderRadius: organic.card,
                }}
              >
                <Send size={18} color="#FFFFFF" strokeWidth={2} />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#FFFFFF',
                  }}
                >
                  Vergelijk antwoorden
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ---- Phase: Comparison ---- */}
          {phase === 'comparison' && (
            <View style={{ marginHorizontal: 24, marginTop: 24 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: colors.nachtblauw,
                  marginBottom: 16,
                  textAlign: 'center',
                }}
              >
                Jullie antwoorden
              </Text>

              {/* Side-by-side answers */}
              <View style={{ flexDirection: 'row', gap: 12 }}>
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
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                  >
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
                      <Text style={{ fontSize: 11, fontWeight: '700', color: '#FFFFFF' }}>
                        J
                      </Text>
                    </View>
                    <Text style={{ fontSize: 13, fontWeight: '600', color: colors.terracotta.DEFAULT }}>
                      Jij
                    </Text>
                  </View>
                  <Text style={{ fontSize: 14, lineHeight: 20, color: colors.nachtblauw }}>
                    {answer}
                  </Text>
                </View>

                {/* Partner answer */}
                <View
                  style={{
                    flex: 1,
                    backgroundColor: colors.oceaan.DEFAULT + '10',
                    borderRadius: organic.card,
                    borderWidth: 1.5,
                    borderColor: colors.oceaan.DEFAULT + '30',
                    padding: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: colors.oceaan.DEFAULT,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 8,
                      }}
                    >
                      <Text style={{ fontSize: 11, fontWeight: '700', color: '#FFFFFF' }}>
                        {partnerName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 13, fontWeight: '600', color: colors.oceaan.DEFAULT }}>
                      {partnerName}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 14, lineHeight: 20, color: colors.nachtblauw }}>
                    {partnerAnswer}
                  </Text>
                </View>
              </View>

              {/* Discuss together section */}
              <View
                style={{
                  marginTop: 24,
                  padding: 20,
                  backgroundColor: colors.salie.DEFAULT + '12',
                  borderRadius: organic.card,
                  borderWidth: 1,
                  borderColor: colors.salie.DEFAULT + '25',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Heart size={22} color={colors.salie.DEFAULT} strokeWidth={2} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 20,
                      fontWeight: '700',
                      color: colors.nachtblauw,
                    }}
                  >
                    Bespreek dit samen
                  </Text>
                </View>

                {[
                  'Wat viel je op aan het antwoord van je partner?',
                  'Herken je wat je partner zegt?',
                  'Wat zou je anders willen?',
                ].map((prompt, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      marginBottom: i < 2 ? 10 : 0,
                      paddingLeft: 4,
                    }}
                  >
                    <MessageCircle
                      size={16}
                      color={colors.salie.DEFAULT}
                      strokeWidth={2}
                      style={{ marginTop: 2, marginRight: 10 }}
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        lineHeight: 22,
                        color: colors.nachtblauw,
                        flex: 1,
                      }}
                    >
                      {prompt}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Klaar button */}
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.8}
                style={{
                  marginTop: 20,
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: 16,
                  backgroundColor: colors.terracotta.DEFAULT,
                  borderRadius: organic.card,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>
                  Klaar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
