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
import { colors, warmShadow, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Sparkles,
  Heart,
  Smile,
  Star,
  Send,
  Check,
} from 'lucide-react-native';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import * as Haptics from 'expo-haptics';

type Category = 'klein' | 'wie-je-bent' | 'grappig' | 'groot';

const CATEGORIES: {
  id: Category;
  label: string;
  color: string;
  icon: typeof Sparkles;
}[] = [
  { id: 'klein', label: 'Iets kleins', color: colors.salie.DEFAULT, icon: Sparkles },
  { id: 'wie-je-bent', label: 'Wie je bent', color: colors.terracotta.DEFAULT, icon: Heart },
  { id: 'grappig', label: 'Iets grappigs', color: colors.goud.DEFAULT, icon: Smile },
  { id: 'groot', label: 'Iets groots', color: colors.oceaan.DEFAULT, icon: Star },
];

export default function GratitudeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const addEntry = useVerhaalStore((s) => s.addEntry);

  const handleSubmit = async () => {
    if (!selectedCategory || message.trim().length === 0) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addEntry({ type: 'gratitude', data: { text: message, category: selectedCategory } });
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
            Opgeslagen!
          </Text>
          <Text
            className="mt-2 text-center text-base leading-6"
            style={{ color: '#6B7C8F' }}
          >
            Je dankbaarheid is bewaard in jullie verhaal.
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
            Dankbaarheid
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
              Waar ben je je partner dankbaar voor vandaag?
            </Text>
            <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>
              Kies een categorie en schrijf een bericht
            </Text>
          </View>

          {/* Category grid - 2x2 */}
          <View className="mt-6 px-6">
            <View className="flex-row">
              {CATEGORIES.slice(0, 2).map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const Icon = cat.icon;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    activeOpacity={0.7}
                    className="mr-3 flex-1 items-center p-5"
                    style={{
                      backgroundColor: isSelected ? cat.color : cat.color + '10',
                      borderWidth: isSelected ? 0 : 1.5,
                      borderColor: isSelected ? 'transparent' : cat.color + '30',
                      borderRadius: organic.card,
                    }}
                  >
                    <Icon
                      size={28}
                      color={isSelected ? '#FFFFFF' : cat.color}
                      strokeWidth={1.5}
                    />
                    <Text
                      className="mt-2 text-sm font-semibold"
                      style={{ color: isSelected ? '#FFFFFF' : cat.color }}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View className="mt-3 flex-row">
              {CATEGORIES.slice(2, 4).map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const Icon = cat.icon;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    activeOpacity={0.7}
                    className="mr-3 flex-1 items-center p-5"
                    style={{
                      backgroundColor: isSelected ? cat.color : cat.color + '10',
                      borderWidth: isSelected ? 0 : 1.5,
                      borderColor: isSelected ? 'transparent' : cat.color + '30',
                      borderRadius: organic.card,
                    }}
                  >
                    <Icon
                      size={28}
                      color={isSelected ? '#FFFFFF' : cat.color}
                      strokeWidth={1.5}
                    />
                    <Text
                      className="mt-2 text-sm font-semibold"
                      style={{ color: isSelected ? '#FFFFFF' : cat.color }}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Text input */}
          <View className="mx-6 mt-6">
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Schrijf je bericht..."
              placeholderTextColor="#9CA3AF"
              multiline
              className="px-4 py-3 text-base"
              style={{
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

          {/* Submit */}
          <View className="mx-6 mt-4">
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              className="flex-row items-center justify-center py-4"
              style={{
                backgroundColor:
                  selectedCategory && message.trim().length > 0
                    ? colors.terracotta.DEFAULT
                    : colors.zand.dark,
                borderRadius: organic.card,
              }}
            >
              <Send size={18} color="#FFFFFF" strokeWidth={2} />
              <Text className="ml-2 text-base font-semibold text-white">
                Verstuur
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
