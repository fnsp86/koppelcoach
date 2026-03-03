import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors } from '@/lib/theme';

export default function WelcomeScreen() {
  const [mode, setMode] = useState<'choice' | 'invite' | 'join'>('choice');
  const [inviteCode, setInviteCode] = useState('');
  const [generatedCode] = useState('SAMEN-X7KP');

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <View className="flex-1 px-8 pt-16">
        {/* Header */}
        <View className="mb-10 items-center">
          <Text
            className="text-4xl font-bold"
            style={{ color: colors.terracotta.DEFAULT }}
          >
            Welkom bij Samen!
          </Text>
          <Text
            className="mt-4 text-center text-base leading-6"
            style={{ color: colors.leisteen }}
          >
            Samen helpt jullie om elke dag bewust met elkaar verbonden te
            blijven. Nodig je partner uit of voer een uitnodigingscode in.
          </Text>
        </View>

        {mode === 'choice' && (
          <View className="gap-4">
            {/* Invite partner option */}
            <Card className="p-6">
              <Text
                className="mb-2 text-lg font-semibold"
                style={{ color: colors.nachtblauw }}
              >
                Nodig je partner uit
              </Text>
              <Text
                className="mb-4 text-sm leading-5"
                style={{ color: '#6B7C8F' }}
              >
                Genereer een code die je partner kan invoeren om jullie koppel
                te verbinden.
              </Text>
              <Button
                title="Uitnodiging maken"
                onPress={() => setMode('invite')}
                fullWidth
              />
            </Card>

            {/* Join option */}
            <Card className="p-6">
              <Text
                className="mb-2 text-lg font-semibold"
                style={{ color: colors.nachtblauw }}
              >
                Ik heb een code
              </Text>
              <Text
                className="mb-4 text-sm leading-5"
                style={{ color: '#6B7C8F' }}
              >
                Heb je een uitnodigingscode van je partner ontvangen? Voer
                deze hieronder in.
              </Text>
              <Button
                title="Code invoeren"
                onPress={() => setMode('join')}
                variant="secondary"
                fullWidth
              />
            </Card>
          </View>
        )}

        {mode === 'invite' && (
          <View className="items-center">
            <Card className="w-full p-8">
              <Text
                className="mb-2 text-center text-sm"
                style={{ color: '#6B7C8F' }}
              >
                Deel deze code met je partner
              </Text>
              <Text
                className="mb-6 text-center text-3xl font-bold tracking-widest"
                style={{ color: colors.terracotta.DEFAULT }}
              >
                {generatedCode}
              </Text>
              <Text
                className="text-center text-xs leading-4"
                style={{ color: '#9CA3AF' }}
              >
                De code is 24 uur geldig. Je partner kan de code invoeren bij
                het aanmaken van een account.
              </Text>
            </Card>

            <TouchableOpacity
              className="mt-6 py-2"
              onPress={() => setMode('choice')}
            >
              <Text
                className="text-base font-medium"
                style={{ color: colors.terracotta.DEFAULT }}
              >
                ← Terug
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {mode === 'join' && (
          <View>
            <Card className="p-6">
              <Text
                className="mb-4 text-lg font-semibold"
                style={{ color: colors.nachtblauw }}
              >
                Uitnodigingscode invoeren
              </Text>
              <Input
                placeholder="SAMEN-XXXX"
                value={inviteCode}
                onChangeText={setInviteCode}
                autoCapitalize="characters"
              />
              <View className="mt-4">
                <Button
                  title="Koppel verbinden"
                  onPress={() => {
                    // TODO: connect to couple store
                  }}
                  fullWidth
                />
              </View>
            </Card>

            <View className="mt-4 items-center">
              <TouchableOpacity
                className="py-2"
                onPress={() => setMode('choice')}
              >
                <Text
                  className="text-base font-medium"
                  style={{ color: colors.terracotta.DEFAULT }}
                >
                  ← Terug
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Skip option */}
        <View className="mt-auto mb-8 items-center">
          <TouchableOpacity
            className="py-3"
            onPress={() => router.replace('/(tabs)/vandaag')}
          >
            <Text className="text-sm" style={{ color: '#9CA3AF' }}>
              Overslaan en solo verkennen
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
