import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, organic } from '@/lib/theme';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';
import { ArrowLeft, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function EditProfileScreen() {
  const storeName = useOnboardingStore((s) => s.name);
  const storeBirthday = useOnboardingStore((s) => s.birthday);
  const setName = useOnboardingStore((s) => s.setName);
  const setBirthday = useOnboardingStore((s) => s.setBirthday);

  const [name, setNameLocal] = useState(storeName);
  const [dayInput, setDayInput] = useState(
    storeBirthday ? String(new Date(storeBirthday).getDate()) : '',
  );
  const [monthInput, setMonthInput] = useState(
    storeBirthday ? String(new Date(storeBirthday).getMonth() + 1) : '',
  );
  const [yearInput, setYearInput] = useState(
    storeBirthday ? String(new Date(storeBirthday).getFullYear()) : '',
  );

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Naam verplicht', 'Vul je naam in.');
      return;
    }

    setName(name.trim());

    if (dayInput && monthInput && yearInput) {
      const day = parseInt(dayInput, 10);
      const month = parseInt(monthInput, 10);
      const year = parseInt(yearInput, 10);
      if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2100) {
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          setBirthday(date.toISOString());
        }
      }
    }

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
            Profiel bewerken
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
            backgroundColor: colors.terracotta.DEFAULT,
          }}
        >
          <Text className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
            Opslaan
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
            <Text className="text-sm font-medium" style={{ color: '#6B7C8F', marginBottom: 8 }}>
              Naam
            </Text>
            <TextInput
              value={name}
              onChangeText={setNameLocal}
              placeholder="Je naam"
              placeholderTextColor="#9CA3AF"
              className="px-4 py-3.5 text-base"
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1.5,
                borderColor: colors.zand.dark,
                color: colors.nachtblauw,
                borderRadius: organic.card,
              }}
            />
          </View>

          <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
            <Text className="text-sm font-medium" style={{ color: '#6B7C8F', marginBottom: 8 }}>
              Geboortedatum
            </Text>
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Text className="mb-1 text-xs" style={{ color: '#9CA3AF' }}>
                  Dag
                </Text>
                <TextInput
                  value={dayInput}
                  onChangeText={setDayInput}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="dd"
                  placeholderTextColor="#9CA3AF"
                  className="px-3 py-3 text-center text-base"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1.5,
                    borderColor: colors.zand.dark,
                    color: colors.nachtblauw,
                    borderRadius: organic.card,
                  }}
                />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-xs" style={{ color: '#9CA3AF' }}>
                  Maand
                </Text>
                <TextInput
                  value={monthInput}
                  onChangeText={setMonthInput}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="mm"
                  placeholderTextColor="#9CA3AF"
                  className="px-3 py-3 text-center text-base"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1.5,
                    borderColor: colors.zand.dark,
                    color: colors.nachtblauw,
                    borderRadius: organic.card,
                  }}
                />
              </View>
              <View className="flex-1">
                <Text className="mb-1 text-xs" style={{ color: '#9CA3AF' }}>
                  Jaar
                </Text>
                <TextInput
                  value={yearInput}
                  onChangeText={setYearInput}
                  keyboardType="number-pad"
                  maxLength={4}
                  placeholder="jjjj"
                  placeholderTextColor="#9CA3AF"
                  className="px-3 py-3 text-center text-base"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1.5,
                    borderColor: colors.zand.dark,
                    color: colors.nachtblauw,
                    borderRadius: organic.card,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
