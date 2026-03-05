import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, organic, gradients } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import {
  ReflectionPen,
  MilestoneFlag,
  MomentCamera,
} from '@/components/icons/ActivityIcons';
import {
  X,
  Heart,
  Home,
  Diamond,
  Baby,
  Cake,
  Star,
  Camera,
  Check,
  ImageIcon,
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

type EntryType = 'moment' | 'reflection' | 'milestone';

const MOOD_TAGS = ['Blij', 'Dankbaar', 'Verliefd', 'Rustig', 'Hoopvol'] as const;

type MilestoneOption = {
  id: string;
  label: string;
  icon: typeof Heart;
  milestoneType: 'eerste-date' | 'samenwonen' | 'trouwen' | 'kind' | 'verjaardag' | 'custom';
};

const MILESTONE_OPTIONS: MilestoneOption[] = [
  { id: 'eerste-date', label: 'Eerste date', icon: Heart, milestoneType: 'eerste-date' },
  { id: 'samenwonen', label: 'Samenwonen', icon: Home, milestoneType: 'samenwonen' },
  { id: 'trouwen', label: 'Trouwen', icon: Diamond, milestoneType: 'trouwen' },
  { id: 'kind', label: 'Kind', icon: Baby, milestoneType: 'kind' },
  { id: 'verjaardag', label: 'Verjaardag', icon: Cake, milestoneType: 'verjaardag' },
  { id: 'anders', label: 'Anders', icon: Star, milestoneType: 'custom' },
];

function formatDateDutch(date: Date): string {
  const months = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december',
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

type MomentStep = 'choose' | 'compose';

function MomentFlow() {
  const [step, setStep] = useState<MomentStep>('choose');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDateEdit, setShowDateEdit] = useState(false);
  const [dayInput, setDayInput] = useState('');
  const [monthInput, setMonthInput] = useState('');
  const [yearInput, setYearInput] = useState('');
  const store = useVerhaalStore();

  const launchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Toestemming nodig', 'Camera-toegang is nodig om een foto te maken.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (result.canceled) {
      router.back();
      return;
    }

    setImageUri(result.assets[0].uri);
    setStep('compose');
  };

  const launchLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (result.canceled) {
      router.back();
      return;
    }

    setImageUri(result.assets[0].uri);
    setStep('compose');
  };

  const handleDateConfirm = () => {
    const day = parseInt(dayInput, 10);
    const month = parseInt(monthInput, 10);
    const year = parseInt(yearInput, 10);

    if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
      Alert.alert('Ongeldige datum', 'Voer een geldige dag, maand en jaar in.');
      return;
    }

    const newDate = new Date(year, month - 1, day);
    if (isNaN(newDate.getTime())) {
      Alert.alert('Ongeldige datum', 'Voer een geldige datum in.');
      return;
    }

    setSelectedDate(newDate);
    setShowDateEdit(false);
  };

  const handleOpenDateEdit = () => {
    setDayInput(String(selectedDate.getDate()));
    setMonthInput(String(selectedDate.getMonth() + 1));
    setYearInput(String(selectedDate.getFullYear()));
    setShowDateEdit(true);
  };

  const handleSubmit = async () => {
    if (!imageUri) return;
    const customDate = selectedDate.toISOString();
    store.addEntry(
      {
        type: 'moment',
        data: {
          photo_url: imageUri,
          story: caption,
          location: undefined,
        },
      },
      customDate,
    );
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  // Choose source step
  if (step === 'choose') {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Text
          className="mb-2 text-xl font-bold"
          style={{ color: colors.nachtblauw }}
        >
          Foto toevoegen
        </Text>
        <Text
          className="mb-8 text-center text-sm leading-5"
          style={{ color: '#6B7C8F' }}
        >
          Voeg een foto toe aan jullie verhaal
        </Text>

        {/* Camera option */}
        <TouchableOpacity
          onPress={launchCamera}
          activeOpacity={0.8}
          className="mb-3 w-full flex-row items-center justify-center py-4"
          style={{
            backgroundColor: colors.terracotta.DEFAULT,
            borderRadius: organic.card,
          }}
        >
          <Camera size={20} color="#FFFFFF" strokeWidth={2} />
          <Text className="ml-2 text-base font-semibold text-white">
            Maak een foto
          </Text>
        </TouchableOpacity>

        {/* Library option */}
        <TouchableOpacity
          onPress={launchLibrary}
          activeOpacity={0.8}
          className="w-full flex-row items-center justify-center py-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1.5,
            borderColor: colors.zand.dark,
            borderRadius: organic.card,
          }}
        >
          <ImageIcon size={20} color={colors.nachtblauw} strokeWidth={2} />
          <Text
            className="ml-2 text-base font-semibold"
            style={{ color: colors.nachtblauw }}
          >
            Kies uit bibliotheek
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Image preview */}
      <View className="mx-6 mt-4">
        <Image
          source={{ uri: imageUri! }}
          style={{
            width: '100%',
            height: 300,
            borderRadius: organic.card,
          }}
          resizeMode="cover"
        />
      </View>

      {/* Caption input */}
      <View className="mx-6 mt-4">
        <TextInput
          value={caption}
          onChangeText={setCaption}
          placeholder="Schrijf een beschrijving..."
          placeholderTextColor="#9CA3AF"
          multiline
          className="px-4 py-3 text-base"
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1.5,
            borderColor: colors.zand.dark,
            color: colors.nachtblauw,
            minHeight: 80,
            textAlignVertical: 'top',
            borderRadius: organic.card,
          }}
        />
      </View>

      {/* Date selector */}
      <View className="mx-6 mt-4">
        <Text className="text-sm font-medium" style={{ color: '#6B7C8F' }}>
          Datum
        </Text>
        <View
          className="mt-1 flex-row items-center justify-between px-4 py-3"
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1.5,
            borderColor: colors.zand.dark,
            borderRadius: organic.card,
          }}
        >
          <Text className="text-base" style={{ color: colors.nachtblauw }}>
            {formatDateDutch(selectedDate)}
          </Text>
          <TouchableOpacity onPress={handleOpenDateEdit} activeOpacity={0.7}>
            <Text
              className="text-sm font-medium"
              style={{ color: colors.terracotta.DEFAULT }}
            >
              Wijzig datum
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date edit inputs */}
        {showDateEdit && (
          <View className="mt-3">
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Text className="mb-1 text-xs" style={{ color: '#6B7C8F' }}>
                  Dag
                </Text>
                <TextInput
                  value={dayInput}
                  onChangeText={setDayInput}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="dd"
                  placeholderTextColor="#9CA3AF"
                  className="px-3 py-2.5 text-center text-base"
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
                <Text className="mb-1 text-xs" style={{ color: '#6B7C8F' }}>
                  Maand
                </Text>
                <TextInput
                  value={monthInput}
                  onChangeText={setMonthInput}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="mm"
                  placeholderTextColor="#9CA3AF"
                  className="px-3 py-2.5 text-center text-base"
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
                <Text className="mb-1 text-xs" style={{ color: '#6B7C8F' }}>
                  Jaar
                </Text>
                <TextInput
                  value={yearInput}
                  onChangeText={setYearInput}
                  keyboardType="number-pad"
                  maxLength={4}
                  placeholder="jjjj"
                  placeholderTextColor="#9CA3AF"
                  className="px-3 py-2.5 text-center text-base"
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
            <View className="mt-2 flex-row gap-2">
              <TouchableOpacity
                onPress={() => setShowDateEdit(false)}
                activeOpacity={0.7}
                className="flex-1 items-center py-2.5"
                style={{
                  borderWidth: 1.5,
                  borderColor: colors.zand.dark,
                  borderRadius: organic.card,
                }}
              >
                <Text className="text-sm font-medium" style={{ color: '#6B7C8F' }}>
                  Annuleren
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDateConfirm}
                activeOpacity={0.7}
                className="flex-1 items-center py-2.5"
                style={{
                  backgroundColor: colors.terracotta.DEFAULT,
                  borderRadius: organic.card,
                }}
              >
                <Text className="text-sm font-semibold text-white">
                  Bevestigen
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Submit button */}
      <View className="mx-6 mt-4">
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.8}
          className="items-center py-4"
          style={{
            backgroundColor: colors.terracotta.DEFAULT,
            borderRadius: organic.card,
          }}
        >
          <Text className="text-base font-semibold text-white">
            Toevoegen aan Ons Verhaal
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function ReflectionFlow() {
  const [text, setText] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const store = useVerhaalStore();

  const handleSubmit = async () => {
    if (text.trim().length === 0) return;
    store.addEntry({
      type: 'reflection',
      data: {
        text,
        mood_tag: selectedMood ?? undefined,
      },
    });
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Icon header */}
      <View className="items-center pt-4 pb-2">
        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.oceaan.DEFAULT + '15' }}
        >
          <ReflectionPen size={32} color={colors.oceaan.DEFAULT} />
        </View>
      </View>

      {/* Title */}
      <View className="px-6 pt-2">
        <Text
          className="text-xl font-bold leading-7"
          style={{ color: colors.nachtblauw }}
        >
          Reflectie
        </Text>
        <Text className="mt-1 text-sm" style={{ color: '#6B7C8F' }}>
          Schrijf op wat je bezighoudt
        </Text>
      </View>

      {/* Text input */}
      <View className="mx-6 mt-4">
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Wat gaat er door je heen?"
          placeholderTextColor="#9CA3AF"
          multiline
          className="px-4 py-3 text-base"
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1.5,
            borderColor: colors.zand.dark,
            color: colors.nachtblauw,
            minHeight: 150,
            textAlignVertical: 'top',
            borderRadius: organic.card,
          }}
        />
      </View>

      {/* Mood tags */}
      <View className="mx-6 mt-4">
        <Text className="mb-2 text-sm font-medium" style={{ color: '#6B7C8F' }}>
          Hoe voel je je?
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {MOOD_TAGS.map((mood) => {
            const isSelected = selectedMood === mood.toLowerCase();
            return (
              <TouchableOpacity
                key={mood}
                onPress={() =>
                  setSelectedMood(isSelected ? null : mood.toLowerCase())
                }
                activeOpacity={0.7}
                className="rounded-full px-4 py-2"
                style={{
                  backgroundColor: isSelected
                    ? colors.salie.DEFAULT
                    : colors.salie.DEFAULT + '12',
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: colors.salie.DEFAULT + '30',
                }}
              >
                <Text
                  className="text-sm font-medium"
                  style={{ color: isSelected ? '#FFFFFF' : colors.salie.DEFAULT }}
                >
                  {mood}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Submit button */}
      <View className="mx-6 mt-6">
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.8}
          className="items-center py-4"
          style={{
            backgroundColor:
              text.trim().length > 0
                ? colors.terracotta.DEFAULT
                : colors.zand.dark,
            borderRadius: organic.card,
          }}
        >
          <Text className="text-base font-semibold text-white">Opslaan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function MilestoneFlow() {
  const [selectedOption, setSelectedOption] = useState<MilestoneOption | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [note, setNote] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDateEdit, setShowDateEdit] = useState(false);
  const [dayInput, setDayInput] = useState('');
  const [monthInput, setMonthInput] = useState('');
  const [yearInput, setYearInput] = useState('');
  const store = useVerhaalStore();

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleOpenDateEdit = () => {
    setDayInput(String(selectedDate.getDate()));
    setMonthInput(String(selectedDate.getMonth() + 1));
    setYearInput(String(selectedDate.getFullYear()));
    setShowDateEdit(true);
  };

  const handleDateConfirm = () => {
    const day = parseInt(dayInput, 10);
    const month = parseInt(monthInput, 10);
    const year = parseInt(yearInput, 10);

    if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
      Alert.alert('Ongeldige datum', 'Voer een geldige dag, maand en jaar in.');
      return;
    }

    const newDate = new Date(year, month - 1, day);
    if (isNaN(newDate.getTime())) {
      Alert.alert('Ongeldige datum', 'Voer een geldige datum in.');
      return;
    }

    setSelectedDate(newDate);
    setShowDateEdit(false);
  };

  const handleSubmit = async () => {
    if (!selectedOption) return;

    const title =
      selectedOption.milestoneType === 'custom'
        ? customTitle.trim() || 'Mijlpaal'
        : selectedOption.label;

    const customDate = selectedDate.toISOString();
    store.addEntry(
      {
        type: 'milestone',
        data: {
          title,
          date: selectedDate.toISOString().split('T')[0],
          milestone_type: selectedOption.milestoneType,
          photo_url: photoUri ?? undefined,
          note: note.trim() || undefined,
        },
      },
      customDate,
    );
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Icon header */}
      <View className="items-center pt-4 pb-2">
        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.goud.DEFAULT + '15' }}
        >
          <MilestoneFlag size={32} color={colors.goud.DEFAULT} />
        </View>
      </View>

      {/* Title */}
      <View className="px-6 pt-2">
        <Text
          className="text-xl font-bold leading-7"
          style={{ color: colors.nachtblauw }}
        >
          Nieuwe mijlpaal
        </Text>
        <Text className="mt-1 text-sm" style={{ color: '#6B7C8F' }}>
          Markeer een belangrijk moment in jullie verhaal
        </Text>
      </View>

      {/* Milestone type selector */}
      <View className="mt-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
        >
          {MILESTONE_OPTIONS.map((option) => {
            const isSelected = selectedOption?.id === option.id;
            const Icon = option.icon;
            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelectedOption(option)}
                activeOpacity={0.7}
                className="items-center px-4 py-3"
                style={{
                  backgroundColor: isSelected
                    ? colors.goud.DEFAULT
                    : colors.goud.DEFAULT + '10',
                  borderWidth: isSelected ? 0 : 1.5,
                  borderColor: isSelected
                    ? 'transparent'
                    : colors.goud.DEFAULT + '30',
                  borderRadius: organic.card,
                  minWidth: 90,
                }}
              >
                <Icon
                  size={24}
                  color={isSelected ? '#FFFFFF' : colors.goud.DEFAULT}
                  strokeWidth={1.5}
                />
                <Text
                  className="mt-1.5 text-xs font-semibold"
                  style={{
                    color: isSelected ? '#FFFFFF' : colors.goud.DEFAULT,
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Custom title input */}
      {selectedOption?.milestoneType === 'custom' && (
        <View className="mx-6 mt-4">
          <TextInput
            value={customTitle}
            onChangeText={setCustomTitle}
            placeholder="Naam van de mijlpaal..."
            placeholderTextColor="#9CA3AF"
            className="px-4 py-3 text-base"
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1.5,
              borderColor: colors.zand.dark,
              color: colors.nachtblauw,
              borderRadius: organic.card,
            }}
          />
        </View>
      )}

      {/* Date selector */}
      <View className="mx-6 mt-4">
        <Text className="text-sm font-medium" style={{ color: '#6B7C8F' }}>
          Datum
        </Text>
        <View
          className="mt-1 flex-row items-center justify-between px-4 py-3"
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1.5,
            borderColor: colors.zand.dark,
            borderRadius: organic.card,
          }}
        >
          <Text className="text-base" style={{ color: colors.nachtblauw }}>
            {formatDateDutch(selectedDate)}
          </Text>
          <TouchableOpacity onPress={handleOpenDateEdit} activeOpacity={0.7}>
            <Text
              className="text-sm font-medium"
              style={{ color: colors.terracotta.DEFAULT }}
            >
              Wijzig datum
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date edit inputs */}
        {showDateEdit && (
          <View className="mt-3">
            <View className="flex-row gap-2">
              <View className="flex-1">
                <Text className="mb-1 text-xs" style={{ color: '#6B7C8F' }}>
                  Dag
                </Text>
                <TextInput
                  value={dayInput}
                  onChangeText={setDayInput}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="dd"
                  placeholderTextColor="#9CA3AF"
                  className="px-3 py-2.5 text-center text-base"
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
                <Text className="mb-1 text-xs" style={{ color: '#6B7C8F' }}>
                  Maand
                </Text>
                <TextInput
                  value={monthInput}
                  onChangeText={setMonthInput}
                  keyboardType="number-pad"
                  maxLength={2}
                  placeholder="mm"
                  placeholderTextColor="#9CA3AF"
                  className="px-3 py-2.5 text-center text-base"
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
                <Text className="mb-1 text-xs" style={{ color: '#6B7C8F' }}>
                  Jaar
                </Text>
                <TextInput
                  value={yearInput}
                  onChangeText={setYearInput}
                  keyboardType="number-pad"
                  maxLength={4}
                  placeholder="jjjj"
                  placeholderTextColor="#9CA3AF"
                  className="px-3 py-2.5 text-center text-base"
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
            <View className="mt-2 flex-row gap-2">
              <TouchableOpacity
                onPress={() => setShowDateEdit(false)}
                activeOpacity={0.7}
                className="flex-1 items-center py-2.5"
                style={{
                  borderWidth: 1.5,
                  borderColor: colors.zand.dark,
                  borderRadius: organic.card,
                }}
              >
                <Text className="text-sm font-medium" style={{ color: '#6B7C8F' }}>
                  Annuleren
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDateConfirm}
                activeOpacity={0.7}
                className="flex-1 items-center py-2.5"
                style={{
                  backgroundColor: colors.terracotta.DEFAULT,
                  borderRadius: organic.card,
                }}
              >
                <Text className="text-sm font-semibold text-white">
                  Bevestigen
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Photo section */}
      <View className="mx-6 mt-4">
        {photoUri ? (
          <View>
            <Image
              source={{ uri: photoUri }}
              style={{
                width: '100%',
                height: 180,
                borderRadius: organic.card,
              }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={pickPhoto}
              activeOpacity={0.7}
              className="mt-2 self-start"
            >
              <Text
                className="text-sm font-medium"
                style={{ color: colors.terracotta.DEFAULT }}
              >
                Andere foto kiezen
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={pickPhoto}
            activeOpacity={0.7}
            className="flex-row items-center justify-center py-4"
            style={{
              backgroundColor: colors.zand.light,
              borderWidth: 1.5,
              borderColor: colors.zand.dark,
              borderStyle: 'dashed',
              borderRadius: organic.card,
            }}
          >
            <Camera size={20} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
            <Text
              className="ml-2 text-sm font-medium"
              style={{ color: colors.terracotta.DEFAULT }}
            >
              Voeg foto toe
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Note input */}
      <View className="mx-6 mt-4">
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Notitie toevoegen..."
          placeholderTextColor="#9CA3AF"
          multiline
          className="px-4 py-3 text-base"
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1.5,
            borderColor: colors.zand.dark,
            color: colors.nachtblauw,
            minHeight: 80,
            textAlignVertical: 'top',
            borderRadius: organic.card,
          }}
        />
      </View>

      {/* Submit button */}
      <View className="mx-6 mt-6">
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.8}
          className="items-center py-4"
          style={{
            backgroundColor: selectedOption
              ? colors.goud.DEFAULT
              : colors.zand.dark,
            borderRadius: organic.card,
          }}
        >
          <Text className="text-base font-semibold text-white">
            Mijlpaal opslaan
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default function VerhaalEntryScreen() {
  const { type } = useLocalSearchParams<{ type: EntryType }>();

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
        {/* Header with close button */}
        <View className="flex-row items-center px-5 py-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.zand.DEFAULT }}
          >
            <X size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
          <Text
            className="ml-3 text-lg font-bold"
            style={{ color: colors.nachtblauw }}
          >
            {type === 'moment'
              ? 'Foto toevoegen'
              : type === 'reflection'
                ? 'Reflectie'
                : 'Mijlpaal'}
          </Text>
        </View>

        {type === 'moment' && <MomentFlow />}
        {type === 'reflection' && <ReflectionFlow />}
        {type === 'milestone' && <MilestoneFlow />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
