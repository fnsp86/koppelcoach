import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, warmShadow, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Wind,
  Heart,
  Lightbulb,
  MessageSquare,
  Ear,
  Check,
  ChevronRight,
  Users,
} from 'lucide-react-native';
import { feelings, needs, breathingConfig } from '@/content/conflict-flow';
import { usePartnerStore } from '@/lib/stores/partner-store';
import * as Haptics from 'expo-haptics';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
// Steps: 1=breathing, 2=my feelings, 3=my needs, 4=my message, 5=partner feelings, 6=partner needs, 7=comparison, 8=done

const TOTAL_STEPS = 7;

export default function ConflictScreen() {
  const [step, setStep] = useState<Step>(1);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [becauseText, setBecauseText] = useState('');
  const [partnerFeelings, setPartnerFeelings] = useState<string[]>([]);
  const [partnerNeeds, setPartnerNeeds] = useState<string[]>([]);
  const [partnerBecauseText, setPartnerBecauseText] = useState('');
  const [breathRound, setBreathRound] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'in' | 'uit'>('in');
  const [breathTimer, setBreathTimer] = useState(0);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingDone, setBreathingDone] = useState(false);

  const partnerName = usePartnerStore((s) => s.partnerName) ?? 'Je partner';

  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Breathing animation
  useEffect(() => {
    if (!breathingActive) return;

    intervalRef.current = setInterval(() => {
      setBreathTimer((prev) => {
        const next = prev + 1;
        const phaseDuration = breathingConfig.inhale;

        if (next >= phaseDuration) {
          setBreathPhase((currentPhase) => {
            if (currentPhase === 'uit') {
              setBreathRound((currentRound) => {
                const nextRound = currentRound + 1;
                if (nextRound >= breathingConfig.rounds) {
                  setBreathingActive(false);
                  setBreathingDone(true);
                  if (intervalRef.current) clearInterval(intervalRef.current);
                }
                return nextRound;
              });
              return 'in';
            }
            return 'uit';
          });
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [breathingActive]);

  useEffect(() => {
    if (!breathingActive) return;

    if (breathPhase === 'in') {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: breathingConfig.inhale * 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0.6,
        duration: breathingConfig.exhale * 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [breathPhase, breathingActive]);

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathRound(0);
    setBreathPhase('in');
    setBreathTimer(0);
  };

  const toggleFeeling = (id: string) => {
    setSelectedFeelings((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const togglePartnerFeeling = (id: string) => {
    setPartnerFeelings((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const togglePartnerNeed = (id: string) => {
    setPartnerNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const composedMessage = (
    feelingIds: string[],
    needIds: string[],
    because: string,
  ) => {
    const feelingLabels = feelingIds
      .map((id) => feelings.find((f) => f.id === id)?.label.toLowerCase())
      .filter(Boolean)
      .join(' en ');
    const needLabels = needIds
      .map((id) => needs.find((n) => n.id === id)?.label.toLowerCase())
      .filter(Boolean)
      .join(' en ');

    let msg = `Ik voel me ${feelingLabels || '...'}`;
    if (because.trim()) {
      msg += ` omdat ${because.trim()}`;
    }
    if (needLabels) {
      msg += `. Wat ik nodig heb is ${needLabels}`;
    }
    msg += '.';
    return msg;
  };

  const displayStep = () => {
    if (step <= 4) return step;
    if (step === 5) return 5;
    if (step === 6) return 6;
    return 7;
  };

  const canGoNext = () => {
    switch (step) {
      case 1: return breathingDone;
      case 2: return selectedFeelings.length > 0;
      case 3: return selectedNeeds.length > 0;
      case 4: return true;
      case 5: return partnerFeelings.length > 0;
      case 6: return partnerNeeds.length > 0;
      case 7: return true;
      default: return false;
    }
  };

  const goNext = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (step < 8) {
      setStep((step + 1) as Step);
    }
  };

  const stepLabel = () => {
    switch (step) {
      case 1: return 'Ademhaling';
      case 2: return 'Jouw gevoelens';
      case 3: return 'Jouw behoeften';
      case 4: return 'Jouw boodschap';
      case 5: return `${partnerName}'s gevoelens`;
      case 6: return `${partnerName}'s behoeften`;
      case 7: return 'Vergelijking';
      default: return '';
    }
  };

  // Done screen
  if (step === 8) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
        <LinearGradient
          colors={gradients.headerSoft}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
        />
        <View className="flex-1 items-center justify-center px-8">
          <View
            className="h-24 w-24 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.salie.DEFAULT + '20' }}
          >
            <Check size={48} color={colors.salie.DEFAULT} strokeWidth={2} />
          </View>
          <Text className="mt-6 text-2xl font-bold" style={{ color: colors.nachtblauw }}>
            Goed gedaan
          </Text>
          <Text className="mt-2 text-center text-base leading-6" style={{ color: '#6B7C8F' }}>
            Jullie hebben samen een stap gezet. Elk gesprek dat jullie zo voeren, maakt jullie sterker.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            className="mt-8 w-full items-center py-4"
            style={{ backgroundColor: colors.salie.DEFAULT, borderRadius: organic.card }}
          >
            <Text className="text-base font-semibold text-white">Klaar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
        <View className="flex-row items-center px-5 py-3">
          <TouchableOpacity
            onPress={() => (step > 1 ? setStep((step - 1) as Step) : router.back())}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.zand.DEFAULT }}
          >
            <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
          <Text className="ml-3 text-lg font-bold" style={{ color: colors.nachtblauw }}>
            {stepLabel()}
          </Text>
          <View className="flex-1" />
          <Text className="text-sm" style={{ color: '#6B7C8F' }}>
            Stap {displayStep()} van {TOTAL_STEPS}
          </Text>
        </View>

        {/* Progress steps */}
        <View className="mx-6 flex-row">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
            <View
              key={s}
              className="mx-0.5 h-2 flex-1 rounded-full"
              style={{
                backgroundColor:
                  s <= displayStep()
                    ? step >= 5 && s >= 5 ? colors.oceaan.DEFAULT : colors.terracotta.DEFAULT
                    : colors.zand.DEFAULT,
              }}
            />
          ))}
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Step 1: Breathing */}
          {step === 1 && (
            <View className="items-center px-6 pt-8">
              <Text className="text-xl font-bold" style={{ color: colors.nachtblauw }}>
                Adem rustig in en uit
              </Text>
              <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>
                Neem even een pauze voor je reageert
              </Text>

              <View className="mt-10 items-center justify-center" style={{ height: 200 }}>
                {!breathingActive && !breathingDone ? (
                  <TouchableOpacity
                    onPress={startBreathing}
                    activeOpacity={0.8}
                    className="h-44 w-44 items-center justify-center rounded-full"
                    style={{ backgroundColor: colors.oceaan.DEFAULT + '15' }}
                  >
                    <Wind size={40} color={colors.oceaan.DEFAULT} strokeWidth={1.3} />
                    <Text className="mt-2 text-sm font-semibold" style={{ color: colors.oceaan.DEFAULT }}>Start</Text>
                  </TouchableOpacity>
                ) : breathingDone ? (
                  <View
                    className="h-44 w-44 items-center justify-center rounded-full"
                    style={{ backgroundColor: colors.salie.DEFAULT + '15' }}
                  >
                    <Check size={40} color={colors.salie.DEFAULT} strokeWidth={2} />
                    <Text className="mt-2 text-sm font-semibold" style={{ color: colors.salie.DEFAULT }}>Klaar</Text>
                  </View>
                ) : (
                  <Animated.View
                    className="h-44 w-44 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: colors.oceaan.DEFAULT + '15',
                      transform: [{ scale: scaleAnim }],
                    }}
                  >
                    <Text className="text-lg font-bold" style={{ color: colors.oceaan.DEFAULT }}>
                      {breathPhase === 'in'
                        ? `${breathingConfig.inhale - breathTimer}s in...`
                        : `${breathingConfig.exhale - breathTimer}s uit...`}
                    </Text>
                  </Animated.View>
                )}
              </View>

              {breathingActive && (
                <Text className="mt-4 text-sm" style={{ color: '#6B7C8F' }}>
                  Ronde {breathRound + 1} van {breathingConfig.rounds}
                </Text>
              )}

              {!breathingDone && !breathingActive && (
                <TouchableOpacity onPress={() => setBreathingDone(true)} className="mt-6" activeOpacity={0.7}>
                  <Text className="text-sm" style={{ color: '#9CA3AF' }}>Sla over</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Step 2: My Feelings */}
          {step === 2 && (
            <View className="px-6 pt-6">
              <Text className="text-xl font-bold" style={{ color: colors.nachtblauw }}>Wat voel je nu?</Text>
              <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>Kies een of meerdere gevoelens</Text>
              <View className="mt-6 flex-row flex-wrap">
                {feelings.map((feeling) => {
                  const isSelected = selectedFeelings.includes(feeling.id);
                  return (
                    <TouchableOpacity
                      key={feeling.id}
                      onPress={() => toggleFeeling(feeling.id)}
                      activeOpacity={0.7}
                      className="mb-3 mr-3 px-4 py-3"
                      style={{
                        backgroundColor: isSelected ? colors.terracotta.DEFAULT : colors.terracotta.DEFAULT + '10',
                        borderWidth: isSelected ? 0 : 1.5,
                        borderColor: isSelected ? 'transparent' : colors.terracotta.DEFAULT + '25',
                        borderRadius: 14,
                      }}
                    >
                      <Text className="text-sm font-semibold" style={{ color: isSelected ? '#FFFFFF' : colors.terracotta.DEFAULT }}>
                        {feeling.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Step 3: My Needs */}
          {step === 3 && (
            <View className="px-6 pt-6">
              <Text className="text-xl font-bold" style={{ color: colors.nachtblauw }}>Wat heb je nodig?</Text>
              <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>Kies een of meerdere behoeften</Text>
              <View className="mt-6 flex-row flex-wrap">
                {needs.map((need) => {
                  const isSelected = selectedNeeds.includes(need.id);
                  return (
                    <TouchableOpacity
                      key={need.id}
                      onPress={() => toggleNeed(need.id)}
                      activeOpacity={0.7}
                      className="mb-3 mr-3 px-4 py-3"
                      style={{
                        backgroundColor: isSelected ? colors.oceaan.DEFAULT : colors.oceaan.DEFAULT + '10',
                        borderWidth: isSelected ? 0 : 1.5,
                        borderColor: isSelected ? 'transparent' : colors.oceaan.DEFAULT + '25',
                        borderRadius: 14,
                      }}
                    >
                      <Text className="text-sm font-semibold" style={{ color: isSelected ? '#FFFFFF' : colors.oceaan.DEFAULT }}>
                        {need.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Step 4: I-message + invite partner */}
          {step === 4 && (
            <View className="px-6 pt-6">
              <Text className="text-xl font-bold" style={{ color: colors.nachtblauw }}>Jouw boodschap</Text>
              <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>Formuleer wat je voelt en nodig hebt</Text>

              <View className="mt-6">
                <Text className="text-sm font-semibold" style={{ color: colors.nachtblauw }}>
                  Ik voel me{' '}
                  <Text style={{ color: colors.terracotta.DEFAULT }}>
                    {selectedFeelings.map((id) => feelings.find((f) => f.id === id)?.label.toLowerCase()).join(' en ') || '...'}
                  </Text>
                  {' '}omdat...
                </Text>

                <TextInput
                  value={becauseText}
                  onChangeText={setBecauseText}
                  placeholder="Beschrijf de situatie..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  className="mt-3 px-4 py-3 text-base"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1.5, borderColor: colors.zand.dark, color: colors.nachtblauw,
                    minHeight: 100, textAlignVertical: 'top', borderRadius: organic.card,
                  }}
                />
              </View>

              <View className="mt-6 p-4" style={{ backgroundColor: colors.salie.DEFAULT + '10', borderRadius: organic.card }}>
                <Text className="mb-2 text-xs font-semibold" style={{ color: colors.salie.dark }}>Jouw boodschap</Text>
                <Text className="text-sm leading-5" style={{ color: colors.nachtblauw }}>
                  {composedMessage(selectedFeelings, selectedNeeds, becauseText)}
                </Text>
              </View>
            </View>
          )}

          {/* Step 5: Partner Feelings */}
          {step === 5 && (
            <View className="px-6 pt-6">
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View
                  style={{
                    width: 32, height: 32, borderRadius: 16,
                    backgroundColor: colors.oceaan.DEFAULT,
                    alignItems: 'center', justifyContent: 'center', marginRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF' }}>
                    {partnerName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.oceaan.DEFAULT }}>
                  {partnerName} is aan de beurt
                </Text>
              </View>

              <Text className="text-xl font-bold" style={{ color: colors.nachtblauw }}>Wat voel jij nu?</Text>
              <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>Kies een of meerdere gevoelens</Text>
              <View className="mt-6 flex-row flex-wrap">
                {feelings.map((feeling) => {
                  const isSelected = partnerFeelings.includes(feeling.id);
                  return (
                    <TouchableOpacity
                      key={feeling.id}
                      onPress={() => togglePartnerFeeling(feeling.id)}
                      activeOpacity={0.7}
                      className="mb-3 mr-3 px-4 py-3"
                      style={{
                        backgroundColor: isSelected ? colors.oceaan.DEFAULT : colors.oceaan.DEFAULT + '10',
                        borderWidth: isSelected ? 0 : 1.5,
                        borderColor: isSelected ? 'transparent' : colors.oceaan.DEFAULT + '25',
                        borderRadius: 14,
                      }}
                    >
                      <Text className="text-sm font-semibold" style={{ color: isSelected ? '#FFFFFF' : colors.oceaan.DEFAULT }}>
                        {feeling.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Step 6: Partner Needs */}
          {step === 6 && (
            <View className="px-6 pt-6">
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View
                  style={{
                    width: 32, height: 32, borderRadius: 16,
                    backgroundColor: colors.oceaan.DEFAULT,
                    alignItems: 'center', justifyContent: 'center', marginRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#FFFFFF' }}>
                    {partnerName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.oceaan.DEFAULT }}>
                  {partnerName} is aan de beurt
                </Text>
              </View>

              <Text className="text-xl font-bold" style={{ color: colors.nachtblauw }}>Wat heb jij nodig?</Text>
              <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>Kies een of meerdere behoeften</Text>
              <View className="mt-6 flex-row flex-wrap">
                {needs.map((need) => {
                  const isSelected = partnerNeeds.includes(need.id);
                  return (
                    <TouchableOpacity
                      key={need.id}
                      onPress={() => togglePartnerNeed(need.id)}
                      activeOpacity={0.7}
                      className="mb-3 mr-3 px-4 py-3"
                      style={{
                        backgroundColor: isSelected ? colors.oceaan.DEFAULT : colors.oceaan.DEFAULT + '10',
                        borderWidth: isSelected ? 0 : 1.5,
                        borderColor: isSelected ? 'transparent' : colors.oceaan.DEFAULT + '25',
                        borderRadius: 14,
                      }}
                    >
                      <Text className="text-sm font-semibold" style={{ color: isSelected ? '#FFFFFF' : colors.oceaan.DEFAULT }}>
                        {need.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Step 7: Comparison */}
          {step === 7 && (
            <View className="px-6 pt-6">
              <Text className="text-xl font-bold" style={{ color: colors.nachtblauw }}>Jullie perspectieven</Text>
              <Text className="mt-2 text-sm leading-5" style={{ color: '#6B7C8F' }}>
                Lees elkaars boodschap en luister naar wat de ander nodig heeft
              </Text>

              {/* My message */}
              <View
                style={{
                  marginTop: 20, padding: 16,
                  backgroundColor: colors.terracotta.DEFAULT + '10',
                  borderRadius: organic.card,
                  borderWidth: 1, borderColor: colors.terracotta.DEFAULT + '25',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View
                    style={{
                      width: 24, height: 24, borderRadius: 12,
                      backgroundColor: colors.terracotta.DEFAULT,
                      alignItems: 'center', justifyContent: 'center', marginRight: 8,
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '700', color: '#FFFFFF' }}>J</Text>
                  </View>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.terracotta.DEFAULT }}>Jij</Text>
                </View>
                <Text style={{ fontSize: 14, lineHeight: 20, color: colors.nachtblauw }}>
                  {composedMessage(selectedFeelings, selectedNeeds, becauseText)}
                </Text>
              </View>

              {/* Partner message */}
              <View
                style={{
                  marginTop: 12, padding: 16,
                  backgroundColor: colors.oceaan.DEFAULT + '10',
                  borderRadius: organic.card,
                  borderWidth: 1, borderColor: colors.oceaan.DEFAULT + '25',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View
                    style={{
                      width: 24, height: 24, borderRadius: 12,
                      backgroundColor: colors.oceaan.DEFAULT,
                      alignItems: 'center', justifyContent: 'center', marginRight: 8,
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '700', color: '#FFFFFF' }}>
                      {partnerName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.oceaan.DEFAULT }}>{partnerName}</Text>
                </View>
                <Text style={{ fontSize: 14, lineHeight: 20, color: colors.nachtblauw }}>
                  {composedMessage(partnerFeelings, partnerNeeds, partnerBecauseText)}
                </Text>
              </View>

              {/* Shared feelings/needs */}
              {(() => {
                const sharedFeelings = selectedFeelings.filter((f) => partnerFeelings.includes(f));
                const sharedNeeds = selectedNeeds.filter((n) => partnerNeeds.includes(n));
                if (sharedFeelings.length === 0 && sharedNeeds.length === 0) return null;
                return (
                  <View
                    style={{
                      marginTop: 16, padding: 16,
                      backgroundColor: colors.salie.DEFAULT + '12',
                      borderRadius: organic.card,
                      borderWidth: 1, borderColor: colors.salie.DEFAULT + '25',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <Heart size={18} color={colors.salie.DEFAULT} strokeWidth={2} />
                      <Text style={{ marginLeft: 8, fontSize: 15, fontWeight: '700', color: colors.nachtblauw }}>
                        Wat jullie delen
                      </Text>
                    </View>
                    {sharedFeelings.length > 0 && (
                      <Text style={{ fontSize: 14, color: colors.nachtblauw, marginBottom: 4 }}>
                        Gevoelens: {sharedFeelings.map((id) => feelings.find((f) => f.id === id)?.label).join(', ')}
                      </Text>
                    )}
                    {sharedNeeds.length > 0 && (
                      <Text style={{ fontSize: 14, color: colors.nachtblauw }}>
                        Behoeften: {sharedNeeds.map((id) => needs.find((n) => n.id === id)?.label).join(', ')}
                      </Text>
                    )}
                  </View>
                );
              })()}

              {/* Listening instructions */}
              <View className="mt-6">
                {[
                  { number: '1', text: 'Lees de boodschap van je partner hardop voor' },
                  { number: '2', text: 'Herhaal in je eigen woorden wat je hoort' },
                  { number: '3', text: 'Vraag: klopt dit?' },
                ].map((instruction) => (
                  <View
                    key={instruction.number}
                    className="mb-4 flex-row items-start p-4"
                    style={{ backgroundColor: '#FFFFFF', borderRadius: organic.card, ...warmShadow }}
                  >
                    <View
                      className="mr-4 h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: colors.oceaan.DEFAULT + '15' }}
                    >
                      <Text className="text-sm font-bold" style={{ color: colors.oceaan.DEFAULT }}>
                        {instruction.number}
                      </Text>
                    </View>
                    <Text className="flex-1 text-base leading-6" style={{ color: colors.nachtblauw }}>
                      {instruction.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom button */}
        <View className="px-6 pb-4">
          <TouchableOpacity
            onPress={goNext}
            activeOpacity={0.8}
            disabled={!canGoNext()}
            className="flex-row items-center justify-center py-4"
            style={{
              backgroundColor: canGoNext()
                ? step >= 5 ? colors.oceaan.DEFAULT : colors.terracotta.DEFAULT
                : colors.zand.dark,
              borderRadius: organic.card,
            }}
          >
            <Text className="text-base font-semibold text-white">
              {step === 4 ? `Geef aan ${partnerName}` : step === 7 ? 'Klaar' : 'Volgende'}
            </Text>
            {step < 7 && step !== 4 && (
              <ChevronRight size={18} color="#FFFFFF" strokeWidth={2} />
            )}
            {step === 4 && (
              <Users size={18} color="#FFFFFF" strokeWidth={2} style={{ marginLeft: 6 }} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
