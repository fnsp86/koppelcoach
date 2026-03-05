import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, organic, gradients, warmShadow } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Plus, Check, Target, X } from 'lucide-react-native';
import {
  useGoalsStore,
  getRecentWeekKeys,
  getCurrentWeekKey,
} from '@/lib/stores/goals-store';
import * as Haptics from 'expo-haptics';

const SUGGESTIONS = [
  'Meer quality time',
  'Vaker samen koken',
  'Wekelijks date-avond',
  'Elke dag een compliment',
  'Samen bewegen',
  'Minder telefoon tijdens eten',
  'Wekelijks check-in doen',
  'Samen een boek lezen',
];

const WEEK_LABELS = ['4w', '3w', '2w', 'Nu'];

export default function DoelenScreen() {
  const { goals, addGoal, toggleWeekCheck, removeGoal } = useGoalsStore();
  const [newGoalText, setNewGoalText] = useState('');
  const [showInput, setShowInput] = useState(false);

  const weekKeys = useMemo(() => getRecentWeekKeys(4), []);
  const currentWeek = useMemo(() => getCurrentWeekKey(), []);

  const handleAdd = async (title: string) => {
    if (title.trim().length === 0) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addGoal(title.trim());
    setNewGoalText('');
    setShowInput(false);
  };

  const handleToggle = async (goalId: string, weekKey: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleWeekCheck(goalId, weekKey);
  };

  const handleRemove = (goalId: string, title: string) => {
    Alert.alert(
      'Doel verwijderen',
      `Weet je zeker dat je "${title}" wilt verwijderen?`,
      [
        { text: 'Annuleren', style: 'cancel' },
        {
          text: 'Verwijderen',
          style: 'destructive',
          onPress: () => removeGoal(goalId),
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <LinearGradient
        colors={gradients.headerSoft}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
      />

      <View className="flex-row items-center px-5 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.zand.DEFAULT }}
        >
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <Text className="ml-3 text-lg font-bold" style={{ color: colors.nachtblauw }}>
          Koppel-doelen
        </Text>
        <View className="flex-1" />
        <TouchableOpacity
          onPress={() => setShowInput(true)}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.terracotta.DEFAULT }}
        >
          <Plus size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Add goal input */}
        {showInput && (
          <View className="mx-6 mt-2 mb-4">
            <View
              className="flex-row items-center p-3"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: organic.card,
                borderWidth: 1.5,
                borderColor: colors.terracotta.DEFAULT + '30',
                ...warmShadow,
              }}
            >
              <TextInput
                value={newGoalText}
                onChangeText={setNewGoalText}
                placeholder="Nieuw doel..."
                placeholderTextColor="#9CA3AF"
                autoFocus
                className="flex-1 text-base"
                style={{ color: colors.nachtblauw }}
                onSubmitEditing={() => handleAdd(newGoalText)}
              />
              <TouchableOpacity
                onPress={() => handleAdd(newGoalText)}
                className="ml-2 h-9 w-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: colors.terracotta.DEFAULT }}
              >
                <Check size={16} color="#FFFFFF" strokeWidth={2.5} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowInput(false);
                  setNewGoalText('');
                }}
                className="ml-1.5 h-9 w-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: colors.zand.DEFAULT }}
              >
                <X size={16} color={colors.nachtblauw} strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Suggestions when no goals */}
        {goals.length === 0 && !showInput && (
          <View className="px-6 pt-4">
            <View className="items-center pb-6">
              <View
                className="h-20 w-20 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.goud.DEFAULT + '15' }}
              >
                <Target size={36} color={colors.goud.DEFAULT} strokeWidth={1.5} />
              </View>
              <Text className="mt-4 text-lg font-bold" style={{ color: colors.nachtblauw }}>
                Stel jullie eerste doel
              </Text>
              <Text className="mt-1 text-center text-sm" style={{ color: '#6B7C8F' }}>
                Kies een suggestie of schrijf je eigen doel
              </Text>
            </View>

            <Text className="mb-3 text-sm font-semibold" style={{ color: '#6B7C8F' }}>
              Suggesties
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => handleAdd(s)}
                  activeOpacity={0.7}
                  className="rounded-xl px-4 py-2.5"
                  style={{
                    backgroundColor: colors.goud.DEFAULT + '10',
                    borderWidth: 1,
                    borderColor: colors.goud.DEFAULT + '20',
                  }}
                >
                  <Text className="text-sm" style={{ color: colors.nachtblauw }}>
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Goals list */}
        {goals.length > 0 && (
          <View className="px-6 pt-2">
            {/* Week headers */}
            <View className="mb-2 flex-row items-center pl-4 pr-2">
              <View className="flex-1" />
              {WEEK_LABELS.map((label, i) => (
                <View key={i} className="w-11 items-center">
                  <Text
                    className="text-xs font-semibold"
                    style={{
                      color: weekKeys[i] === currentWeek ? colors.terracotta.DEFAULT : '#9CA3AF',
                    }}
                  >
                    {label}
                  </Text>
                </View>
              ))}
            </View>

            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                onLongPress={() => handleRemove(goal.id, goal.title)}
                activeOpacity={0.8}
                className="mb-3 flex-row items-center p-4"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: organic.card,
                  ...warmShadow,
                }}
              >
                <View className="mr-3 flex-1">
                  <Text
                    className="text-sm font-semibold"
                    style={{ color: colors.nachtblauw }}
                    numberOfLines={2}
                  >
                    {goal.title}
                  </Text>
                </View>

                {weekKeys.map((weekKey) => {
                  const isChecked = goal.weeklyChecks[weekKey] ?? false;
                  const isCurrent = weekKey === currentWeek;
                  return (
                    <TouchableOpacity
                      key={weekKey}
                      onPress={() => handleToggle(goal.id, weekKey)}
                      className="mx-1 h-8 w-8 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: isChecked
                          ? colors.salie.DEFAULT
                          : isCurrent
                            ? colors.salie.DEFAULT + '12'
                            : colors.zand.DEFAULT,
                        borderWidth: isCurrent && !isChecked ? 1.5 : 0,
                        borderColor: colors.salie.DEFAULT + '30',
                      }}
                    >
                      {isChecked && (
                        <Check size={14} color="#FFFFFF" strokeWidth={2.5} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </TouchableOpacity>
            ))}

            {/* Add suggestion chips below */}
            <View className="mt-4">
              <Text className="mb-2 text-xs font-semibold" style={{ color: '#9CA3AF' }}>
                Meer ideeen
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {SUGGESTIONS.filter((s) => !goals.some((g) => g.title === s)).slice(0, 4).map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => handleAdd(s)}
                    activeOpacity={0.7}
                    className="rounded-lg px-3 py-2"
                    style={{
                      backgroundColor: colors.goud.DEFAULT + '08',
                      borderWidth: 1,
                      borderColor: colors.goud.DEFAULT + '15',
                    }}
                  >
                    <Text className="text-xs" style={{ color: colors.nachtblauw }}>
                      + {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
