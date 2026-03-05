import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, warmShadow, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Link2, Check } from 'lucide-react-native';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { useCheckInStore } from '@/lib/stores/checkin-store';
import { usePartnerStore } from '@/lib/stores/partner-store';
import { GraduatedHeart } from '@/components/icons';
import * as Haptics from 'expo-haptics';

type Step = 'already-done' | 'mood' | 'connection' | 'done';

function hasCheckedInToday(entries: { type: string; created_at: string }[]): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return entries.some(
    (e) => e.type === 'checkin' && e.created_at.slice(0, 10) === today,
  );
}

export default function CheckInScreen() {
  const entries = useVerhaalStore((s) => s.entries);
  const alreadyDone = hasCheckedInToday(entries);
  const [step, setStep] = useState<Step>(alreadyDone ? 'already-done' : 'mood');
  const [mood, setMood] = useState<number | null>(null);
  const [connection, setConnection] = useState<number | null>(null);
  const addEntry = useVerhaalStore((s) => s.addEntry);

  const handleMoodSelect = async (value: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setMood(value);
    setTimeout(() => setStep('connection'), 400);
  };

  const handleConnectionSelect = async (value: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setConnection(value);
  };

  const isOnline = usePartnerStore((s) => s.isOnline);
  const submitCheckInOnline = useCheckInStore((s) => s.submitCheckIn);

  const handleSubmit = async () => {
    addEntry({ type: 'checkin', data: { mood: mood as 1|2|3|4|5, pulse: connection as 1|2|3|4|5 } });
    // Also sync to Supabase when online
    if (isOnline) {
      try {
        await submitCheckInOnline(mood as 1|2|3|4|5, connection as 1|2|3|4|5);
      } catch {
        // Local save succeeded, Supabase sync failed silently
      }
    }
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setStep('done');
  };

  if (step === 'already-done') {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
        <LinearGradient
          colors={gradients.headerSoft }
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
        />
        <View className="flex-1 items-center justify-center px-8">
          <View
            className="h-24 w-24 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.salie.DEFAULT + '20' }}
          >
            <Check size={48} color={colors.salie.DEFAULT} strokeWidth={2} />
          </View>
          <Text
            className="mt-6 text-2xl font-bold"
            style={{ color: colors.nachtblauw }}
          >
            Al ingecheckt vandaag
          </Text>
          <Text
            className="mt-2 text-center text-base leading-6"
            style={{ color: '#6B7C8F' }}
          >
            Je hebt vandaag al een check-in gedaan. Wil je het opnieuw doen?
          </Text>
          <TouchableOpacity
            onPress={() => setStep('mood')}
            activeOpacity={0.8}
            className="mt-8 w-full items-center py-4"
            style={{ backgroundColor: colors.terracotta.DEFAULT, borderRadius: organic.card }}
          >
            <Text className="text-base font-semibold text-white">Opnieuw inchecken</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            className="mt-3 w-full items-center py-4"
            style={{ borderWidth: 1, borderColor: colors.zand.dark, borderRadius: organic.card }}
          >
            <Text className="text-base font-semibold" style={{ color: colors.nachtblauw }}>Terug</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (step === 'done') {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
        <LinearGradient
          colors={gradients.headerSoft }
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
        />
        <View className="flex-1 items-center justify-center px-8">
          <View
            className="h-24 w-24 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.salie.DEFAULT + '20' }}
          >
            <Check size={48} color={colors.salie.DEFAULT} strokeWidth={2} />
          </View>
          <Text
            className="mt-6 text-2xl font-bold"
            style={{ color: colors.nachtblauw }}
          >
            Bedankt!
          </Text>
          <Text
            className="mt-2 text-center text-base leading-6"
            style={{ color: '#6B7C8F' }}
          >
            Je check-in is opgeslagen. Zo houden jullie samen de vinger aan de pols.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            className="mt-8 w-full items-center py-4"
            style={{ backgroundColor: colors.salie.DEFAULT, borderRadius: organic.card }}
          >
            <Text className="text-base font-semibold text-white">Terug</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={gradients.headerSoft }
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
      />
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.zand.DEFAULT }}
        >
          <X size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <View
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: colors.oceaan.DEFAULT + '15' }}
        >
          <Text className="text-xs font-semibold" style={{ color: colors.oceaan.DEFAULT }}>
            Relatiepols
          </Text>
        </View>
        <View className="w-10" />
      </View>

      {/* Progress dots */}
      <View className="flex-row items-center justify-center px-6 py-2">
        <View
          className="mx-1 h-2 w-8 rounded-full"
          style={{
            backgroundColor:
              step === 'mood' || step === 'connection'
                ? colors.terracotta.DEFAULT
                : colors.zand.dark,
          }}
        />
        <View
          className="mx-1 h-2 w-8 rounded-full"
          style={{
            backgroundColor:
              step === 'connection'
                ? colors.terracotta.DEFAULT
                : colors.zand.dark,
          }}
        />
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-8">
        {step === 'mood' && (
          <>
            <Text
              className="mb-2 text-center text-2xl font-bold"
              style={{ color: colors.nachtblauw }}
            >
              Hoe voel je je vandaag?
            </Text>
            <Text
              className="mb-10 text-center text-sm"
              style={{ color: '#6B7C8F' }}
            >
              Kies een score van 1 tot 5
            </Text>
            <View className="flex-row items-end justify-center">
              {[1, 2, 3, 4, 5].map((value) => {
                const isSelected = mood === value;
                const fillLevel = (value - 1) as 0 | 1 | 2 | 3 | 4;
                const heartSize = 20 + (value - 1) * 3;
                const circleSize = 44 + (value - 1) * 5;
                return (
                  <TouchableOpacity
                    key={value}
                    onPress={() => handleMoodSelect(value)}
                    activeOpacity={0.7}
                    className="mx-1.5 items-center justify-center"
                  >
                    <View
                      className="items-center justify-center rounded-full"
                      style={{
                        width: circleSize,
                        height: circleSize,
                        backgroundColor: isSelected
                          ? colors.terracotta.DEFAULT
                          : colors.terracotta.DEFAULT + '10',
                        borderWidth: isSelected ? 0 : 1.5,
                        borderColor: isSelected ? 'transparent' : colors.terracotta.DEFAULT + '20',
                        transform: [{ scale: isSelected ? 1.12 : 1 }],
                      }}
                    >
                      <GraduatedHeart
                        size={heartSize}
                        fillLevel={fillLevel}
                        color={isSelected ? '#FFFFFF' : colors.terracotta.DEFAULT}
                        strokeWidth={1.8}
                      />
                    </View>
                    <Text
                      className="mt-2 text-xs font-medium"
                      style={{ color: isSelected ? colors.terracotta.DEFAULT : '#9CA3AF' }}
                    >
                      {value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {step === 'connection' && (
          <>
            <Text
              className="mb-2 text-center text-2xl font-bold"
              style={{ color: colors.nachtblauw }}
            >
              Hoe verbonden voel je je?
            </Text>
            <Text
              className="mb-10 text-center text-sm"
              style={{ color: '#6B7C8F' }}
            >
              Kies een score van 1 tot 5
            </Text>
            <View className="flex-row items-end justify-center">
              {[1, 2, 3, 4, 5].map((value) => {
                const isSelected = connection === value;
                const iconSize = 18 + (value - 1) * 3;
                const circleSize = 44 + (value - 1) * 5;
                return (
                  <TouchableOpacity
                    key={value}
                    onPress={() => handleConnectionSelect(value)}
                    activeOpacity={0.7}
                    className="mx-1.5 items-center justify-center"
                  >
                    <View
                      className="items-center justify-center rounded-full"
                      style={{
                        width: circleSize,
                        height: circleSize,
                        backgroundColor: isSelected
                          ? colors.oceaan.DEFAULT
                          : colors.oceaan.DEFAULT + '10',
                        borderWidth: isSelected ? 0 : 1.5,
                        borderColor: isSelected ? 'transparent' : colors.oceaan.DEFAULT + '20',
                        transform: [{ scale: isSelected ? 1.12 : 1 }],
                      }}
                    >
                      <Link2
                        size={iconSize}
                        color={isSelected ? '#FFFFFF' : colors.oceaan.DEFAULT}
                        strokeWidth={1.8}
                      />
                    </View>
                    <Text
                      className="mt-2 text-xs font-medium"
                      style={{ color: isSelected ? colors.oceaan.DEFAULT : '#9CA3AF' }}
                    >
                      {value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {connection !== null && (
              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.8}
                className="mt-12 w-full items-center py-4"
                style={{ backgroundColor: colors.terracotta.DEFAULT, borderRadius: organic.card }}
              >
                <Text className="text-base font-semibold text-white">
                  Verstuur
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
