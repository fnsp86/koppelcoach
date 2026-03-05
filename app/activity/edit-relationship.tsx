import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, organic } from '@/lib/theme';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';
import { ArrowLeft, Heart, Home, Diamond, Users, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const RELATIONSHIP_TYPES = [
  { id: 'dating', label: 'Daten', icon: Heart, color: colors.terracotta.DEFAULT },
  { id: 'relationship', label: 'In een relatie', icon: Heart, color: colors.terracotta.DEFAULT },
  { id: 'engaged', label: 'Verloofd', icon: Diamond, color: colors.goud.DEFAULT },
  { id: 'married', label: 'Getrouwd', icon: Diamond, color: colors.goud.DEFAULT },
];

const LIVING_OPTIONS = [
  { id: 'yes', label: 'Ja, we wonen samen' },
  { id: 'no', label: 'Nee, nog niet' },
];

export default function EditRelationshipScreen() {
  const storeType = useOnboardingStore((s) => s.relationshipType);
  const storeStartDate = useOnboardingStore((s) => s.relationshipStartDate);
  const storeLiving = useOnboardingStore((s) => s.livingTogether);
  const storeLivingDate = useOnboardingStore((s) => s.livingTogetherDate);
  const storeHasChildren = useOnboardingStore((s) => s.hasChildren);
  const storeChildCount = useOnboardingStore((s) => s.childCount);

  const setRelationshipType = useOnboardingStore((s) => s.setRelationshipType);
  const setRelationshipStartDate = useOnboardingStore((s) => s.setRelationshipStartDate);
  const setLivingTogether = useOnboardingStore((s) => s.setLivingTogether);
  const setLivingTogetherDate = useOnboardingStore((s) => s.setLivingTogetherDate);
  const setChildren = useOnboardingStore((s) => s.setChildren);

  const [relType, setRelType] = useState(storeType ?? '');
  const [living, setLiving] = useState(storeLiving ?? '');

  // Start date inputs
  const startDate = storeStartDate ? new Date(storeStartDate) : null;
  const [startDay, setStartDay] = useState(startDate ? String(startDate.getDate()) : '');
  const [startMonth, setStartMonth] = useState(startDate ? String(startDate.getMonth() + 1) : '');
  const [startYear, setStartYear] = useState(startDate ? String(startDate.getFullYear()) : '');

  // Living together date inputs
  const livingDate = storeLivingDate ? new Date(storeLivingDate) : null;
  const [livingDay, setLivingDay] = useState(livingDate ? String(livingDate.getDate()) : '');
  const [livingMonth, setLivingMonth] = useState(livingDate ? String(livingDate.getMonth() + 1) : '');
  const [livingYear, setLivingYear] = useState(livingDate ? String(livingDate.getFullYear()) : '');

  const [hasKids, setHasKids] = useState(storeHasChildren ?? false);
  const [kidCount, setKidCount] = useState(String(storeChildCount || ''));

  const parseDate = (d: string, m: string, y: string): Date | null => {
    const day = parseInt(d, 10);
    const month = parseInt(m, 10);
    const year = parseInt(y, 10);
    if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
      return null;
    }
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : date;
  };

  const handleSave = async () => {
    if (relType) setRelationshipType(relType);

    const sd = parseDate(startDay, startMonth, startYear);
    if (sd) setRelationshipStartDate(sd.toISOString());

    if (living) setLivingTogether(living);

    if (living === 'yes') {
      const ld = parseDate(livingDay, livingMonth, livingYear);
      if (ld) setLivingTogetherDate(ld.toISOString());
    }

    const count = parseInt(kidCount, 10);
    setChildren(hasKids, hasKids && count > 0 ? count : 0);

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
            Relatie-info
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

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Relationship type */}
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <Text className="text-sm font-medium" style={{ color: '#6B7C8F', marginBottom: 12 }}>
            Relatiestatus
          </Text>
          <View style={{ gap: 8 }}>
            {RELATIONSHIP_TYPES.map((type) => {
              const isSelected = relType === type.id;
              const Icon = type.icon;
              return (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => setRelType(type.id)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    backgroundColor: isSelected ? type.color + '12' : '#FFFFFF',
                    borderWidth: 1.5,
                    borderColor: isSelected ? type.color : colors.zand.dark,
                    borderRadius: organic.card,
                  }}
                >
                  <Icon size={18} color={isSelected ? type.color : '#9CA3AF'} strokeWidth={1.8} />
                  <Text
                    className="ml-3 text-base font-medium"
                    style={{ color: isSelected ? colors.nachtblauw : '#6B7C8F', flex: 1 }}
                  >
                    {type.label}
                  </Text>
                  {isSelected && <Check size={18} color={type.color} strokeWidth={2} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Relationship start date */}
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <Text className="text-sm font-medium" style={{ color: '#6B7C8F', marginBottom: 8 }}>
            Samen sinds
          </Text>
          <View className="flex-row gap-2">
            <View className="flex-1">
              <Text className="mb-1 text-xs" style={{ color: '#9CA3AF' }}>Dag</Text>
              <TextInput
                value={startDay}
                onChangeText={setStartDay}
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
              <Text className="mb-1 text-xs" style={{ color: '#9CA3AF' }}>Maand</Text>
              <TextInput
                value={startMonth}
                onChangeText={setStartMonth}
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
              <Text className="mb-1 text-xs" style={{ color: '#9CA3AF' }}>Jaar</Text>
              <TextInput
                value={startYear}
                onChangeText={setStartYear}
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

        {/* Living together */}
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <Text className="text-sm font-medium" style={{ color: '#6B7C8F', marginBottom: 12 }}>
            Wonen jullie samen?
          </Text>
          <View style={{ gap: 8 }}>
            {LIVING_OPTIONS.map((opt) => {
              const isSelected = living === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setLiving(opt.id)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    backgroundColor: isSelected ? colors.salie.DEFAULT + '12' : '#FFFFFF',
                    borderWidth: 1.5,
                    borderColor: isSelected ? colors.salie.DEFAULT : colors.zand.dark,
                    borderRadius: organic.card,
                  }}
                >
                  <Home size={18} color={isSelected ? colors.salie.DEFAULT : '#9CA3AF'} strokeWidth={1.8} />
                  <Text
                    className="ml-3 text-base font-medium"
                    style={{ color: isSelected ? colors.nachtblauw : '#6B7C8F', flex: 1 }}
                  >
                    {opt.label}
                  </Text>
                  {isSelected && <Check size={18} color={colors.salie.DEFAULT} strokeWidth={2} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Living together date */}
        {living === 'yes' && (
          <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
            <Text className="text-sm font-medium" style={{ color: '#6B7C8F', marginBottom: 8 }}>
              Samenwonen sinds
            </Text>
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Text className="mb-1 text-xs" style={{ color: '#9CA3AF' }}>Dag</Text>
                <TextInput
                  value={livingDay}
                  onChangeText={setLivingDay}
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
                <Text className="mb-1 text-xs" style={{ color: '#9CA3AF' }}>Maand</Text>
                <TextInput
                  value={livingMonth}
                  onChangeText={setLivingMonth}
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
                <Text className="mb-1 text-xs" style={{ color: '#9CA3AF' }}>Jaar</Text>
                <TextInput
                  value={livingYear}
                  onChangeText={setLivingYear}
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
        )}

        {/* Children */}
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <Text className="text-sm font-medium" style={{ color: '#6B7C8F', marginBottom: 12 }}>
            Hebben jullie kinderen?
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              onPress={() => setHasKids(true)}
              activeOpacity={0.7}
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 14,
                backgroundColor: hasKids ? colors.salie.DEFAULT + '12' : '#FFFFFF',
                borderWidth: 1.5,
                borderColor: hasKids ? colors.salie.DEFAULT : colors.zand.dark,
                borderRadius: organic.card,
              }}
            >
              <Text
                className="text-base font-medium"
                style={{ color: hasKids ? colors.nachtblauw : '#6B7C8F' }}
              >
                Ja
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setHasKids(false); setKidCount(''); }}
              activeOpacity={0.7}
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 14,
                backgroundColor: !hasKids ? colors.salie.DEFAULT + '12' : '#FFFFFF',
                borderWidth: 1.5,
                borderColor: !hasKids ? colors.salie.DEFAULT : colors.zand.dark,
                borderRadius: organic.card,
              }}
            >
              <Text
                className="text-base font-medium"
                style={{ color: !hasKids ? colors.nachtblauw : '#6B7C8F' }}
              >
                Nee
              </Text>
            </TouchableOpacity>
          </View>

          {hasKids && (
            <View style={{ marginTop: 12 }}>
              <Text className="text-xs" style={{ color: '#9CA3AF', marginBottom: 4 }}>
                Aantal kinderen
              </Text>
              <TextInput
                value={kidCount}
                onChangeText={setKidCount}
                keyboardType="number-pad"
                maxLength={2}
                placeholder="0"
                placeholderTextColor="#9CA3AF"
                className="px-4 py-3 text-base"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1.5,
                  borderColor: colors.zand.dark,
                  color: colors.nachtblauw,
                  borderRadius: organic.card,
                  width: 80,
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
