import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/lib/theme';
import { Baby, Smile, Minus, Plus } from 'lucide-react-native';
import { OnboardingProgress } from '@/components/ui/OnboardingProgress';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';

const MONTHS = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December',
];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const YEARS = Array.from({ length: 30 }, (_, i) => currentYear - i);

type ChildDate = { month: number | null; year: number | null };

export default function ChildrenScreen() {
  const storeHasChildren = useOnboardingStore((s) => s.hasChildren);
  const storeChildCount = useOnboardingStore((s) => s.childCount);
  const storeChildDates = useOnboardingStore((s) => s.childBirthDates);
  const setChildren = useOnboardingStore((s) => s.setChildren);
  const setChildBirthDates = useOnboardingStore((s) => s.setChildBirthDates);

  const [hasChildren, setHasChildren] = useState<boolean | null>(storeHasChildren);
  const [count, setCount] = useState(storeChildCount || 1);

  // Parse stored dates
  const initialDates: ChildDate[] = storeChildDates.map((d) => {
    const date = new Date(d);
    return { month: date.getMonth(), year: date.getFullYear() };
  });
  const [childDates, setChildDates] = useState<ChildDate[]>(
    initialDates.length > 0 ? initialDates : [{ month: null, year: null }],
  );

  // Track which picker is open: "month-0", "year-2", etc.
  const [openPicker, setOpenPicker] = useState<string | null>(null);

  // Keep childDates array in sync with count
  const adjustDates = (newCount: number) => {
    setChildDates((prev) => {
      if (newCount > prev.length) {
        return [...prev, ...Array.from({ length: newCount - prev.length }, () => ({ month: null, year: null }))];
      }
      return prev.slice(0, newCount);
    });
  };

  const updateChildDate = (index: number, field: 'month' | 'year', value: number) => {
    setChildDates((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      // Reset month if year is current year and month is in future
      if (field === 'year' && value === currentYear && updated[index].month !== null && updated[index].month! > currentMonth) {
        updated[index].month = null;
      }
      return updated;
    });
    setOpenPicker(null);
  };

  const allDatesValid = childDates.slice(0, count).every((d) => d.month !== null && d.year !== null);
  const canProceed = hasChildren === false || (hasChildren === true && allDatesValid);

  const handleNext = () => {
    if (hasChildren === null) return;
    setChildren(hasChildren, hasChildren ? count : 0);
    if (hasChildren && allDatesValid) {
      const dates = childDates.slice(0, count).map((d) => new Date(d.year!, d.month!, 1).toISOString());
      setChildBirthDates(dates);
    } else {
      setChildBirthDates([]);
    }
    router.push('/(onboarding)/goals');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <OnboardingProgress step={5} />

        <View style={{ marginTop: 48 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.nachtblauw }}>
            Hebben jullie kinderen?
          </Text>
          <Text style={{ color: '#6B7C8F', fontSize: 14, marginTop: 8 }}>
            We stemmen activiteiten af op jullie gezinssituatie
          </Text>
        </View>

        <View style={{ marginTop: 32, gap: 12 }}>
          <TouchableOpacity
            onPress={() => setHasChildren(true)}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 16,
              padding: 18,
              backgroundColor: hasChildren === true ? colors.salie.DEFAULT + '10' : '#FFFFFF',
              borderWidth: hasChildren === true ? 2 : 1,
              borderColor: hasChildren === true ? colors.salie.DEFAULT : colors.zand.DEFAULT,
            }}
          >
            <View
              style={{
                width: 48, height: 48, borderRadius: 14,
                backgroundColor: colors.salie.DEFAULT + '15',
                alignItems: 'center', justifyContent: 'center', marginRight: 16,
              }}
            >
              <Baby size={22} color={colors.salie.DEFAULT} strokeWidth={1.5} />
            </View>
            <Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: colors.nachtblauw }}>
              Ja, we hebben kinderen
            </Text>
            <View
              style={{
                width: 22, height: 22, borderRadius: 11, borderWidth: 2,
                borderColor: hasChildren === true ? colors.salie.DEFAULT : '#D1D5DB',
                backgroundColor: hasChildren === true ? colors.salie.DEFAULT : 'transparent',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              {hasChildren === true && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF' }} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setHasChildren(false)}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 16,
              padding: 18,
              backgroundColor: hasChildren === false ? colors.oceaan.DEFAULT + '10' : '#FFFFFF',
              borderWidth: hasChildren === false ? 2 : 1,
              borderColor: hasChildren === false ? colors.oceaan.DEFAULT : colors.zand.DEFAULT,
            }}
          >
            <View
              style={{
                width: 48, height: 48, borderRadius: 14,
                backgroundColor: colors.oceaan.DEFAULT + '15',
                alignItems: 'center', justifyContent: 'center', marginRight: 16,
              }}
            >
              <Smile size={22} color={colors.oceaan.DEFAULT} strokeWidth={1.5} />
            </View>
            <Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: colors.nachtblauw }}>
              Nee, (nog) geen kinderen
            </Text>
            <View
              style={{
                width: 22, height: 22, borderRadius: 11, borderWidth: 2,
                borderColor: hasChildren === false ? colors.oceaan.DEFAULT : '#D1D5DB',
                backgroundColor: hasChildren === false ? colors.oceaan.DEFAULT : 'transparent',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              {hasChildren === false && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF' }} />}
            </View>
          </TouchableOpacity>
        </View>

        {hasChildren === true && (
          <View style={{ marginTop: 24 }}>
            {/* Counter */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#6B7C8F', marginBottom: 12 }}>
                Hoeveel kinderen?
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                <TouchableOpacity
                  onPress={() => { const n = Math.max(1, count - 1); setCount(n); adjustDates(n); }}
                  style={{
                    height: 40, width: 40, alignItems: 'center', justifyContent: 'center',
                    borderRadius: 20, backgroundColor: colors.zand.DEFAULT,
                  }}
                >
                  <Minus size={18} color={colors.nachtblauw} strokeWidth={2} />
                </TouchableOpacity>
                <Text style={{ fontSize: 28, fontWeight: '700', color: colors.nachtblauw }}>
                  {count}
                </Text>
                <TouchableOpacity
                  onPress={() => { const n = Math.min(10, count + 1); setCount(n); adjustDates(n); }}
                  style={{
                    height: 40, width: 40, alignItems: 'center', justifyContent: 'center',
                    borderRadius: 20, backgroundColor: colors.zand.DEFAULT,
                  }}
                >
                  <Plus size={18} color={colors.nachtblauw} strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Birth dates per child */}
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.nachtblauw, marginBottom: 12 }}>
              Wanneer zijn ze geboren?
            </Text>

            {Array.from({ length: count }, (_, i) => {
              const childDate = childDates[i] ?? { month: null, year: null };
              const monthPickerKey = `month-${i}`;
              const yearPickerKey = `year-${i}`;

              return (
                <View key={i} style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 13, fontWeight: '500', color: '#6B7C8F', marginBottom: 8 }}>
                    Kind {i + 1}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    {/* Month */}
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        onPress={() => setOpenPicker(openPicker === monthPickerKey ? null : monthPickerKey)}
                        activeOpacity={0.7}
                        style={{
                          borderRadius: 12,
                          paddingHorizontal: 14,
                          paddingVertical: 14,
                          backgroundColor: '#FFFFFF',
                          borderWidth: childDate.month !== null ? 2 : 1,
                          borderColor: childDate.month !== null ? colors.salie.DEFAULT : colors.zand.DEFAULT,
                        }}
                      >
                        <Text style={{
                          fontSize: 14,
                          fontWeight: childDate.month !== null ? '600' : '400',
                          color: childDate.month !== null ? colors.nachtblauw : '#9CA3AF',
                          textAlign: 'center',
                        }}>
                          {childDate.month !== null ? MONTHS[childDate.month] : 'Maand'}
                        </Text>
                      </TouchableOpacity>

                      {openPicker === monthPickerKey && (
                        <View style={{
                          marginTop: 4,
                          backgroundColor: '#FFFFFF',
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: colors.zand.DEFAULT,
                          maxHeight: 180,
                          overflow: 'hidden',
                        }}>
                          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                            {MONTHS.map((month, mi) => {
                              const disabled = childDate.year === currentYear && mi > currentMonth;
                              return (
                                <TouchableOpacity
                                  key={month}
                                  onPress={() => { if (!disabled) updateChildDate(i, 'month', mi); }}
                                  activeOpacity={disabled ? 1 : 0.6}
                                  style={{
                                    paddingHorizontal: 14, paddingVertical: 10,
                                    backgroundColor: childDate.month === mi ? colors.salie.DEFAULT + '10' : 'transparent',
                                    borderBottomWidth: mi < 11 ? 1 : 0, borderBottomColor: colors.zand.light,
                                  }}
                                >
                                  <Text style={{
                                    fontSize: 14,
                                    color: disabled ? '#D1D5DB' : childDate.month === mi ? colors.salie.DEFAULT : colors.nachtblauw,
                                    fontWeight: childDate.month === mi ? '600' : '400',
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

                    {/* Year */}
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        onPress={() => setOpenPicker(openPicker === yearPickerKey ? null : yearPickerKey)}
                        activeOpacity={0.7}
                        style={{
                          borderRadius: 12,
                          paddingHorizontal: 14,
                          paddingVertical: 14,
                          backgroundColor: '#FFFFFF',
                          borderWidth: childDate.year !== null ? 2 : 1,
                          borderColor: childDate.year !== null ? colors.salie.DEFAULT : colors.zand.DEFAULT,
                        }}
                      >
                        <Text style={{
                          fontSize: 14,
                          fontWeight: childDate.year !== null ? '600' : '400',
                          color: childDate.year !== null ? colors.nachtblauw : '#9CA3AF',
                          textAlign: 'center',
                        }}>
                          {childDate.year !== null ? String(childDate.year) : 'Jaar'}
                        </Text>
                      </TouchableOpacity>

                      {openPicker === yearPickerKey && (
                        <View style={{
                          marginTop: 4,
                          backgroundColor: '#FFFFFF',
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: colors.zand.DEFAULT,
                          maxHeight: 180,
                          overflow: 'hidden',
                        }}>
                          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                            {YEARS.map((year, yi) => (
                              <TouchableOpacity
                                key={year}
                                onPress={() => updateChildDate(i, 'year', year)}
                                activeOpacity={0.6}
                                style={{
                                  paddingHorizontal: 14, paddingVertical: 10,
                                  backgroundColor: childDate.year === year ? colors.salie.DEFAULT + '10' : 'transparent',
                                  borderBottomWidth: yi < YEARS.length - 1 ? 1 : 0, borderBottomColor: colors.zand.light,
                                }}
                              >
                                <Text style={{
                                  fontSize: 14,
                                  color: childDate.year === year ? colors.salie.DEFAULT : colors.nachtblauw,
                                  fontWeight: childDate.year === year ? '600' : '400',
                                }}>
                                  {year}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={{ marginTop: 32 }}>
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
