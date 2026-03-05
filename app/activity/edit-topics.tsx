import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, organic } from '@/lib/theme';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';
import {
  ArrowLeft,
  Check,
  MessageSquare,
  ShieldAlert,
  Flame,
  Link2,
  TrendingUp,
  Wallet,
  PartyPopper,
  Briefcase,
  Users,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

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

export default function EditTopicsScreen() {
  const storeTopics = useOnboardingStore((s) => s.topics);
  const setTopics = useOnboardingStore((s) => s.setTopics);
  const [selected, setSelected] = useState<string[]>(storeTopics);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleSave = async () => {
    setTopics(selected);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 8,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
          <Text
            className="text-lg font-bold"
            style={{ color: colors.nachtblauw, marginLeft: 12 }}
          >
            Onderwerpen
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          style={{
            height: 36,
            paddingHorizontal: 16,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 18,
            backgroundColor: selected.length > 0 ? colors.terracotta.DEFAULT : colors.zand.dark,
          }}
        >
          <Text className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
            Opslaan
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 24, marginTop: 8 }}>
        <Text className="text-sm" style={{ color: '#6B7C8F' }}>
          Kies de onderwerpen waar jullie aan willen werken. Dit bepaalt welke activiteiten je ziet.
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 10 }}>
          {TOPICS.map((topic) => {
            const isSelected = selected.includes(topic.id);
            const Icon = topic.icon;
            return (
              <TouchableOpacity
                key={topic.id}
                onPress={() => toggle(topic.id)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  backgroundColor: isSelected ? topic.color + '12' : '#FFFFFF',
                  borderWidth: 1.5,
                  borderColor: isSelected ? topic.color : colors.zand.dark,
                  borderRadius: organic.card,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: topic.color + '15',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Icon size={18} color={topic.color} strokeWidth={1.8} />
                </View>
                <Text
                  className="text-base font-medium"
                  style={{ color: colors.nachtblauw, flex: 1 }}
                >
                  {topic.label}
                </Text>
                {isSelected && (
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: topic.color,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check size={14} color="#FFFFFF" strokeWidth={2.5} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
