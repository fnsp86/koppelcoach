import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { colors, organic } from '@/lib/theme';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { usePartnerStore } from '@/lib/stores/partner-store';
import { uploadMomentjeToSupabase } from '@/lib/sync/upload-momentje';
import { X, Camera, ImageIcon, Check } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type PickerStep = 'choose' | 'compose' | 'success';

export default function MomentjeScreen() {
  const [step, setStep] = useState<PickerStep>('choose');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const store = useVerhaalStore();

  const launchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Toestemming nodig', 'Camera-toegang is nodig om een momentje te maken.');
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

    setPhotoUri(result.assets[0].uri);
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

    setPhotoUri(result.assets[0].uri);
    setStep('compose');
  };

  const isOnline = usePartnerStore((s) => s.isOnline);

  const handleSubmit = async () => {
    if (!photoUri) return;

    store.addMomentje({
      image_uri: photoUri,
      text: message.trim() || null,
    });

    // Also upload to Supabase when online
    if (isOnline) {
      uploadMomentjeToSupabase(photoUri, message.trim() || null).catch(() => {
        // Local save succeeded, Supabase upload failed silently
      });
    }

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setStep('success');

    setTimeout(() => {
      router.back();
    }, 1200);
  };

  // Choose source step
  if (step === 'choose') {
    return (
      <View className="flex-1" style={{ backgroundColor: colors.warmwit }}>
        {/* Close button */}
        <View
          className="px-5"
          style={{ paddingTop: Platform.OS === 'ios' ? 60 : 40 }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.zand.DEFAULT }}
          >
            <X size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center justify-center px-8">
          <Text
            className="mb-2 text-2xl font-bold"
            style={{ color: colors.nachtblauw }}
          >
            Nieuw momentje
          </Text>
          <Text
            className="mb-10 text-center text-sm leading-5"
            style={{ color: '#6B7C8F' }}
          >
            Deel een foto met je partner. Het verdwijnt na 24 uur, tenzij het
            bewaard wordt.
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
      </View>
    );
  }

  // Success step
  if (step === 'success') {
    return (
      <View className="flex-1 items-center justify-center" style={{ backgroundColor: '#000000' }}>
        {photoUri && (
          <Image
            source={{ uri: photoUri }}
            style={{
              position: 'absolute',
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              opacity: 0.3,
            }}
            resizeMode="cover"
          />
        )}
        <View
          className="h-24 w-24 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.salie.DEFAULT + '30' }}
        >
          <Check size={48} color={colors.salie.DEFAULT} strokeWidth={2} />
        </View>
        <Text className="mt-4 text-xl font-bold text-white">Verstuurd!</Text>
      </View>
    );
  }

  // Compose step - photo preview with message
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: '#000000' }}
    >
      {/* Full screen photo background */}
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={{
            position: 'absolute',
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            opacity: 0.7,
          }}
          resizeMode="cover"
        />
      )}

      {/* Close button */}
      <View
        className="px-5"
        style={{ paddingTop: Platform.OS === 'ios' ? 60 : 40 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          <X size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Bottom area with message input and send button */}
      <View className="flex-1 justify-end">
        <View
          className="px-5 pb-10"
          style={{
            paddingBottom: Platform.OS === 'ios' ? 40 : 20,
          }}
        >
          {/* Message input */}
          <View
            className="mb-4 flex-row items-center px-4 py-3"
            style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderRadius: organic.card,
            }}
          >
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Voeg een bericht toe..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-base"
              style={{ color: colors.nachtblauw }}
              multiline
              maxLength={200}
            />
          </View>

          {/* Send button */}
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
              Deel met je partner
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
