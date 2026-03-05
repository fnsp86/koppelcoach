import React from 'react';
import { View, Text, Image } from 'react-native';
import { WarmCard } from '@/components/ui/WarmCard';
import {
  MilestoneFlag,
  GratitudeHeart,
  CheckInHeart,
  StarMoment,
  ReflectionPen,
} from '@/components/icons';
import { colors, organic } from '@/lib/theme';
import type { TimelineEntry } from '@/lib/types';

interface TimelineCardProps {
  entry: TimelineEntry;
}

const DAY_NAMES = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];

function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const months = [
    'jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
    'jul', 'aug', 'sep', 'okt', 'nov', 'dec',
  ];
  return `${day} ${months[date.getMonth()]}`;
}

function formatDateFull(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const months = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december',
  ];
  return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Colors for each entry type dot
export function getDotColor(type: TimelineEntry['type']): string {
  switch (type) {
    case 'milestone':
      return colors.goud.DEFAULT;
    case 'gratitude':
      return colors.terracotta.DEFAULT;
    case 'reflection':
      return colors.salie.DEFAULT;
    case 'moment':
      return colors.terracotta.DEFAULT;
    case 'checkin':
      return colors.oceaan.DEFAULT;
    case 'activity':
      return '#9CA3AF';
    default:
      return '#9CA3AF';
  }
}

// Whether this entry type is "big" (gets a card) or "compact" (inline row)
export function isCompactEntry(type: TimelineEntry['type']): boolean {
  return type === 'checkin' || (type === 'activity');
}

function MomentCard({ entry }: { entry: Extract<TimelineEntry, { type: 'moment' }> }) {
  return (
    <View
      style={{
        borderRadius: organic.card,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <Image
        source={{ uri: entry.data.photo_url }}
        style={{
          width: '100%',
          height: 220,
        }}
        resizeMode="cover"
      />
      {entry.data.story ? (
        <View style={{ padding: 14 }}>
          <Text
            style={{ fontSize: 14, lineHeight: 20, color: colors.nachtblauw }}
          >
            {entry.data.story}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

function MilestoneCard({ entry }: { entry: Extract<TimelineEntry, { type: 'milestone' }> }) {
  return (
    <View
      style={{
        borderRadius: organic.card,
        backgroundColor: colors.goud.DEFAULT + '08',
        borderWidth: 1.5,
        borderColor: colors.goud.DEFAULT + '25',
        padding: 16,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 36,
            width: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: colors.goud.DEFAULT + '18',
          }}
        >
          <MilestoneFlag size={18} color={colors.goud.DEFAULT} strokeWidth={1.8} />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: colors.nachtblauw,
            }}
          >
            {entry.data.title}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: colors.goud.DEFAULT,
              fontWeight: '600',
              marginTop: 2,
            }}
          >
            {formatDateFull(entry.data.date)}
          </Text>
        </View>
        {entry.data.photo_url ? (
          <Image
            source={{ uri: entry.data.photo_url }}
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              marginLeft: 10,
            }}
            resizeMode="cover"
          />
        ) : null}
      </View>
      {entry.data.note ? (
        <Text
          style={{
            marginTop: 10,
            fontSize: 13,
            lineHeight: 19,
            color: '#6B7C8F',
          }}
        >
          {entry.data.note}
        </Text>
      ) : null}
    </View>
  );
}

const CATEGORY_LABELS: Record<string, string> = {
  klein: 'Klein gebaar',
  groot: 'Groot moment',
  grappig: 'Grappig',
  'wie-je-bent': 'Wie je bent',
};

function GratitudeCard({ entry }: { entry: Extract<TimelineEntry, { type: 'gratitude' }> }) {
  return (
    <View
      style={{
        borderRadius: organic.card,
        backgroundColor: '#FFFFFF',
        padding: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          lineHeight: 20,
          color: colors.nachtblauw,
        }}
      >
        {entry.data.text}
      </Text>
      <View
        style={{
          marginTop: 8,
          alignSelf: 'flex-start',
          borderRadius: 6,
          paddingHorizontal: 8,
          paddingVertical: 3,
          backgroundColor: colors.terracotta.DEFAULT + '10',
        }}
      >
        <Text
          style={{
            fontSize: 11,
            fontWeight: '600',
            color: colors.terracotta.DEFAULT,
          }}
        >
          {CATEGORY_LABELS[entry.data.category] ?? entry.data.category}
        </Text>
      </View>
    </View>
  );
}

function CheckInRow({ entry }: { entry: Extract<TimelineEntry, { type: 'checkin' }> }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text
        style={{ fontSize: 13, color: '#6B7C8F' }}
      >
        Stemming {entry.data.mood}/5, Verbinding {entry.data.pulse}/5
      </Text>
    </View>
  );
}

function ActivityRow({ entry }: { entry: Extract<TimelineEntry, { type: 'activity' }> }) {
  // Old gratitude entries saved as activity type - show with summary text
  if (entry.data.activityType === 'gratitude' && entry.data.summary) {
    return (
      <View
        style={{
          borderRadius: organic.card,
          backgroundColor: '#FFFFFF',
          padding: 14,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 1,
        }}
      >
        <Text style={{ fontSize: 14, lineHeight: 20, color: colors.nachtblauw }}>
          {entry.data.summary}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text
        style={{ fontSize: 13, color: '#6B7C8F', flex: 1 }}
        numberOfLines={1}
      >
        {entry.data.title}
      </Text>
    </View>
  );
}

function ReflectionCard({ entry }: { entry: Extract<TimelineEntry, { type: 'reflection' }> }) {
  return (
    <View
      style={{
        borderRadius: organic.card,
        backgroundColor: '#FFFFFF',
        padding: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          lineHeight: 20,
          color: colors.nachtblauw,
        }}
      >
        {entry.data.text}
      </Text>
      {entry.data.mood_tag ? (
        <View
          style={{
            marginTop: 8,
            alignSelf: 'flex-start',
            borderRadius: 6,
            paddingHorizontal: 8,
            paddingVertical: 3,
            backgroundColor: colors.salie.DEFAULT + '10',
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: '600',
              color: colors.salie.DEFAULT,
            }}
          >
            {entry.data.mood_tag}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export function TimelineCard({ entry }: TimelineCardProps) {
  switch (entry.type) {
    case 'moment':
      return <MomentCard entry={entry} />;
    case 'milestone':
      return <MilestoneCard entry={entry} />;
    case 'gratitude':
      return <GratitudeCard entry={entry} />;
    case 'checkin':
      return <CheckInRow entry={entry} />;
    case 'activity':
      return <ActivityRow entry={entry} />;
    case 'reflection':
      return <ReflectionCard entry={entry} />;
    default:
      return null;
  }
}
