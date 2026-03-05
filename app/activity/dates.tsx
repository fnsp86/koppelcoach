import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, warmShadow, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Shuffle, Home, TreePine, Utensils } from 'lucide-react-native';
import { GradientHeader } from '@/components/ui/GradientHeader';
import { WarmCard } from '@/components/ui/WarmCard';
import { dateIdeas, type Setting } from '@/content/date-ideas';

type FilterOption = Setting | null;

const FILTER_OPTIONS: { value: FilterOption; label: string; icon: typeof Home }[] = [
  { value: null, label: 'Alles', icon: Home },
  { value: 'thuis', label: 'Thuis', icon: Home },
  { value: 'buiten', label: 'Buiten', icon: TreePine },
  { value: 'uit', label: 'Uit', icon: Utensils },
];

const SETTING_COLORS: Record<Setting, string> = {
  thuis: colors.salie.DEFAULT,
  buiten: colors.oceaan.DEFAULT,
  uit: colors.goud.DEFAULT,
};

const SETTING_LABELS: Record<Setting, string> = {
  thuis: 'Thuis',
  buiten: 'Buiten',
  uit: 'Uit',
};

const BUDGET_LABELS: Record<string, string> = {
  gratis: 'Gratis',
  goedkoop: 'Goedkoop',
  uitgebreid: 'Uitgebreid',
};

export default function DatesScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>(null);
  const [surpriseIdea, setSurpriseIdea] = useState<typeof dateIdeas[number] | null>(null);

  const filteredIdeas = useMemo(() => {
    if (!activeFilter) return dateIdeas;
    return dateIdeas.filter((idea) => idea.setting === activeFilter);
  }, [activeFilter]);

  const pickRandom = () => {
    const pool = filteredIdeas.length > 0 ? filteredIdeas : dateIdeas;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setSurpriseIdea(pool[randomIndex]);
  };

  const dismissSurprise = () => {
    setSurpriseIdea(null);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <GradientHeader
        title={"Date-idee\u00ebn"}
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
        {/* Verrassingsdate button */}
        <View className="px-6 pt-4">
          <TouchableOpacity
            onPress={pickRandom}
            activeOpacity={0.8}
            className="flex-row items-center justify-center py-4"
            style={{
              backgroundColor: colors.terracotta.DEFAULT,
              borderRadius: organic.card,
            }}
          >
            <Shuffle size={20} color="#FFFFFF" strokeWidth={2} />
            <Text className="ml-2 text-base font-semibold text-white">
              Verrassingsdate
            </Text>
          </TouchableOpacity>
        </View>

        {/* Surprise result */}
        {surpriseIdea && (
          <View className="mx-6 mt-4">
            <View
              className="overflow-hidden p-5"
              style={{
                borderRadius: organic.card,
                ...warmShadow,
              }}
            >
              <LinearGradient
                colors={[colors.terracotta.DEFAULT + '12', '#FFFFFF']}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: organic.card,
                }}
              />
              <View className="flex-row items-center justify-between">
                <View
                  className="rounded-full px-3 py-1"
                  style={{ backgroundColor: colors.terracotta.DEFAULT + '15' }}
                >
                  <Text className="text-xs font-semibold" style={{ color: colors.terracotta.DEFAULT }}>
                    Jullie verrassingsdate
                  </Text>
                </View>
                <TouchableOpacity onPress={dismissSurprise} activeOpacity={0.7}>
                  <X size={18} color="#9CA3AF" strokeWidth={2} />
                </TouchableOpacity>
              </View>
              <Text
                className="mt-3 text-lg font-bold"
                style={{ color: colors.nachtblauw }}
              >
                {surpriseIdea.title}
              </Text>
              <Text
                className="mt-2 text-sm leading-5"
                style={{ color: '#6B7C8F' }}
              >
                {surpriseIdea.description}
              </Text>
              <View className="mt-3 flex-row flex-wrap">
                <View
                  className="mr-2 rounded-full px-2.5 py-1"
                  style={{ backgroundColor: SETTING_COLORS[surpriseIdea.setting] + '15' }}
                >
                  <Text
                    className="text-xs font-medium"
                    style={{ color: SETTING_COLORS[surpriseIdea.setting] }}
                  >
                    {SETTING_LABELS[surpriseIdea.setting]}
                  </Text>
                </View>
                <View
                  className="mr-2 rounded-full px-2.5 py-1"
                  style={{ backgroundColor: colors.goud.DEFAULT + '15' }}
                >
                  <Text className="text-xs font-medium" style={{ color: colors.goud.dark }}>
                    {BUDGET_LABELS[surpriseIdea.budget]}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 4 }}
        >
          {FILTER_OPTIONS.map((option) => {
            const isActive = activeFilter === option.value;
            const Icon = option.icon;
            return (
              <TouchableOpacity
                key={option.label}
                onPress={() => setActiveFilter(option.value)}
                activeOpacity={0.7}
                className="mr-2 flex-row items-center px-4 py-2"
                style={{
                  backgroundColor: isActive
                    ? colors.salie.DEFAULT
                    : colors.zand.DEFAULT,
                  borderRadius: organic.card,
                }}
              >
                {option.value !== null && (
                  <Icon
                    size={14}
                    color={isActive ? '#FFFFFF' : colors.nachtblauw}
                    strokeWidth={2}
                  />
                )}
                <Text
                  className={option.value !== null ? 'ml-1.5 text-sm font-medium' : 'text-sm font-medium'}
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

        {/* Count */}
        <View className="px-6 pt-2 pb-1">
          <Text className="text-xs" style={{ color: '#9CA3AF' }}>
            {filteredIdeas.length} date-idee{filteredIdeas.length !== 1 ? 'en' : ''}{' '}
            {activeFilter ? `in "${SETTING_LABELS[activeFilter]}"` : ''}
          </Text>
        </View>

        {/* Date ideas list */}
        <View className="px-6">
          {filteredIdeas.map((idea) => {
            const settingColor = SETTING_COLORS[idea.setting];
            return (
              <WarmCard
                key={idea.id}
                className="mb-3"
                accentColor={settingColor}
              >
                <View className="flex-row items-start justify-between">
                  <Text
                    className="flex-1 text-base font-bold"
                    style={{ color: colors.nachtblauw }}
                  >
                    {idea.title}
                  </Text>
                  <View
                    className="ml-2 rounded-full px-2.5 py-1"
                    style={{ backgroundColor: settingColor + '12' }}
                  >
                    <Text
                      className="text-xs font-medium"
                      style={{ color: settingColor }}
                    >
                      {SETTING_LABELS[idea.setting]}
                    </Text>
                  </View>
                </View>
                <Text
                  className="mt-2 text-sm leading-5"
                  style={{ color: '#6B7C8F' }}
                >
                  {idea.description}
                </Text>
                <View className="mt-3 flex-row">
                  <View
                    className="mr-2 rounded-full px-2.5 py-1"
                    style={{ backgroundColor: colors.goud.DEFAULT + '12' }}
                  >
                    <Text className="text-xs font-medium" style={{ color: colors.goud.dark }}>
                      {BUDGET_LABELS[idea.budget]}
                    </Text>
                  </View>
                  <View
                    className="rounded-full px-2.5 py-1"
                    style={{ backgroundColor: colors.oceaan.DEFAULT + '12' }}
                  >
                    <Text className="text-xs font-medium" style={{ color: colors.oceaan.dark }}>
                      {idea.duration.replace('-', ' ')}
                    </Text>
                  </View>
                </View>
              </WarmCard>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
