import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, organic } from '@/lib/theme';
import { ArrowLeft } from 'lucide-react-native';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { useActivityHistoryStore } from '@/lib/stores/activity-history-store';

const MONTH_NAMES = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

const typeLabels: Record<string, string> = {
  milestone: 'Mijlpaal',
  reflection: 'Herinnering',
  gratitude: 'Dankbaarheid',
  checkin: 'Check-in',
  moment: 'Foto',
  activity: 'Activiteit',
};

const typeColors: Record<string, string> = {
  milestone: colors.goud.DEFAULT,
  reflection: colors.salie.DEFAULT,
  gratitude: colors.terracotta.DEFAULT,
  checkin: colors.oceaan.DEFAULT,
  moment: colors.terracotta.DEFAULT,
  activity: '#9CA3AF',
};

export default function TimelineDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const entries = useVerhaalStore((s) => s.entries);
  const entry = entries.find((e) => e.id === id);

  if (!entry) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 16 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              height: 40, width: 40, alignItems: 'center', justifyContent: 'center',
              borderRadius: 20, backgroundColor: colors.zand.DEFAULT,
            }}
          >
            <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#9CA3AF', fontSize: 14 }}>Item niet gevonden</Text>
        </View>
      </SafeAreaView>
    );
  }

  const color = typeColors[entry.type] ?? '#9CA3AF';

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.warmwit }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            height: 40, width: 40, alignItems: 'center', justifyContent: 'center',
            borderRadius: 20, backgroundColor: colors.zand.DEFAULT,
          }}
        >
          <ArrowLeft size={20} color={colors.nachtblauw} strokeWidth={2} />
        </TouchableOpacity>
        <Text className="text-lg font-bold" style={{ color: colors.nachtblauw, marginLeft: 12 }}>
          {typeLabels[entry.type] ?? 'Detail'}
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Date + type badge */}
        <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{
              paddingHorizontal: 10, paddingVertical: 4,
              borderRadius: 8, backgroundColor: color + '12',
            }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color }}>{typeLabels[entry.type]}</Text>
            </View>
            <Text style={{ fontSize: 13, color: '#9CA3AF' }}>{formatDate(entry.created_at)}</Text>
          </View>
        </View>

        {/* Content based on type */}
        <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
          {entry.type === 'milestone' && (
            <View>
              <Text style={{ fontSize: 24, fontWeight: '700', color: colors.nachtblauw, marginBottom: 8 }}>
                {entry.data.title}
              </Text>
              {entry.data.date && (
                <Text style={{ fontSize: 15, color: colors.goud.DEFAULT, fontWeight: '600', marginBottom: 16 }}>
                  {formatDate(entry.data.date)}
                </Text>
              )}
              {entry.data.photo_url && (
                <Image
                  source={{ uri: entry.data.photo_url }}
                  style={{ width: '100%', height: 240, borderRadius: organic.card, marginBottom: 16 }}
                  resizeMode="cover"
                />
              )}
              {entry.data.note && (
                <Text style={{ fontSize: 16, lineHeight: 24, color: '#6B7C8F' }}>
                  {entry.data.note}
                </Text>
              )}
            </View>
          )}

          {entry.type === 'moment' && (
            <View>
              {entry.data.photo_url && (
                <Image
                  source={{ uri: entry.data.photo_url }}
                  style={{ width: '100%', height: 320, borderRadius: organic.card, marginBottom: 16 }}
                  resizeMode="cover"
                />
              )}
              {entry.data.story && (
                <Text style={{ fontSize: 16, lineHeight: 24, color: colors.nachtblauw }}>
                  {entry.data.story}
                </Text>
              )}
            </View>
          )}

          {entry.type === 'reflection' && (
            <View>
              <Text style={{ fontSize: 18, lineHeight: 28, color: colors.nachtblauw }}>
                {entry.data.text}
              </Text>
              {entry.data.mood_tag && (
                <View style={{
                  marginTop: 16, alignSelf: 'flex-start',
                  paddingHorizontal: 12, paddingVertical: 6,
                  borderRadius: 10, backgroundColor: colors.salie.DEFAULT + '12',
                }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: colors.salie.DEFAULT }}>
                    {entry.data.mood_tag}
                  </Text>
                </View>
              )}
            </View>
          )}

          {entry.type === 'gratitude' && (
            <View>
              <Text style={{ fontSize: 18, lineHeight: 28, color: colors.nachtblauw }}>
                {entry.data.text}
              </Text>
              {entry.data.category && (
                <View style={{
                  marginTop: 16, alignSelf: 'flex-start',
                  paddingHorizontal: 12, paddingVertical: 6,
                  borderRadius: 10, backgroundColor: colors.terracotta.DEFAULT + '12',
                }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: colors.terracotta.DEFAULT }}>
                    {entry.data.category}
                  </Text>
                </View>
              )}
            </View>
          )}

          {entry.type === 'checkin' && (
            <View style={{ gap: 16 }}>
              <View style={{
                backgroundColor: '#FFFFFF', borderRadius: organic.card,
                padding: 20, borderWidth: 1, borderColor: colors.zand.DEFAULT,
              }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#9CA3AF', marginBottom: 8 }}>
                  Stemming
                </Text>
                <Text style={{ fontSize: 36, fontWeight: '700', color: colors.salie.DEFAULT }}>
                  {entry.data.mood}/5
                </Text>
              </View>
              <View style={{
                backgroundColor: '#FFFFFF', borderRadius: organic.card,
                padding: 20, borderWidth: 1, borderColor: colors.zand.DEFAULT,
              }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#9CA3AF', marginBottom: 8 }}>
                  Verbinding
                </Text>
                <Text style={{ fontSize: 36, fontWeight: '700', color: colors.oceaan.DEFAULT }}>
                  {entry.data.pulse}/5
                </Text>
              </View>
            </View>
          )}

          {entry.type === 'activity' && (
            <View>
              <Text style={{ fontSize: 20, fontWeight: '700', color: colors.nachtblauw, marginBottom: 8 }}>
                {entry.data.title}
              </Text>
              {entry.data.summary && (
                <Text style={{ fontSize: 16, lineHeight: 24, color: '#6B7C8F' }}>
                  {entry.data.summary}
                </Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
