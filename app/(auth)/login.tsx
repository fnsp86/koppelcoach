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
import { Link } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { colors } from '@/lib/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
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
            {/* Logo */}
            <View className="mb-12 items-center">
              <Text
                className="text-5xl font-bold"
                style={{ color: colors.terracotta.DEFAULT }}
              >
                Samen
              </Text>
              <Text
                className="mt-3 text-lg"
                style={{ color: colors.leisteen }}
              >
                Elke dag bewust samen
              </Text>
            </View>

            {/* Form */}
            <View className="mb-6">
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
                placeholder="Je wachtwoord"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Button
              title="Inloggen"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              size="lg"
            />

            {/* Links */}
            <View className="mt-6 items-center">
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity className="py-2">
                  <Text
                    className="text-base font-medium"
                    style={{ color: colors.terracotta.DEFAULT }}
                  >
                    Account aanmaken
                  </Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity className="mt-2 py-2">
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
