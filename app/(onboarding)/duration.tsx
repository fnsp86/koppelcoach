import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';
import { OnboardingProgress } from '@/components/ui/OnboardingProgress';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';

const MONTHS = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December',
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

// Generate years from current year back to 1970
const YEARS = Array.from({ length: currentYear - 1969 }, (_, i) => currentYear - i);

export default function DurationScreen() {
  const storeDate = useOnboardingStore((s) => s.relationshipStartDate);
  const setRelationshipStartDate = useOnboardingStore((s) => s.setRelationshipStartDate);
  const setDuration = useOnboardingStore((s) => s.setDuration);

  // Parse stored date or default to null
  const parsed = storeDate ? new Date(storeDate) : null;
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    parsed ? parsed.getMonth() : null,
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(
    parsed ? parsed.getFullYear() : null,
  );
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);

  const isValid = selectedMonth !== null && selectedYear !== null;

  // Don't allow future dates
  const isMonthDisabled = (month: number) => {
    if (selectedYear === null) return false;
    if (selectedYear === currentYear && month > currentMonth) return true;
    return false;
  };

  const handleNext = () => {
    if (!isValid) return;
    // Store as ISO date string (first of month)
    const date = new Date(selectedYear!, selectedMonth!, 1);
    setRelationshipStartDate(date.toISOString());

    // Also compute duration for backwards compat
    const now = new Date();
    const diffYears = (now.getTime() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    let durationId = '<1';
    if (diffYears >= 20) durationId = '20+';
    else if (diffYears >= 10) durationId = '10-20';
    else if (diffYears >= 5) durationId = '5-10';
    else if (diffYears >= 2) durationId = '2-5';
    else if (diffYears >= 1) durationId = '1-2';
    setDuration(durationId);

    router.push('/(onboarding)/living');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      <View style={{ flex: 1, paddingHorizontal: 32 }}>
        <OnboardingProgress step={3} />

        <View style={{ marginTop: 48 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.nachtblauw }}>
            Wanneer zijn jullie samen gekomen?
          </Text>
          <Text style={{ color: '#6B7C8F', fontSize: 14, marginTop: 8 }}>
            Dit wordt automatisch toegevoegd aan jullie momenten
          </Text>
        </View>

        {/* Month selector */}
        <View style={{ marginTop: 28 }}>
          <TouchableOpacity
            onPress={() => { setShowMonths(!showMonths); setShowYears(false); }}
            activeOpacity={0.7}
            style={{
              borderRadius: 14,
              paddingHorizontal: 20,
              paddingVertical: 16,
              backgroundColor: '#FFFFFF',
              borderWidth: selectedMonth !== null ? 2 : 1,
              borderColor: selectedMonth !== null ? colors.terracotta.DEFAULT : colors.zand.DEFAULT,
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
              maxHeight: 220,
            }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {MONTHS.map((month, i) => {
                  const disabled = isMonthDisabled(i);
                  const isSelected = selectedMonth === i;
                  return (
                    <TouchableOpacity
                      key={month}
                      onPress={() => {
                        if (!disabled) {
                          setSelectedMonth(i);
                          setShowMonths(false);
                        }
                      }}
                      activeOpacity={disabled ? 1 : 0.6}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                        backgroundColor: isSelected ? colors.terracotta.DEFAULT + '10' : 'transparent',
                        borderBottomWidth: i < 11 ? 1 : 0,
                        borderBottomColor: colors.zand.light,
                      }}
                    >
                      <Text style={{
                        fontSize: 15,
                        fontWeight: isSelected ? '600' : '400',
                        color: disabled ? '#D1D5DB' : isSelected ? colors.terracotta.DEFAULT : colors.nachtblauw,
                      }}>
                        {month}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Year selector */}
        <View style={{ marginTop: 12 }}>
          <TouchableOpacity
            onPress={() => { setShowYears(!showYears); setShowMonths(false); }}
            activeOpacity={0.7}
            style={{
              borderRadius: 14,
              paddingHorizontal: 20,
              paddingVertical: 16,
              backgroundColor: '#FFFFFF',
              borderWidth: selectedYear !== null ? 2 : 1,
              borderColor: selectedYear !== null ? colors.terracotta.DEFAULT : colors.zand.DEFAULT,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
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
              maxHeight: 220,
            }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {YEARS.map((year, i) => {
                  const isSelected = selectedYear === year;
                  return (
                    <TouchableOpacity
                      key={year}
                      onPress={() => {
                        setSelectedYear(year);
                        setShowYears(false);
                        // Reset month if it becomes invalid
                        if (year === currentYear && selectedMonth !== null && selectedMonth > currentMonth) {
                          setSelectedMonth(null);
                        }
                      }}
                      activeOpacity={0.6}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                        backgroundColor: isSelected ? colors.terracotta.DEFAULT + '10' : 'transparent',
                        borderBottomWidth: i < YEARS.length - 1 ? 1 : 0,
                        borderBottomColor: colors.zand.light,
                      }}
                    >
                      <Text style={{
                        fontSize: 15,
                        fontWeight: isSelected ? '600' : '400',
                        color: isSelected ? colors.terracotta.DEFAULT : colors.nachtblauw,
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

        {/* Duration display */}
        {isValid && (
          <View style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 14,
            backgroundColor: colors.salie.DEFAULT + '10',
            borderWidth: 1,
            borderColor: colors.salie.DEFAULT + '20',
          }}>
            <Text style={{ fontSize: 14, lineHeight: 20, color: colors.nachtblauw }}>
              {(() => {
                const date = new Date(selectedYear!, selectedMonth!, 1);
                const now = new Date();
                const diffMs = now.getTime() - date.getTime();
                const diffYears = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
                const diffMonths = Math.floor((diffMs % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
                if (diffYears === 0 && diffMonths === 0) return 'Net samen - wat een mooie start!';
                if (diffYears === 0) return `${diffMonths} ${diffMonths === 1 ? 'maand' : 'maanden'} samen - een mooie start!`;
                if (diffMonths === 0) return `${diffYears} ${diffYears === 1 ? 'jaar' : 'jaar'} samen - wat een reis!`;
                return `${diffYears} ${diffYears === 1 ? 'jaar' : 'jaar'} en ${diffMonths} ${diffMonths === 1 ? 'maand' : 'maanden'} samen!`;
              })()}
            </Text>
          </View>
        )}

        <View style={{ marginTop: 'auto', marginBottom: 48 }}>
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={{
              backgroundColor: isValid ? colors.terracotta.DEFAULT : colors.zand.dark,
              borderRadius: 16,
              paddingVertical: 18,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>Volgende</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
