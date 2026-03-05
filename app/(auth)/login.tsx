import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { colors } from '@/lib/theme';
import { Heart } from 'lucide-react-native';
import { useAuth } from '@/lib/auth';

export default function LoginScreen() {
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Vul je e-mailadres en wachtwoord in');
      return;
    }
    setError('');
    setLoading(true);
    const result = await signIn(email.trim().toLowerCase(), password);
    setLoading(false);
    if (result.error) {
      if (result.error.includes('Invalid login credentials')) {
        setError('Onjuist e-mailadres of wachtwoord');
      } else if (result.error.includes('Email not confirmed')) {
        setError('Bevestig eerst je e-mailadres via de link in je inbox');
      } else {
        setError('Er ging iets mis. Probeer het opnieuw.');
      }
      return;
    }
    router.replace('/');
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('E-mailadres nodig', 'Vul eerst je e-mailadres in, dan sturen we een herstellink.');
      return;
    }
    Alert.alert(
      'Wachtwoord herstellen',
      `We sturen een herstellink naar ${email}`,
      [
        { text: 'Annuleren', style: 'cancel' },
        {
          text: 'Versturen',
          onPress: async () => {
            const result = await resetPassword(email.trim().toLowerCase());
            if (result.error) {
              Alert.alert('Fout', 'Kon geen herstelmail versturen.');
            } else {
              Alert.alert('Verstuurd', 'Check je inbox voor de herstellink.');
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-8">
            <View className="mb-12 items-center">
              <View
                className="mb-4 h-16 w-16 items-center justify-center rounded-2xl"
                style={{ backgroundColor: colors.terracotta.DEFAULT + '12' }}
              >
                <Heart size={28} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
              </View>
              <Text className="text-4xl font-bold" style={{ color: colors.terracotta.DEFAULT }}>
                Samen
              </Text>
              <Text className="mt-2 text-base" style={{ color: '#6B7C8F' }}>
                Elke dag bewust samen
              </Text>
            </View>

            <View className="mb-5">
              <Input
                label="E-mailadres"
                placeholder="jouw@email.nl"
                value={email}
                onChangeText={(t) => { setEmail(t); setError(''); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View className="mb-4">
              <Input
                label="Wachtwoord"
                placeholder="Je wachtwoord"
                value={password}
                onChangeText={(t) => { setPassword(t); setError(''); }}
                secureTextEntry
              />
            </View>

            {error ? (
              <Text className="mb-4 text-sm text-center" style={{ color: '#DC2626' }}>
                {error}
              </Text>
            ) : null}

            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={loading}
              style={{
                backgroundColor: colors.terracotta.DEFAULT,
                borderRadius: 16,
                paddingVertical: 18,
                alignItems: 'center',
                opacity: loading ? 0.6 : 1,
                marginBottom: 8,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
                {loading ? 'Even geduld...' : 'Inloggen'}
              </Text>
            </TouchableOpacity>

            <View className="mt-6 items-center">
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity className="py-2">
                  <Text className="text-base font-medium" style={{ color: colors.terracotta.DEFAULT }}>
                    Account aanmaken
                  </Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity className="mt-2 py-2" onPress={handleForgotPassword}>
                <Text className="text-sm" style={{ color: '#6B7C8F' }}>
                  Wachtwoord vergeten?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
