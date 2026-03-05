import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, organic } from '@/lib/theme';
import { Send, KeyRound, Copy, Clock, ArrowLeft, Check } from 'lucide-react-native';
import { usePartnerStore } from '@/lib/stores/partner-store';
import * as Haptics from 'expo-haptics';

type Mode = 'choice' | 'invite' | 'enter' | 'name' | 'done';

export default function PartnerScreen() {
  const { generateCode, myCode, connectWithCode, setPartnerName } = usePartnerStore();
  const [mode, setMode] = useState<Mode>('choice');
  const [code, setCode] = useState('');
  const [partnerName, setLocalPartnerName] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleInvite = () => {
    const newCode = generateCode();
    setGeneratedCode(newCode);
    setMode('invite');
  };

  const handleCopy = async () => {
    await Share.share({ message: generatedCode });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    await Share.share({
      message: `Doe je mee met Samen? Gebruik mijn koppelcode: ${generatedCode}`,
    });
  };

  const handleConnect = () => {
    if (code.length < 6) return;
    connectWithCode(code);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setMode('name');
  };

  const handleNameSubmit = () => {
    if (partnerName.trim().length === 0) return;
    setPartnerName(partnerName.trim());
    setMode('done');
  };

  const handleFinish = () => {
    router.push('/(onboarding)/complete');
  };

  const handleSkip = () => {
    router.push('/(onboarding)/complete');
  };

  const handleBack = () => {
    if (mode === 'choice') {
      router.back();
    } else if (mode === 'done') {
      return;
    } else {
      setMode('choice');
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <View className="flex-1 px-8">
        {mode !== 'done' && (
          <View style={{ paddingTop: 16 }}>
            <TouchableOpacity
              onPress={handleBack}
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
          </View>
        )}

        {mode === 'choice' && (
          <>
            <View className="mt-12">
              <Text className="text-2xl font-bold" style={{ color: colors.nachtblauw }}>
                Verbind met je partner
              </Text>
              <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>
                Samen is leuker met zijn tweeen. Je kunt dit ook later doen.
              </Text>
            </View>

            <View style={{ marginTop: 32, gap: 12 }}>
              <TouchableOpacity
                onPress={handleInvite}
                activeOpacity={0.7}
                style={{
                  borderRadius: 16,
                  padding: 20,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: colors.zand.DEFAULT,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      backgroundColor: colors.terracotta.DEFAULT + '15',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16,
                    }}
                  >
                    <Send size={22} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text className="text-base font-semibold" style={{ color: colors.nachtblauw }}>
                      Nodig je partner uit
                    </Text>
                    <Text className="text-sm mt-1" style={{ color: '#6B7C8F' }}>
                      Genereer een code om te delen
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setMode('enter')}
                activeOpacity={0.7}
                style={{
                  borderRadius: 16,
                  padding: 20,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: colors.zand.DEFAULT,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      backgroundColor: colors.oceaan.DEFAULT + '15',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 16,
                    }}
                  >
                    <KeyRound size={22} color={colors.oceaan.DEFAULT} strokeWidth={1.5} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text className="text-base font-semibold" style={{ color: colors.nachtblauw }}>
                      Ik heb een code
                    </Text>
                    <Text className="text-sm mt-1" style={{ color: '#6B7C8F' }}>
                      Voer de code van je partner in
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}

        {mode === 'invite' && (
          <>
            <View className="mt-12">
              <Text className="text-2xl font-bold" style={{ color: colors.nachtblauw }}>
                Deel de code
              </Text>
              <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>
                Stuur deze code naar je partner via WhatsApp of SMS
              </Text>
            </View>

            <View
              style={{
                marginTop: 32,
                backgroundColor: '#FFFFFF',
                borderRadius: organic.card,
                padding: 32,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.zand.DEFAULT,
              }}
            >
              <Text className="text-sm" style={{ color: '#6B7C8F', marginBottom: 8 }}>
                Jullie koppelcode
              </Text>
              <Text
                className="text-3xl font-bold"
                style={{ color: colors.terracotta.DEFAULT, letterSpacing: 4, marginBottom: 20 }}
              >
                {generatedCode}
              </Text>

              <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
                <TouchableOpacity
                  onPress={handleCopy}
                  activeOpacity={0.7}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    borderRadius: 12,
                    backgroundColor: colors.zand.DEFAULT,
                  }}
                >
                  {copied ? (
                    <Check size={16} color={colors.salie.DEFAULT} strokeWidth={2} />
                  ) : (
                    <Copy size={16} color={colors.nachtblauw} strokeWidth={2} />
                  )}
                  <Text className="text-sm font-medium ml-2" style={{ color: colors.nachtblauw }}>
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
                    paddingVertical: 12,
                    borderRadius: 12,
                    backgroundColor: colors.terracotta.DEFAULT,
                  }}
                >
                  <Send size={16} color="#FFFFFF" strokeWidth={2} />
                  <Text className="text-sm font-bold ml-2" style={{ color: '#FFFFFF' }}>
                    Delen
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                <Clock size={12} color="#9CA3AF" strokeWidth={2} />
                <Text className="text-xs ml-1" style={{ color: '#9CA3AF' }}>
                  De code is 24 uur geldig
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 24 }}>
              <TouchableOpacity
                onPress={() => setMode('name')}
                activeOpacity={0.8}
                style={{
                  backgroundColor: colors.terracotta.DEFAULT,
                  borderRadius: 16,
                  paddingVertical: 18,
                  alignItems: 'center',
                }}
              >
                <Text className="text-base font-bold text-white">Mijn partner is verbonden</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {mode === 'enter' && (
          <>
            <View className="mt-12">
              <Text className="text-2xl font-bold" style={{ color: colors.nachtblauw }}>
                Code invoeren
              </Text>
              <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>
                Voer de code in die je van je partner hebt ontvangen
              </Text>
            </View>

            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="SAMEN-XXXX"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="characters"
              autoFocus
              className="mt-8 px-5 py-4 text-lg text-center"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: organic.card,
                borderWidth: 1.5,
                borderColor: code.length >= 6 ? colors.terracotta.DEFAULT + '40' : colors.zand.dark,
                color: colors.nachtblauw,
                letterSpacing: 2,
                fontWeight: '700',
              }}
              onSubmitEditing={handleConnect}
            />

            <View style={{ marginTop: 24 }}>
              <TouchableOpacity
                onPress={handleConnect}
                activeOpacity={0.8}
                style={{
                  backgroundColor: code.length >= 6 ? colors.terracotta.DEFAULT : colors.zand.dark,
                  borderRadius: 16,
                  paddingVertical: 18,
                  alignItems: 'center',
                }}
              >
                <Text className="text-base font-bold text-white">Verbinden</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {mode === 'name' && (
          <>
            <View className="mt-12">
              <Text className="text-2xl font-bold" style={{ color: colors.nachtblauw }}>
                Hoe heet je partner?
              </Text>
              <Text className="mt-2 text-sm" style={{ color: '#6B7C8F' }}>
                We gebruiken deze naam in de app
              </Text>
            </View>

            <TextInput
              value={partnerName}
              onChangeText={setLocalPartnerName}
              placeholder="Naam van je partner"
              placeholderTextColor="#9CA3AF"
              autoFocus
              className="mt-8 px-5 py-4 text-lg"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: organic.card,
                borderWidth: 1.5,
                borderColor: partnerName.trim().length > 0 ? colors.terracotta.DEFAULT + '40' : colors.zand.dark,
                color: colors.nachtblauw,
              }}
              onSubmitEditing={handleNameSubmit}
            />

            <View style={{ marginTop: 24 }}>
              <TouchableOpacity
                onPress={handleNameSubmit}
                activeOpacity={0.8}
                style={{
                  backgroundColor: partnerName.trim().length > 0 ? colors.terracotta.DEFAULT : colors.zand.dark,
                  borderRadius: 16,
                  paddingVertical: 18,
                  alignItems: 'center',
                }}
              >
                <Text className="text-base font-bold text-white">Volgende</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {mode === 'done' && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: colors.salie.DEFAULT + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
              }}
            >
              <Check size={36} color={colors.salie.DEFAULT} strokeWidth={2} />
            </View>
            <Text className="text-2xl font-bold text-center" style={{ color: colors.nachtblauw }}>
              Verbonden!
            </Text>
            <Text className="text-sm text-center mt-2" style={{ color: '#6B7C8F', maxWidth: 280 }}>
              Jullie zijn nu gekoppeld. Samen wordt nog leuker met zijn tweeen.
            </Text>
          </View>
        )}

        <View className="mt-auto mb-12">
          {mode === 'done' && (
            <TouchableOpacity
              onPress={handleFinish}
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.terracotta.DEFAULT,
                borderRadius: 16,
                paddingVertical: 18,
                alignItems: 'center',
              }}
            >
              <Text className="text-base font-bold text-white">Doorgaan</Text>
            </TouchableOpacity>
          )}

          {(mode === 'choice' || mode === 'invite') && (
            <TouchableOpacity onPress={handleSkip} style={{ paddingVertical: 12, alignItems: 'center' }}>
              <Text className="text-sm" style={{ color: '#9CA3AF' }}>
                Later verbinden
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
