import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    // TODO: connect to auth store
    setTimeout(() => setLoading(false), 1500);
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
            {/* Header */}
            <View className="mb-10">
              <TouchableOpacity
                onPress={() => router.back()}
                className="mb-6"
              >
                <Text
                  className="text-base"
                  style={{ color: colors.terracotta.DEFAULT }}
                >
                  ← Terug
                </Text>
              </TouchableOpacity>

              <Text
                className="text-3xl font-bold"
                style={{ color: colors.nachtblauw }}
              >
                Account aanmaken
              </Text>
              <Text
                className="mt-2 text-base"
                style={{ color: colors.leisteen }}
              >
                Begin jullie reis samen
              </Text>
            </View>

            {/* Form */}
            <View className="mb-5">
              <Input
                label="Naam"
                placeholder="Je voornaam"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View className="mb-5">
              <Input
                label="E-mailadres"
                placeholder="jouw@email.nl"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View className="mb-8">
              <Input
                label="Wachtwoord"
                placeholder="Minimaal 8 tekens"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Button
              title="Registreren"
              onPress={handleRegister}
              loading={loading}
              fullWidth
              size="lg"
            />

            {/* Link */}
            <View className="mt-6 items-center">
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity className="py-2">
                  <Text className="text-base" style={{ color: '#6B7C8F' }}>
                    Al een account?{' '}
                    <Text
                      className="font-medium"
                      style={{ color: colors.terracotta.DEFAULT }}
                    >
                      Inloggen
                    </Text>
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
