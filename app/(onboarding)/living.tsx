import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';
import { Home, MapPin, Globe } from 'lucide-react-native';
import { OnboardingProgress } from '@/components/ui/OnboardingProgress';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';

const OPTIONS = [
  { id: 'together', label: 'Ja, we wonen samen', icon: Home, color: colors.salie.DEFAULT },
  { id: 'nearby', label: 'Nee, maar dichtbij', icon: MapPin, color: colors.oceaan.DEFAULT },
  { id: 'distance', label: 'Nee, langeafstand', icon: Globe, color: colors.goud.DEFAULT },
];

const MONTHS = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December',
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const YEARS = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear - i);

export default function LivingScreen() {
  const storeValue = useOnboardingStore((s) => s.livingTogether);
  const storeDateValue = useOnboardingStore((s) => s.livingTogetherDate);
  const setLivingTogether = useOnboardingStore((s) => s.setLivingTogether);
  const setLivingTogetherDate = useOnboardingStore((s) => s.setLivingTogetherDate);
  const [selected, setSelected] = useState<string | null>(storeValue);

  const parsed = storeDateValue ? new Date(storeDateValue) : null;
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    parsed ? parsed.getMonth() : null,
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(
    parsed ? parsed.getFullYear() : null,
  );
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);

  const showDatePicker = selected === 'together';
  const dateValid = selectedMonth !== null && selectedYear !== null;
  const canProceed = selected !== null && (!showDatePicker || dateValid);

  const isMonthDisabled = (month: number) => {
    if (selectedYear === null) return false;
    return selectedYear === currentYear && month > currentMonth;
  };

  const handleNext = () => {
    if (!canProceed) return;
    setLivingTogether(selected!);
    if (showDatePicker && dateValid) {
      const date = new Date(selectedYear!, selectedMonth!, 1);
      setLivingTogetherDate(date.toISOString());
    }
    router.push('/(onboarding)/children');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OnboardingProgress step={4} />

        <View style={{ marginTop: 48 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.nachtblauw }}>
            Wonen jullie samen?
          </Text>
          <Text style={{ color: '#6B7C8F', fontSize: 14, marginTop: 8 }}>
            We passen suggesties aan op jullie situatie
          </Text>
        </View>

        <View style={{ marginTop: 32, gap: 12 }}>
          {OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = selected === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelected(option.id)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 16,
                  padding: 18,
                  backgroundColor: isSelected ? option.color + '10' : '#FFFFFF',
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? option.color : colors.zand.DEFAULT,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    backgroundColor: option.color + '15',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}
                >
                  <Icon size={22} color={option.color} strokeWidth={1.5} />
                </View>
                <Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: colors.nachtblauw }}>
                  {option.label}
                </Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    borderWidth: 2,
                    borderColor: isSelected ? option.color : '#D1D5DB',
                    backgroundColor: isSelected ? option.color : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF' }} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Date picker when "together" is selected */}
        {showDatePicker && (
          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.nachtblauw, marginBottom: 12 }}>
              Sinds wanneer wonen jullie samen?
            </Text>

            {/* Month selector */}
            <TouchableOpacity
              onPress={() => { setShowMonths(!showMonths); setShowYears(false); }}
              activeOpacity={0.7}
              style={{
                borderRadius: 14,
                paddingHorizontal: 20,
                paddingVertical: 16,
                backgroundColor: '#FFFFFF',
                borderWidth: selectedMonth !== null ? 2 : 1,
                borderColor: selectedMonth !== null ? colors.salie.DEFAULT : colors.zand.DEFAULT,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 14, color: '#6B7C8F', fontWeight: '500' }}>Maand</Text>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: selectedMonth !== null ? colors.nachtblauw : '#9CA3AF',
              }}>
                {selectedMonth !== null ? MONTHS[selectedMonth] : 'Selecteer'}
              </Text>
            </TouchableOpacity>

            {showMonths && (
              <View style={{
                marginTop: 8,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.zand.DEFAULT,
                overflow: 'hidden',
                maxHeight: 200,
              }}>
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                  {MONTHS.map((month, i) => {
                    const disabled = isMonthDisabled(i);
                    const isSel = selectedMonth === i;
                    return (
                      <TouchableOpacity
                        key={month}
                        onPress={() => { if (!disabled) { setSelectedMonth(i); setShowMonths(false); } }}
                        activeOpacity={disabled ? 1 : 0.6}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 12,
                          backgroundColor: isSel ? colors.salie.DEFAULT + '10' : 'transparent',
                          borderBottomWidth: i < 11 ? 1 : 0,
                          borderBottomColor: colors.zand.light,
                        }}
                      >
                        <Text style={{
                          fontSize: 15,
                          fontWeight: isSel ? '600' : '400',
                          color: disabled ? '#D1D5DB' : isSel ? colors.salie.DEFAULT : colors.nachtblauw,
                        }}>
                          {month}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {/* Year selector */}
            <TouchableOpacity
              onPress={() => { setShowYears(!showYears); setShowMonths(false); }}
              activeOpacity={0.7}
              style={{
                borderRadius: 14,
                paddingHorizontal: 20,
                paddingVertical: 16,
                backgroundColor: '#FFFFFF',
                borderWidth: selectedYear !== null ? 2 : 1,
                borderColor: selectedYear !== null ? colors.salie.DEFAULT : colors.zand.DEFAULT,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 14, color: '#6B7C8F', fontWeight: '500' }}>Jaar</Text>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: selectedYear !== null ? colors.nachtblauw : '#9CA3AF',
              }}>
                {selectedYear !== null ? String(selectedYear) : 'Selecteer'}
              </Text>
            </TouchableOpacity>

            {showYears && (
              <View style={{
                marginTop: 8,
                backgroundColor: '#FFFFFF',
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.zand.DEFAULT,
                overflow: 'hidden',
                maxHeight: 200,
              }}>
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                  {YEARS.map((year, i) => {
                    const isSel = selectedYear === year;
                    return (
                      <TouchableOpacity
                        key={year}
                        onPress={() => {
                          setSelectedYear(year);
                          setShowYears(false);
                          if (year === currentYear && selectedMonth !== null && selectedMonth > currentMonth) {
                            setSelectedMonth(null);
                          }
                        }}
                        activeOpacity={0.6}
                        style={{
                          paddingHorizontal: 20,
                          paddingVertical: 12,
                          backgroundColor: isSel ? colors.salie.DEFAULT + '10' : 'transparent',
                          borderBottomWidth: i < YEARS.length - 1 ? 1 : 0,
                          borderBottomColor: colors.zand.light,
                        }}
                      >
                        <Text style={{
                          fontSize: 15,
                          fontWeight: isSel ? '600' : '400',
                          color: isSel ? colors.salie.DEFAULT : colors.nachtblauw,
                        }}>
                          {year}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </View>
        )}

        <View style={{ marginTop: 40 }}>
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={{
              backgroundColor: canProceed ? colors.terracotta.DEFAULT : colors.zand.dark,
              borderRadius: 16,
              paddingVertical: 18,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>Volgende</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
