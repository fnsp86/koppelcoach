import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, warmShadow, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Lightbulb } from 'lucide-react-native';
import { WarmCard } from '@/components/ui/WarmCard';
import { GradientHeader } from '@/components/ui/GradientHeader';
import {
  RELATIONSHIP_TIPS,
  getTipOfTheDay,
  getTipsByCategory,
  CATEGORY_LABELS,
  type TipCategory,
} from '@/content/relationship-tips';

type FilterOption = TipCategory | null;

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
  { value: null, label: 'Alles' },
  { value: 'communicatie', label: 'Communicatie' },
  { value: 'intimiteit', label: 'Intimiteit' },
  { value: 'conflict', label: 'Conflict' },
  { value: 'dagelijks', label: 'Dagelijks' },
  { value: 'groei', label: 'Groei' },
  { value: 'plezier', label: 'Plezier' },
];

const CATEGORY_COLORS: Record<TipCategory, string> = {
  communicatie: colors.oceaan.DEFAULT,
  intimiteit: '#D4728C',
  conflict: colors.terracotta.DEFAULT,
  dagelijks: colors.salie.DEFAULT,
  groei: colors.goud.DEFAULT,
  plezier: colors.oceaan.dark,
};

export default function TipsScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>(null);

  const tipOfTheDay = useMemo(() => getTipOfTheDay(), []);
  const filteredTips = useMemo(() => getTipsByCategory(activeFilter), [activeFilter]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <GradientHeader
        title="Tips"
        rightElement={
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.zand.DEFAULT }}
          >
            <X size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
        }
        height={100}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Tip van de dag */}
        <View className="px-6 pt-4">
          <View
            className="overflow-hidden p-5"
            style={{
              borderRadius: organic.card,
              ...warmShadow,
            }}
          >
            <LinearGradient
              colors={[CATEGORY_COLORS[tipOfTheDay.category] + '18', '#FFFFFF']}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: organic.card,
              }}
            />
            <View className="flex-row items-center">
              <View
                className="h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.goud.DEFAULT + '20' }}
              >
                <Lightbulb size={20} color={colors.goud.DEFAULT} strokeWidth={1.8} />
              </View>
              <View
                className="ml-3 rounded-full px-3 py-1"
                style={{ backgroundColor: colors.goud.DEFAULT + '15' }}
              >
                <Text className="text-xs font-semibold" style={{ color: colors.goud.dark }}>
                  Tip van de dag
                </Text>
              </View>
            </View>
            <Text
              className="mt-4 text-lg font-bold"
              style={{ color: colors.nachtblauw }}
            >
              {tipOfTheDay.title}
            </Text>
            <Text
              className="mt-2 text-sm leading-5"
              style={{ color: '#6B7C8F' }}
            >
              {tipOfTheDay.content}
            </Text>
            <Text
              className="mt-3 text-sm font-semibold"
              style={{ color: colors.terracotta.DEFAULT }}
            >
              Probeer vandaag: {tipOfTheDay.actionable}
            </Text>
          </View>
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 4 }}
        >
          {FILTER_OPTIONS.map((option) => {
            const isActive = activeFilter === option.value;
            return (
              <TouchableOpacity
                key={option.label}
                onPress={() => setActiveFilter(option.value)}
                activeOpacity={0.7}
                className="mr-2 px-4 py-2"
                style={{
                  backgroundColor: isActive
                    ? colors.terracotta.DEFAULT
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
        </ScrollView>

        {/* Tips list */}
        <View className="mt-2 px-6">
          {filteredTips.map((tip) => {
            const categoryColor = CATEGORY_COLORS[tip.category];
            return (
              <WarmCard
                key={tip.id}
                className="mb-3"
                accentColor={categoryColor}
              >
                <View className="flex-row items-center justify-between">
                  <Text
                    className="flex-1 text-base font-bold"
                    style={{ color: colors.nachtblauw }}
                  >
                    {tip.title}
                  </Text>
                  <View
                    className="ml-2 rounded-full px-2.5 py-1"
                    style={{ backgroundColor: categoryColor + '12' }}
                  >
                    <Text
                      className="text-xs font-medium"
                      style={{ color: categoryColor }}
                    >
                      {CATEGORY_LABELS[tip.category]}
                    </Text>
                  </View>
                </View>
                <Text
                  className="mt-2 text-sm leading-5"
                  style={{ color: '#6B7C8F' }}
                >
                  {tip.content}
                </Text>
                <Text
                  className="mt-3 text-sm font-semibold"
                  style={{ color: colors.terracotta.DEFAULT }}
                >
                  Probeer vandaag: {tip.actionable}
                </Text>
              </WarmCard>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
