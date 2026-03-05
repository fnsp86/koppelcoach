import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Check, BookOpen } from 'lucide-react-native';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import * as Haptics from 'expo-haptics';

const MOOD_TAGS = [
  { id: 'dankbaar', label: 'Dankbaar', color: colors.salie.DEFAULT },
  { id: 'hoopvol', label: 'Hoopvol', color: colors.goud.DEFAULT },
  { id: 'rustig', label: 'Rustig', color: colors.oceaan.DEFAULT },
  { id: 'kwetsbaar', label: 'Kwetsbaar', color: colors.terracotta.DEFAULT },
  { id: 'blij', label: 'Blij', color: '#E8A060' },
];

export default function DagboekEntryScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const addEntry = useVerhaalStore((s) => s.addEntry);

  const handleSubmit = async () => {
    if (!selectedMood || text.trim().length === 0) return;
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addEntry({ type: 'reflection', data: { text: text.trim(), mood_tag: selectedMood } });
    setSubmitted(true);
  };

  if (submitted) {
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
          <Text
            className="mt-6 text-2xl font-bold"
            style={{ color: colors.nachtblauw }}
          >
            Opgeslagen
          </Text>
          <Text
            className="mt-2 text-center text-base leading-6"
            style={{ color: '#6B7C8F' }}
          >
            Je reflectie is bewaard in jullie verhaal.
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
            Dagboek
          </Text>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <View className="px-6 pt-4">
            <Text
              className="text-xl font-bold leading-7"
              style={{ color: colors.nachtblauw }}
            >
              Hoe voelen jullie je?
            </Text>
            <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>
              Kies een gevoel en schrijf wat je bezighoudt
            </Text>
          </View>

          {/* Mood tags */}
          <View className="mt-6 px-6">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {MOOD_TAGS.map((mood) => {
                const isSelected = selectedMood === mood.id;
                return (
                  <TouchableOpacity
                    key={mood.id}
                    onPress={() => setSelectedMood(mood.id)}
                    activeOpacity={0.7}
                    className="rounded-xl px-5 py-3"
                    style={{
                      backgroundColor: isSelected ? mood.color : mood.color + '10',
                      borderWidth: isSelected ? 0 : 1.5,
                      borderColor: isSelected ? 'transparent' : mood.color + '25',
                    }}
                  >
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: isSelected ? '#FFFFFF' : mood.color }}
                    >
                      {mood.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Text input */}
          <View className="mx-6 mt-6">
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Schrijf je gedachten..."
              placeholderTextColor="#9CA3AF"
              multiline
              className="px-4 py-3 text-base"
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1.5,
                borderColor: colors.zand.dark,
                color: colors.nachtblauw,
                minHeight: 160,
                textAlignVertical: 'top',
                borderRadius: organic.card,
              }}
            />
          </View>

          {/* Submit */}
          <View className="mx-6 mt-4">
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              className="flex-row items-center justify-center py-4"
              style={{
                backgroundColor:
                  selectedMood && text.trim().length > 0
                    ? colors.terracotta.DEFAULT
                    : colors.zand.dark,
                borderRadius: organic.card,
              }}
            >
              <BookOpen size={18} color="#FFFFFF" strokeWidth={2} />
              <Text className="ml-2 text-base font-semibold text-white">
                Bewaar in dagboek
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
