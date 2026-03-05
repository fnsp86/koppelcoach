import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';
import {
  MessageSquare,
  ShieldAlert,
  Flame,
  Link2,
  TrendingUp,
  Wallet,
  PartyPopper,
  Briefcase,
  Users,
  Check,
} from 'lucide-react-native';
import { OnboardingProgress } from '@/components/ui/OnboardingProgress';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';

const TOPICS = [
  { id: 'communicatie', label: 'Communicatie', icon: MessageSquare, color: colors.oceaan.DEFAULT },
  { id: 'conflict', label: 'Conflict', icon: ShieldAlert, color: '#E06B50' },
  { id: 'intimiteit', label: 'Sex & Intimiteit', icon: Flame, color: colors.terracotta.DEFAULT },
  { id: 'connectie', label: 'Connectie', icon: Link2, color: colors.salie.DEFAULT },
  { id: 'groei', label: 'Persoonlijke groei', icon: TrendingUp, color: colors.goud.DEFAULT },
  { id: 'geld', label: 'Geld & Financien', icon: Wallet, color: '#6B8E8E' },
  { id: 'plezier', label: 'Plezier & Dates', icon: PartyPopper, color: '#D4728C' },
  { id: 'werk', label: 'Huis & Werk', icon: Briefcase, color: '#7B8794' },
  { id: 'familie', label: 'Familie & Vrienden', icon: Users, color: '#8B7EC8' },
];

export default function GoalsScreen() {
  const storeTopics = useOnboardingStore((s) => s.topics);
  const setTopics = useOnboardingStore((s) => s.setTopics);
  const [selected, setSelected] = useState<string[]>(storeTopics);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleNext = () => {
    if (selected.length === 0) return;
    setTopics(selected);
    router.push('/(onboarding)/partner');
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <View className="flex-1">
        <View className="px-8">
          <OnboardingProgress step={6} />
        </View>

        <View className="mt-12 px-8">
          <Text className="text-2xl font-bold" style={{ color: colors.nachtblauw }}>
            Waar willen jullie aan werken?
          </Text>
          <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>
            Kies een of meer onderwerpen. Je kunt dit later aanpassen.
          </Text>
        </View>

        <ScrollView
          className="flex-1 mt-6"
          contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {TOPICS.map((topic) => {
              const Icon = topic.icon;
              const isSelected = selected.includes(topic.id);
              return (
                <TouchableOpacity
                  key={topic.id}
                  onPress={() => toggle(topic.id)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: isSelected ? topic.color + '15' : '#FFFFFF',
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected ? topic.color : colors.zand.DEFAULT,
                  }}
                >
                  <Icon size={16} color={topic.color} strokeWidth={2} />
                  <Text
                    className="text-sm font-medium"
                    style={{
                      marginLeft: 8,
                      color: isSelected ? topic.color : colors.nachtblauw,
                    }}
                  >
                    {topic.label}
                  </Text>
                  {isSelected && (
                    <View style={{ marginLeft: 6 }}>
                      <Check size={14} color={topic.color} strokeWidth={2.5} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View className="px-8 mb-12">
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={{
              backgroundColor: selected.length > 0 ? colors.terracotta.DEFAULT : colors.zand.dark,
              borderRadius: 16,
              paddingVertical: 18,
              alignItems: 'center',
            }}
          >
            <Text className="text-base font-bold text-white">Volgende</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
