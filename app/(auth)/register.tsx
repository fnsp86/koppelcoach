import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { colors } from '@/lib/theme';
import { ArrowLeft, Mail } from 'lucide-react-native';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';

type Step = 'account' | 'verify';

export default function RegisterScreen() {
  const { signUp, verifySignUpOtp } = useAuth();
  const setOnboardingName = useOnboardingStore((s) => s.setName);

  const [step, setStep] = useState<Step>('account');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // OTP
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '', '', '']);
  const otpRefs = useRef<(TextInput | null)[]>([]);

  const handleRegister = async () => {
    if (!name.trim()) { setError('Vul je naam in'); return; }
    if (!email.trim()) { setError('Vul je e-mailadres in'); return; }
    if (password.length < 6) { setError('Wachtwoord moet minimaal 6 tekens zijn'); return; }
    setError('');
    setLoading(true);
    const result = await signUp(email.trim().toLowerCase(), password);
    setLoading(false);
    if (result.error) {
      if (result.error.includes('already registered')) {
        setError('Dit e-mailadres is al in gebruik');
      } else {
        setError(result.error);
      }
      return;
    }
    if (result.needsConfirmation) {
      setStep('verify');
    } else {
      setOnboardingName(name.trim());
      router.replace('/(onboarding)/welcome');
    }
  };

  const handleVerifyOtp = async () => {
    const code = otpCode.join('');
    if (code.length < 8) { setError('Vul de volledige code in'); return; }
    setError('');
    setLoading(true);
    const result = await verifySignUpOtp(email.trim().toLowerCase(), code);
    setLoading(false);
    if (result.error) {
      setError('Ongeldige code. Controleer je inbox en probeer opnieuw.');
      return;
    }
    setOnboardingName(name.trim());
    router.replace('/(onboarding)/welcome');
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otpCode];
    newOtp[index] = text;
    setOtpCode(newOtp);
    if (text && index < 7) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otpCode[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim().toLowerCase(),
    });
    setLoading(false);
    if (resendError) {
      setError('Kon de code niet opnieuw versturen. Probeer het later.');
    } else {
      setError('');
      setOtpCode(['', '', '', '', '', '', '', '']);
    }
  };

  if (step === 'verify') {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 px-8" style={{ paddingTop: 60 }}>
              <View className="mb-10">
                <TouchableOpacity
                  onPress={() => setStep('account')}
                  className="mb-6 flex-row items-center"
                >
                  <ArrowLeft size={18} color={colors.terracotta.DEFAULT} strokeWidth={2} />
                  <Text className="ml-1 text-base font-medium" style={{ color: colors.terracotta.DEFAULT }}>
                    Terug
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 20,
                    backgroundColor: colors.terracotta.DEFAULT + '12',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  <Mail size={28} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
                </View>

                <Text className="text-3xl font-bold" style={{ color: colors.nachtblauw }}>
                  Check je inbox
                </Text>
                <Text className="mt-3 text-base leading-6" style={{ color: '#6B7C8F' }}>
                  We hebben een 8-cijferige code gestuurd naar{'\n'}
                  <Text style={{ color: colors.nachtblauw, fontWeight: '600' }}>{email}</Text>
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
                {otpCode.map((digit, i) => (
                  <TextInput
                    key={i}
                    ref={(ref) => { otpRefs.current[i] = ref; }}
                    value={digit}
                    onChangeText={(t) => handleOtpChange(t.replace(/[^0-9]/g, ''), i)}
                    onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={{
                      width: 38,
                      height: 48,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: digit ? colors.terracotta.DEFAULT : colors.zand.dark,
                      backgroundColor: digit ? colors.terracotta.DEFAULT + '08' : '#FFFFFF',
                      fontSize: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      color: colors.nachtblauw,
                    }}
                  />
                ))}
              </View>

              {error ? (
                <Text className="mb-4 text-sm text-center" style={{ color: '#DC2626' }}>
                  {error}
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={handleVerifyOtp}
                activeOpacity={0.8}
                disabled={loading}
                style={{
                  backgroundColor: colors.terracotta.DEFAULT,
                  borderRadius: 16,
                  paddingVertical: 18,
                  alignItems: 'center',
                  opacity: loading ? 0.6 : 1,
                  marginTop: 16,
                }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
                  {loading ? 'Even geduld...' : 'Bevestigen'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleResendOtp}
                className="mt-6 items-center py-2"
              >
                <Text className="text-sm" style={{ color: '#6B7C8F' }}>
                  Geen code ontvangen?{' '}
                  <Text style={{ color: colors.terracotta.DEFAULT, fontWeight: '600' }}>
                    Opnieuw versturen
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 32, paddingTop: 20 }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}
            >
              <ArrowLeft size={18} color={colors.terracotta.DEFAULT} strokeWidth={2} />
              <Text style={{ color: colors.terracotta.DEFAULT, fontSize: 16, fontWeight: '500', marginLeft: 4 }}>
                Terug
              </Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 28, fontWeight: '700', color: colors.nachtblauw }}>
              Account aanmaken
            </Text>
            <Text style={{ color: '#6B7C8F', fontSize: 16, marginTop: 8, marginBottom: 32 }}>
              Begin jullie reis samen
            </Text>

            <View style={{ marginBottom: 20 }}>
              <Input
                label="Naam"
                placeholder="Je voornaam"
                value={name}
                onChangeText={(t) => { setName(t); setError(''); }}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Input
                label="E-mailadres"
                placeholder="jouw@email.nl"
                value={email}
                onChangeText={(t) => { setEmail(t); setError(''); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            <View style={{ marginBottom: 24 }}>
              <Input
                label="Wachtwoord"
                placeholder="Minimaal 6 tekens"
                value={password}
                onChangeText={(t) => { setPassword(t); setError(''); }}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
            </View>

            {error ? (
              <Text style={{ color: '#DC2626', fontSize: 14, textAlign: 'center', marginBottom: 16 }}>
                {error}
              </Text>
            ) : null}

            <TouchableOpacity
              onPress={handleRegister}
              activeOpacity={0.8}
              disabled={loading}
              style={{
                backgroundColor: colors.terracotta.DEFAULT,
                borderRadius: 16,
                paddingVertical: 18,
                alignItems: 'center',
                opacity: loading ? 0.6 : 1,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
                {loading ? 'Even geduld...' : 'Registreren'}
              </Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginTop: 24 }}>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity style={{ paddingVertical: 8 }}>
                  <Text style={{ fontSize: 16, color: '#6B7C8F' }}>
                    Al een account?{' '}
                    <Text style={{ color: colors.terracotta.DEFAULT, fontWeight: '500' }}>
                      Inloggen
                    </Text>
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
