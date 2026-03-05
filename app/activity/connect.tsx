import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Share,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, organic, gradients, warmShadow } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Copy, Share2, Heart, UserPlus, Check, Wifi, WifiOff } from 'lucide-react-native';
import { usePartnerStore } from '@/lib/stores/partner-store';
import { useAuth } from '@/lib/auth';
import * as Haptics from 'expo-haptics';

export default function ConnectScreen() {
  const {
    myCode,
    isConnected,
    partnerName,
    isOnline,
    isSyncing,
    syncError,
    generateCode,
    connectWithCode,
    setPartnerName,
    createCoupleOnline,
    joinCoupleOnline,
  } = usePartnerStore();
  const { user } = useAuth();
  const isLoggedIn = user != null;

  const [inputCode, setInputCode] = useState('');
  const [inputName, setInputName] = useState('');
  const [step, setStep] = useState<'choose' | 'share' | 'enter' | 'name' | 'done'>(
    isConnected ? 'done' : 'choose',
  );
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateCode = async () => {
    if (isLoggedIn) {
      try {
        setLoading(true);
        setError('');
        await createCoupleOnline();
        setStep('share');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Er ging iets mis');
      } finally {
        setLoading(false);
      }
    } else {
      generateCode();
      setStep('share');
    }
  };

  const code = myCode ?? '';

  const handleCopy = async () => {
    await Share.share({ message: code });
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Ik gebruik Samen om onze relatie te versterken! Gebruik mijn koppelcode om te verbinden: ${code}\n\nDownload de app en voer de code in.`,
      });
    } catch (_e) {
      // cancelled
    }
  };

  const handleConnect = async () => {
    const trimmed = inputCode.trim().toUpperCase();
    if (trimmed.length < 4) {
      Alert.alert('Ongeldige code', 'Voer de volledige koppelcode van je partner in.');
      return;
    }

    if (isLoggedIn) {
      try {
        setLoading(true);
        setError('');
        await joinCoupleOnline(trimmed);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        // If partner name is already known from Supabase profile, skip name step
        const partnerNameFromStore = usePartnerStore.getState().partnerName;
        if (partnerNameFromStore) {
          setStep('done');
        } else {
          setStep('name');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Er ging iets mis');
        Alert.alert('Verbinden mislukt', err instanceof Error ? err.message : 'Probeer het opnieuw.');
      } finally {
        setLoading(false);
      }
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      connectWithCode(trimmed);
      setStep('name');
    }
  };

  const handleSetName = async () => {
    const name = inputName.trim();
    if (name.length === 0) {
      Alert.alert('Naam invullen', 'Voer de naam van je partner in.');
      return;
    }
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setPartnerName(name);
    setStep('done');
  };

  // ---------------------------------------------------------------------------
  // Done screen
  // ---------------------------------------------------------------------------
  if (step === 'done') {
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
        </View>

        <View className="flex-1 items-center justify-center px-8">
          <View
            className="h-24 w-24 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.salie.DEFAULT + '15' }}
          >
            <Heart size={40} color={colors.salie.DEFAULT} fill={colors.salie.DEFAULT} strokeWidth={0} />
          </View>
          <Text className="mt-6 text-2xl font-bold" style={{ color: colors.nachtblauw }}>
            Verbonden!
          </Text>
          {partnerName && (
            <Text className="mt-2 text-base" style={{ color: '#6B7C8F' }}>
              Je bent verbonden met {partnerName}
            </Text>
          )}
          <Text className="mt-4 text-center text-sm leading-5" style={{ color: '#6B7C8F' }}>
            {isOnline
              ? 'Jullie zijn online verbonden. Activiteiten en check-ins worden automatisch gesynchroniseerd.'
              : 'Jullie kunnen nu samen de app gebruiken. Gebruik "samen op de bank" modus om activiteiten te delen.'}
          </Text>

          {isOnline && (
            <View className="mt-3 flex-row items-center">
              <Wifi size={14} color={colors.salie.DEFAULT} strokeWidth={2} />
              <Text className="ml-1.5 text-xs font-medium" style={{ color: colors.salie.DEFAULT }}>
                Online verbonden
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            className="mt-8 w-full items-center rounded-xl py-4"
            style={{ backgroundColor: colors.salie.DEFAULT }}
          >
            <Text className="text-base font-semibold text-white">Ga verder</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ---------------------------------------------------------------------------
  // Name step
  // ---------------------------------------------------------------------------
  if (step === 'name') {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
        <LinearGradient
          colors={gradients.headerSoft}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
        />
        <View className="flex-row items-center px-5 py-3">
          <TouchableOpacity
            onPress={() => setStep('enter')}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.zand.DEFAULT }}
          >
            <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-8 pt-12">
          <Text className="text-2xl font-bold" style={{ color: colors.nachtblauw }}>
            Hoe heet je partner?
          </Text>
          <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>
            Deze naam verschijnt in de app
          </Text>

          <TextInput
            value={inputName}
            onChangeText={setInputName}
            placeholder="Naam"
            placeholderTextColor="#9CA3AF"
            autoFocus
            className="mt-6 px-5 py-4 text-lg"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: organic.card,
              borderWidth: 1.5,
              borderColor: colors.zand.dark,
              color: colors.nachtblauw,
            }}
            onSubmitEditing={handleSetName}
          />

          <TouchableOpacity
            onPress={handleSetName}
            activeOpacity={0.8}
            className="mt-4 w-full items-center rounded-xl py-4"
            style={{
              backgroundColor: inputName.trim().length > 0 ? colors.terracotta.DEFAULT : colors.zand.dark,
            }}
          >
            <Text className="text-base font-semibold text-white">Verder</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ---------------------------------------------------------------------------
  // Share code step
  // ---------------------------------------------------------------------------
  if (step === 'share') {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
        <LinearGradient
          colors={gradients.headerSoft}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
        />
        <View className="flex-row items-center px-5 py-3">
          <TouchableOpacity
            onPress={() => setStep('choose')}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.zand.DEFAULT }}
          >
            <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-8 pt-8">
          <Text className="text-2xl font-bold" style={{ color: colors.nachtblauw }}>
            Jouw koppelcode
          </Text>
          <Text className="mt-2 text-sm leading-5" style={{ color: '#6B7C8F' }}>
            Deel deze code met je partner. Hij of zij kan de code invoeren om jullie te verbinden.
          </Text>

          {/* Code display */}
          <View
            className="mt-8 items-center rounded-2xl py-8"
            style={{ backgroundColor: '#FFFFFF', ...warmShadow }}
          >
            <Text className="text-xs font-medium tracking-widest" style={{ color: '#9CA3AF' }}>
              KOPPELCODE
            </Text>
            <Text
              className="mt-3 text-4xl font-bold tracking-widest"
              style={{ color: colors.terracotta.DEFAULT, letterSpacing: 4 }}
            >
              {code}
            </Text>
            {isLoggedIn && (
              <View className="mt-3 flex-row items-center">
                <Wifi size={12} color={colors.salie.DEFAULT} strokeWidth={2} />
                <Text className="ml-1 text-xs" style={{ color: colors.salie.DEFAULT }}>
                  Online koppeling
                </Text>
              </View>
            )}
          </View>

          {/* Action buttons */}
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
            <TouchableOpacity
              onPress={handleCopy}
              activeOpacity={0.7}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 14,
                borderRadius: 12,
                backgroundColor: copied ? colors.salie.DEFAULT + '15' : colors.zand.DEFAULT,
              }}
            >
              {copied ? (
                <Check size={18} color={colors.salie.DEFAULT} strokeWidth={2} />
              ) : (
                <Copy size={18} color={colors.nachtblauw} strokeWidth={1.8} />
              )}
              <Text
                className="ml-2 text-sm font-semibold"
                style={{ color: copied ? colors.salie.DEFAULT : colors.nachtblauw }}
              >
                {copied ? 'Gekopieerd' : 'Kopieer'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleShare}
              activeOpacity={0.7}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 14,
                borderRadius: 12,
                backgroundColor: colors.terracotta.DEFAULT,
              }}
            >
              <Share2 size={18} color="#FFFFFF" strokeWidth={1.8} />
              <Text className="ml-2 text-sm font-semibold text-white">Deel</Text>
            </TouchableOpacity>
          </View>

          <Text className="mt-6 text-center text-xs leading-4" style={{ color: '#9CA3AF' }}>
            {isLoggedIn
              ? 'Als je partner de code invoert in de app, worden jullie automatisch gekoppeld.'
              : 'De code blijft geldig totdat je partner hem invoert. Je kunt hem zo vaak delen als nodig.'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ---------------------------------------------------------------------------
  // Enter code step
  // ---------------------------------------------------------------------------
  if (step === 'enter') {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
        <LinearGradient
          colors={gradients.headerSoft}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
        />
        <View className="flex-row items-center px-5 py-3">
          <TouchableOpacity
            onPress={() => setStep('choose')}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.zand.DEFAULT }}
          >
            <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 px-8 pt-8">
          <Text className="text-2xl font-bold" style={{ color: colors.nachtblauw }}>
            Code invoeren
          </Text>
          <Text className="mt-2 text-sm leading-5" style={{ color: '#6B7C8F' }}>
            Voer de koppelcode in die je van je partner hebt ontvangen
          </Text>

          <TextInput
            value={inputCode}
            onChangeText={(t) => { setInputCode(t); setError(''); }}
            placeholder="SAMEN-XXXX"
            placeholderTextColor="#9CA3AF"
            autoFocus
            autoCapitalize="characters"
            className="mt-8 px-5 py-4 text-center text-2xl font-bold tracking-widest"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: organic.card,
              borderWidth: 1.5,
              borderColor: error ? '#DC2626' + '50' : colors.terracotta.DEFAULT + '30',
              color: colors.nachtblauw,
              letterSpacing: 3,
            }}
            onSubmitEditing={handleConnect}
          />

          {error ? (
            <Text className="mt-2 text-center text-sm" style={{ color: '#DC2626' }}>
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={handleConnect}
            activeOpacity={0.8}
            disabled={loading}
            className="mt-6 w-full items-center rounded-xl py-4"
            style={{
              backgroundColor: inputCode.trim().length >= 4 ? colors.terracotta.DEFAULT : colors.zand.dark,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-base font-semibold text-white">Verbinden</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ---------------------------------------------------------------------------
  // Choose step
  // ---------------------------------------------------------------------------
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
      </View>

      <View className="flex-1 px-8 pt-8">
        <View className="items-center">
          <View
            className="h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.terracotta.DEFAULT + '12' }}
          >
            <Heart size={36} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
          </View>
          <Text className="mt-5 text-2xl font-bold" style={{ color: colors.nachtblauw }}>
            Verbind met je partner
          </Text>
          <Text className="mt-2 text-center text-sm leading-5" style={{ color: '#6B7C8F' }}>
            Verbind jullie accounts via een koppelcode om samen de app te gebruiken
          </Text>

          {/* Online/offline indicator */}
          <View className="mt-3 flex-row items-center rounded-full px-3 py-1.5" style={{
            backgroundColor: isLoggedIn ? colors.salie.DEFAULT + '12' : colors.zand.DEFAULT,
          }}>
            {isLoggedIn ? (
              <Wifi size={12} color={colors.salie.DEFAULT} strokeWidth={2} />
            ) : (
              <WifiOff size={12} color="#9CA3AF" strokeWidth={2} />
            )}
            <Text className="ml-1.5 text-xs font-medium" style={{
              color: isLoggedIn ? colors.salie.DEFAULT : '#9CA3AF',
            }}>
              {isLoggedIn ? 'Online koppeling' : 'Lokale koppeling'}
            </Text>
          </View>
        </View>

        <View className="mt-10">
          <TouchableOpacity
            onPress={handleGenerateCode}
            activeOpacity={0.7}
            disabled={loading}
            className="mb-4 flex-row items-center rounded-2xl p-5"
            style={{ backgroundColor: '#FFFFFF', ...warmShadow, opacity: loading ? 0.7 : 1 }}
          >
            <View
              className="mr-4 h-14 w-14 items-center justify-center rounded-xl"
              style={{ backgroundColor: colors.terracotta.DEFAULT + '12' }}
            >
              {loading ? (
                <ActivityIndicator color={colors.terracotta.DEFAULT} />
              ) : (
                <Share2 size={24} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold" style={{ color: colors.nachtblauw }}>
                Nodig je partner uit
              </Text>
              <Text className="mt-0.5 text-sm" style={{ color: '#6B7C8F' }}>
                Maak een code en deel hem
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setStep('enter')}
            activeOpacity={0.7}
            className="flex-row items-center rounded-2xl p-5"
            style={{ backgroundColor: '#FFFFFF', ...warmShadow }}
          >
            <View
              className="mr-4 h-14 w-14 items-center justify-center rounded-xl"
              style={{ backgroundColor: colors.oceaan.DEFAULT + '12' }}
            >
              <UserPlus size={24} color={colors.oceaan.DEFAULT} strokeWidth={1.5} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold" style={{ color: colors.nachtblauw }}>
                Ik heb een code
              </Text>
              <Text className="mt-0.5 text-sm" style={{ color: '#6B7C8F' }}>
                Voer de code van je partner in
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {!isLoggedIn && (
          <Text className="mt-6 text-center text-xs leading-4" style={{ color: '#9CA3AF' }}>
            Maak een account aan voor online synchronisatie tussen twee telefoons.
            Zonder account werkt de app alleen in "samen op de bank" modus.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
