import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, warmShadow, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Shuffle,
  RotateCcw,
  Home,
  TreePine,
  Utensils,
  Clock,
  Wallet,
} from 'lucide-react-native';
import { dateIdeas, type Budget, type Duration, type Setting } from '@/content/date-ideas';
import * as Haptics from 'expo-haptics';

type FilterKey<T> = T | null;

const BUDGET_OPTIONS: { value: Budget; label: string }[] = [
  { value: 'gratis', label: 'Gratis' },
  { value: 'goedkoop', label: 'Goedkoop' },
  { value: 'uitgebreid', label: 'Uitgebreid' },
];

const DURATION_OPTIONS: { value: Duration; label: string }[] = [
  { value: '1-uur', label: '1 uur' },
  { value: 'halve-dag', label: 'Halve dag' },
  { value: 'hele-dag', label: 'Hele dag' },
];

const SETTING_OPTIONS: { value: Setting; label: string; icon: typeof Home }[] = [
  { value: 'thuis', label: 'Thuis', icon: Home },
  { value: 'buiten', label: 'Buiten', icon: TreePine },
  { value: 'uit', label: 'Uit', icon: Utensils },
];

export default function DateRouletteScreen() {
  const [budgetFilter, setBudgetFilter] = useState<FilterKey<Budget>>(null);
  const [durationFilter, setDurationFilter] = useState<FilterKey<Duration>>(null);
  const [settingFilter, setSettingFilter] = useState<FilterKey<Setting>>(null);
  const [currentIdea, setCurrentIdea] = useState<typeof dateIdeas[number] | null>(null);
  const [spinning, setSpinning] = useState(false);

  const filteredIdeas = useMemo(() => {
    return dateIdeas.filter((idea) => {
      if (budgetFilter && idea.budget !== budgetFilter) return false;
      if (durationFilter && idea.duration !== durationFilter) return false;
      if (settingFilter && idea.setting !== settingFilter) return false;
      return true;
    });
  }, [budgetFilter, durationFilter, settingFilter]);

  const spin = () => {
    if (filteredIdeas.length === 0) return;
    setSpinning(true);
    setTimeout(async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const randomIndex = Math.floor(Math.random() * filteredIdeas.length);
      setCurrentIdea(filteredIdeas[randomIndex]);
      setSpinning(false);
    }, 600);
  };

  const toggleFilter = <T,>(
    current: FilterKey<T>,
    value: T,
    setter: (v: FilterKey<T>) => void
  ) => {
    setter(current === value ? null : value);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={gradients.headerSoft }
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
      />
      {/* Header */}
      <View className="flex-row items-center px-5 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.zand.DEFAULT }}
        >
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <Text
          className="ml-3 text-lg font-bold"
          style={{ color: colors.nachtblauw }}
        >
          Date Roulette
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Filters */}
        <View className="px-6 pt-2">
          {/* Budget filter */}
          <View className="mb-4">
            <View className="mb-2 flex-row items-center">
              <Wallet size={16} color="#6B7C8F" strokeWidth={2} />
              <Text className="ml-2 text-sm font-semibold" style={{ color: '#6B7C8F' }}>
                Budget
              </Text>
            </View>
            <View className="flex-row">
              {BUDGET_OPTIONS.map((option) => {
                const isActive = budgetFilter === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => toggleFilter(budgetFilter, option.value, setBudgetFilter)}
                    activeOpacity={0.7}
                    className="mr-2 px-4 py-2"
                    style={{
                      backgroundColor: isActive
                        ? colors.goud.DEFAULT
                        : colors.zand.DEFAULT,
                      borderRadius: organic.card,
                    }}
                  >
                    <Text
                      className="text-sm font-medium"
                      style={{
                        color: isActive ? '#FFFFFF' : colors.nachtblauw,
                      }}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Duration filter */}
          <View className="mb-4">
            <View className="mb-2 flex-row items-center">
              <Clock size={16} color="#6B7C8F" strokeWidth={2} />
              <Text className="ml-2 text-sm font-semibold" style={{ color: '#6B7C8F' }}>
                Tijd
              </Text>
            </View>
            <View className="flex-row">
              {DURATION_OPTIONS.map((option) => {
                const isActive = durationFilter === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => toggleFilter(durationFilter, option.value, setDurationFilter)}
                    activeOpacity={0.7}
                    className="mr-2 px-4 py-2"
                    style={{
                      backgroundColor: isActive
                        ? colors.oceaan.DEFAULT
                        : colors.zand.DEFAULT,
                      borderRadius: organic.card,
                    }}
                  >
                    <Text
                      className="text-sm font-medium"
                      style={{
                        color: isActive ? '#FFFFFF' : colors.nachtblauw,
                      }}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Setting filter */}
          <View className="mb-4">
            <View className="mb-2 flex-row items-center">
              <Home size={16} color="#6B7C8F" strokeWidth={2} />
              <Text className="ml-2 text-sm font-semibold" style={{ color: '#6B7C8F' }}>
                Omgeving
              </Text>
            </View>
            <View className="flex-row">
              {SETTING_OPTIONS.map((option) => {
                const isActive = settingFilter === option.value;
                const Icon = option.icon;
                return (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => toggleFilter(settingFilter, option.value, setSettingFilter)}
                    activeOpacity={0.7}
                    className="mr-2 flex-row items-center px-4 py-2"
                    style={{
                      backgroundColor: isActive
                        ? colors.salie.DEFAULT
                        : colors.zand.DEFAULT,
                      borderRadius: organic.card,
                    }}
                  >
                    <Icon
                      size={14}
                      color={isActive ? '#FFFFFF' : colors.nachtblauw}
                      strokeWidth={2}
                    />
                    <Text
                      className="ml-1.5 text-sm font-medium"
                      style={{
                        color: isActive ? '#FFFFFF' : colors.nachtblauw,
                      }}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Count */}
          <Text className="text-xs" style={{ color: '#9CA3AF' }}>
            {filteredIdeas.length} date-idee{filteredIdeas.length !== 1 ? 'en' : ''} gevonden
          </Text>
        </View>

        {/* Spin button or result */}
        <View className="items-center px-6 pt-6">
          {!currentIdea && !spinning && (
            <TouchableOpacity
              onPress={spin}
              activeOpacity={0.8}
              disabled={filteredIdeas.length === 0}
              className="h-40 w-40 items-center justify-center rounded-full"
              style={{
                backgroundColor:
                  filteredIdeas.length > 0
                    ? colors.terracotta.DEFAULT
                    : colors.zand.dark,
              }}
            >
              <Shuffle size={40} color="#FFFFFF" strokeWidth={1.5} />
              <Text className="mt-2 text-lg font-bold text-white">Draai!</Text>
            </TouchableOpacity>
          )}

          {spinning && (
            <View
              className="h-40 w-40 items-center justify-center rounded-full"
              style={{ backgroundColor: colors.terracotta.DEFAULT + '20' }}
            >
              <Shuffle size={40} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
              <Text
                className="mt-2 text-sm font-semibold"
                style={{ color: colors.terracotta.DEFAULT }}
              >
                Draaien...
              </Text>
            </View>
          )}

          {currentIdea && !spinning && (
            <View className="w-full">
              {/* Result card */}
              <View
                className="w-full p-6"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: organic.card,
                  ...warmShadow,
                }}
              >
                <Text
                  className="text-xl font-bold"
                  style={{ color: colors.nachtblauw }}
                >
                  {currentIdea.title}
                </Text>
                <Text
                  className="mt-3 text-base leading-6"
                  style={{ color: '#6B7C8F' }}
                >
                  {currentIdea.description}
                </Text>

                {/* Tags */}
                <View className="mt-4 flex-row flex-wrap">
                  <View
                    className="mr-2 rounded-full px-3 py-1"
                    style={{ backgroundColor: colors.goud.DEFAULT + '15' }}
                  >
                    <Text className="text-xs font-medium" style={{ color: colors.goud.dark }}>
                      {currentIdea.budget}
                    </Text>
                  </View>
                  <View
                    className="mr-2 rounded-full px-3 py-1"
                    style={{ backgroundColor: colors.oceaan.DEFAULT + '15' }}
                  >
                    <Text className="text-xs font-medium" style={{ color: colors.oceaan.dark }}>
                      {currentIdea.duration.replace('-', ' ')}
                    </Text>
                  </View>
                  <View
                    className="rounded-full px-3 py-1"
                    style={{ backgroundColor: colors.salie.DEFAULT + '15' }}
                  >
                    <Text className="text-xs font-medium" style={{ color: colors.salie.dark }}>
                      {currentIdea.setting}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Action buttons */}
              <View className="mt-4 flex-row">
                <TouchableOpacity
                  onPress={spin}
                  activeOpacity={0.8}
                  className="mr-2 flex-1 flex-row items-center justify-center py-3.5"
                  style={{ backgroundColor: colors.zand.DEFAULT, borderRadius: organic.card }}
                >
                  <RotateCcw size={18} color={colors.nachtblauw} strokeWidth={2} />
                  <Text
                    className="ml-2 text-sm font-semibold"
                    style={{ color: colors.nachtblauw }}
                  >
                    Opnieuw draaien
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
