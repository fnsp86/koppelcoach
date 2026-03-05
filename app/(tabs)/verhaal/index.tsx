import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TrendingUp, Plus, ChevronDown, ChevronUp, BookOpen } from 'lucide-react-native';
import { GradientHeader } from '@/components/ui/GradientHeader';
import { TimelineCard, getDotColor, isCompactEntry } from '@/components/ui/TimelineCard';
import {
  TabVerhaal,
  MomentCamera,
  ReflectionPen,
  MilestoneFlag,
} from '@/components/icons';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';
import { colors, organic } from '@/lib/theme';
import type { TimelineEntry } from '@/lib/types';

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December',
];

const LINE_WIDTH = 2;
const DOT_SIZE_SMALL = 10;
const DOT_SIZE_BIG = 14;
const CONTENT_LEFT = 48; // left edge of card content

type SectionItem =
  | { kind: 'header'; key: string; monthKey: string; label: string; entryCount: number; isCollapsible: boolean }
  | { kind: 'entry'; key: string; entry: TimelineEntry; isLast: boolean }
  | { kind: 'collapsed-summary'; key: string; monthKey: string; entries: TimelineEntry[] }
  | { kind: 'origin'; key: string };

function getRecentMonthKeys(): Set<string> {
  const now = new Date();
  const currentKey = `${now.getFullYear()}-${now.getMonth()}`;
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevKey = `${prev.getFullYear()}-${prev.getMonth()}`;
  return new Set([currentKey, prevKey]);
}

function buildSections(
  entries: TimelineEntry[],
  collapsedMonths: Set<string>,
): SectionItem[] {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  // Group by month
  const monthGroups: { monthKey: string; label: string; entries: TimelineEntry[] }[] = [];
  let currentGroup: { monthKey: string; label: string; entries: TimelineEntry[] } | null = null;

  sorted.forEach((entry) => {
    const date = new Date(entry.created_at);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    const monthLabel = `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

    if (!currentGroup || currentGroup.monthKey !== monthKey) {
      currentGroup = { monthKey, label: monthLabel, entries: [] };
      monthGroups.push(currentGroup);
    }
    currentGroup.entries.push(entry);
  });

  const recentKeys = getRecentMonthKeys();
  const items: SectionItem[] = [];
  let globalIndex = 0;

  monthGroups.forEach((group) => {
    const isCollapsible = !recentKeys.has(group.monthKey);
    const isCollapsed = collapsedMonths.has(group.monthKey);

    items.push({
      kind: 'header',
      key: `header-${group.monthKey}`,
      monthKey: group.monthKey,
      label: group.label,
      entryCount: group.entries.length,
      isCollapsible,
    });

    if (isCollapsible && isCollapsed) {
      items.push({
        kind: 'collapsed-summary',
        key: `summary-${group.monthKey}`,
        monthKey: group.monthKey,
        entries: group.entries,
      });
      globalIndex += group.entries.length;
    } else {
      group.entries.forEach((entry) => {
        globalIndex++;
        items.push({
          kind: 'entry',
          key: entry.id,
          entry,
          isLast: globalIndex === sorted.length,
        });
      });
    }
  });

  if (sorted.length > 0) {
    items.push({ kind: 'origin', key: 'origin' });
  }

  return items;
}

function formatEntryDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const months = [
    'jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
    'jul', 'aug', 'sep', 'okt', 'nov', 'dec',
  ];
  return `${day} ${months[date.getMonth()]}`;
}

function MonthHeader({
  label,
  entryCount,
  isCollapsible,
  isCollapsed,
  onToggle,
}: {
  label: string;
  entryCount: number;
  isCollapsible: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
}) {
  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 20 }}>
      {/* Timeline column */}
      <View style={{ width: CONTENT_LEFT, alignItems: 'center' }}>
        <View style={styles.lineSegment} />
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.zand.dark,
          }}
        />
        <View style={[styles.lineSegment, { height: 12 }]} />
      </View>
      {/* Month label + count + chevron */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 16 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '700',
            color: '#9CA3AF',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            flex: 1,
          }}
        >
          {label}
        </Text>
        {isCollapsible && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
              {entryCount}
            </Text>
            {isCollapsed ? (
              <ChevronDown size={14} color="#9CA3AF" strokeWidth={2} />
            ) : (
              <ChevronUp size={14} color="#9CA3AF" strokeWidth={2} />
            )}
          </View>
        )}
      </View>
    </View>
  );

  if (isCollapsible) {
    return (
      <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

function CollapsedSummary({
  entries,
  onExpand,
}: {
  entries: TimelineEntry[];
  onExpand: () => void;
}) {
  // Collect photo thumbnails (moments + milestones with photos)
  const photoUrls: string[] = [];
  entries.forEach((e) => {
    if (e.type === 'moment' && e.data.photo_url) {
      photoUrls.push(e.data.photo_url);
    } else if (e.type === 'milestone' && e.data.photo_url) {
      photoUrls.push(e.data.photo_url);
    }
  });
  const shownPhotos = photoUrls.slice(0, 4);
  const extraPhotos = photoUrls.length - shownPhotos.length;

  // Count by type for colored dots
  const typeCounts = new Map<string, number>();
  entries.forEach((e) => {
    typeCounts.set(e.type, (typeCounts.get(e.type) ?? 0) + 1);
  });

  // Build summary text
  const parts: string[] = [];
  const photoCount = photoUrls.length;
  const textCount = entries.filter(
    (e) => e.type === 'reflection' || e.type === 'gratitude',
  ).length;
  const milestoneCount = entries.filter((e) => e.type === 'milestone').length;
  const otherCount = entries.length - photoCount - textCount - milestoneCount;

  if (photoCount > 0) parts.push(`${photoCount} foto${photoCount > 1 ? "'s" : ''}`);
  if (milestoneCount > 0) parts.push(`${milestoneCount} mijlpaal${milestoneCount > 1 ? '' : ''}`);
  if (textCount > 0) parts.push(`${textCount} herinnering${textCount > 1 ? 'en' : ''}`);
  if (otherCount > 0) parts.push(`${otherCount} overig`);

  return (
    <TouchableOpacity onPress={onExpand} activeOpacity={0.7}>
      <View style={{ flexDirection: 'row', paddingRight: 20 }}>
        {/* Timeline column */}
        <View style={{ width: CONTENT_LEFT, alignItems: 'center' }}>
          <View style={{ flex: 1, width: LINE_WIDTH, backgroundColor: colors.zand.DEFAULT }} />
        </View>

        {/* Summary content */}
        <View style={{ flex: 1, paddingBottom: 8, paddingTop: 2 }}>
          {/* Photo thumbnails row */}
          {shownPhotos.length > 0 && (
            <View style={{ flexDirection: 'row', gap: 6, marginBottom: 8 }}>
              {shownPhotos.map((url, i) => (
                <Image
                  key={i}
                  source={{ uri: url }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    backgroundColor: colors.zand.DEFAULT,
                  }}
                  resizeMode="cover"
                />
              ))}
              {extraPhotos > 0 && (
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    backgroundColor: colors.zand.DEFAULT,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: '600', color: '#9CA3AF' }}>
                    +{extraPhotos}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Type dots + summary text */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            {Array.from(typeCounts.entries()).map(([type]) => (
              <View
                key={type}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: getDotColor(type as TimelineEntry['type']),
                }}
              />
            ))}
            <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
              {parts.join(', ')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function TimelineEntryRow({ entry, isLast }: { entry: TimelineEntry; isLast: boolean }) {
  const dotColor = getDotColor(entry.type);
  const compact = isCompactEntry(entry.type);
  const isMilestone = entry.type === 'milestone';
  const dotSize = isMilestone ? DOT_SIZE_BIG : DOT_SIZE_SMALL;

  const handlePress = () => {
    if (!entry.id.startsWith('auto-')) {
      router.push(`/activity/timeline-detail?id=${entry.id}` as any);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <View style={{ flexDirection: 'row', paddingRight: 20 }}>
        {/* Timeline column: line + dot */}
        <View style={{ width: CONTENT_LEFT, alignItems: 'center' }}>
          <View style={styles.lineSegment} />
          <View
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: dotColor,
            }}
          />
          {!isLast ? (
            <View style={{ flex: 1, width: LINE_WIDTH, backgroundColor: colors.zand.DEFAULT }} />
          ) : (
            <View style={{ flex: 1 }} />
          )}
        </View>

        {/* Entry content */}
        <View style={{ flex: 1, paddingBottom: compact ? 8 : 16, paddingTop: 2 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '600',
              color: '#9CA3AF',
              marginBottom: compact ? 2 : 6,
            }}
          >
            {formatEntryDate(entry.created_at)}
          </Text>
          <TimelineCard entry={entry} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function OriginMarker() {
  return (
    <View style={{ flexDirection: 'row', paddingRight: 20 }}>
      <View style={{ width: CONTENT_LEFT, alignItems: 'center' }}>
        <View style={{ height: 8, width: LINE_WIDTH, backgroundColor: colors.zand.DEFAULT }} />
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: colors.terracotta.DEFAULT + '20',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.terracotta.DEFAULT,
            }}
          />
        </View>
      </View>
      <View style={{ paddingTop: 4, paddingBottom: 40 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '600',
            color: colors.terracotta.DEFAULT,
          }}
        >
          Het begin van jullie verhaal
        </Text>
      </View>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingTop: 80 }}>
      <View
        style={{
          marginBottom: 24,
          height: 96,
          width: 96,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 48,
          backgroundColor: colors.zand.DEFAULT + '60',
        }}
      >
        <TabVerhaal size={64} color="#6B7C8F" strokeWidth={1.2} />
      </View>
      <Text
        style={{
          marginBottom: 8,
          textAlign: 'center',
          fontSize: 20,
          fontWeight: '700',
          color: colors.nachtblauw,
        }}
      >
        Jullie verhaal begint hier
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 14,
          lineHeight: 20,
          color: '#6B7C8F',
        }}
      >
        Voeg je eerste herinnering toe via de + knop
      </Text>
    </View>
  );
}

function useAutoEntries(): TimelineEntry[] {
  const relationshipStartDate = useOnboardingStore((s) => s.relationshipStartDate);
  const livingTogether = useOnboardingStore((s) => s.livingTogether);
  const livingTogetherDate = useOnboardingStore((s) => s.livingTogetherDate);
  const childBirthDates = useOnboardingStore((s) => s.childBirthDates);
  const childCount = useOnboardingStore((s) => s.childCount);

  return useMemo(() => {
    const auto: TimelineEntry[] = [];

    if (relationshipStartDate) {
      const d = new Date(relationshipStartDate);
      const monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
      auto.push({
        id: 'auto-relationship-start',
        created_at: d.toISOString(),
        type: 'milestone',
        data: {
          title: `Samen sinds ${monthNames[d.getMonth()]} ${d.getFullYear()}`,
          date: d.toISOString().split('T')[0],
          milestone_type: 'eerste-date',
        },
      });
    }

    if (livingTogether === 'together' && livingTogetherDate) {
      const d = new Date(livingTogetherDate);
      const monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
      auto.push({
        id: 'auto-living-together',
        created_at: d.toISOString(),
        type: 'milestone',
        data: {
          title: `Samen gaan wonen - ${monthNames[d.getMonth()]} ${d.getFullYear()}`,
          date: d.toISOString().split('T')[0],
          milestone_type: 'samenwonen',
        },
      });
    }

    if (childBirthDates && childBirthDates.length > 0) {
      childBirthDates.forEach((dateStr, i) => {
        const d = new Date(dateStr);
        const monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
        const label = childCount === 1
          ? 'Jullie kindje geboren'
          : `Kind ${i + 1} geboren`;
        auto.push({
          id: `auto-child-${i}`,
          created_at: d.toISOString(),
          type: 'milestone',
          data: {
            title: `${label} - ${monthNames[d.getMonth()]} ${d.getFullYear()}`,
            date: d.toISOString().split('T')[0],
            milestone_type: 'kind',
          },
        });
      });
    }

    return auto;
  }, [relationshipStartDate, livingTogether, livingTogetherDate, childBirthDates, childCount]);
}

export default function VerhaalScreen() {
  const storeEntries = useVerhaalStore((s) => s.entries);
  const autoEntries = useAutoEntries();
  const entries = useMemo(() => [...storeEntries, ...autoEntries], [storeEntries, autoEntries]);
  const [menuVisible, setMenuVisible] = useState(false);

  // Old months start collapsed
  const [collapsedMonths, setCollapsedMonths] = useState<Set<string>>(() => {
    const recentKeys = getRecentMonthKeys();
    const collapsed = new Set<string>();
    entries.forEach((e) => {
      const date = new Date(e.created_at);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      if (!recentKeys.has(monthKey)) {
        collapsed.add(monthKey);
      }
    });
    return collapsed;
  });

  const toggleMonth = useCallback((monthKey: string) => {
    setCollapsedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(monthKey)) {
        next.delete(monthKey);
      } else {
        next.add(monthKey);
      }
      return next;
    });
  }, []);

  const sections = useMemo(
    () => buildSections(entries, collapsedMonths),
    [entries, collapsedMonths],
  );

  const toggleMenu = useCallback(() => setMenuVisible((v) => !v), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  const renderItem = useCallback(({ item }: { item: SectionItem }) => {
    if (item.kind === 'header') {
      return (
        <MonthHeader
          label={item.label}
          entryCount={item.entryCount}
          isCollapsible={item.isCollapsible}
          isCollapsed={collapsedMonths.has(item.monthKey)}
          onToggle={() => toggleMonth(item.monthKey)}
        />
      );
    }

    if (item.kind === 'collapsed-summary') {
      return (
        <CollapsedSummary
          entries={item.entries}
          onExpand={() => toggleMonth(item.monthKey)}
        />
      );
    }

    if (item.kind === 'origin') {
      return <OriginMarker />;
    }

    return <TimelineEntryRow entry={item.entry} isLast={item.isLast} />;
  }, [collapsedMonths, toggleMonth]);

  const keyExtractor = useCallback((item: SectionItem) => item.key, []);

  const hasEntries = entries.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      <GradientHeader
        title="Ons Verhaal"
        rightElement={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: colors.zand.DEFAULT,
              }}
              activeOpacity={0.7}
              onPress={() => router.push('/activity/ons-boek' as any)}
            >
              <BookOpen size={18} color={colors.nachtblauw} strokeWidth={1.8} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: colors.zand.DEFAULT,
              }}
              activeOpacity={0.7}
              onPress={() => router.push('/activity/inzichten' as any)}
            >
              <TrendingUp size={18} color={colors.nachtblauw} strokeWidth={1.8} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: colors.terracotta.DEFAULT,
              }}
              activeOpacity={0.7}
              onPress={toggleMenu}
            >
              <Plus size={20} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        }
      />

      {hasEntries ? (
        <FlatList
          data={sections}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState />
      )}

      {menuVisible && (
        <>
          <Pressable
            onPress={closeMenu}
            style={StyleSheet.absoluteFill}
          />
          <View
            style={{
              position: 'absolute',
              top: 100,
              right: 16,
              borderRadius: organic.card,
              backgroundColor: '#FFFFFF',
              overflow: 'hidden',
              elevation: 11,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.14,
              shadowRadius: 12,
            }}
          >
            {[
              {
                icon: <MomentCamera size={22} color={colors.terracotta.DEFAULT} strokeWidth={1.8} />,
                label: 'Foto toevoegen',
                route: '/activity/verhaal-entry?type=moment',
              },
              {
                icon: <ReflectionPen size={22} color={colors.salie.DEFAULT} strokeWidth={1.8} />,
                label: 'Schrijf een herinnering',
                route: '/activity/verhaal-entry?type=reflection',
              },
              {
                icon: <MilestoneFlag size={22} color={colors.goud.DEFAULT} strokeWidth={1.8} />,
                label: 'Mijlpaal markeren',
                route: '/activity/verhaal-entry?type=milestone',
              },
            ].map((option, index, arr) => (
              <TouchableOpacity
                key={option.label}
                onPress={() => {
                  closeMenu();
                  router.push(option.route as any);
                }}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  ...(index < arr.length - 1
                    ? { borderBottomWidth: 1, borderBottomColor: colors.zand.DEFAULT }
                    : {}),
                }}
              >
                <View
                  style={{
                    marginRight: 12,
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    backgroundColor: colors.zand.light,
                  }}
                >
                  {option.icon}
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: colors.nachtblauw,
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lineSegment: {
    width: LINE_WIDTH,
    height: 8,
    backgroundColor: colors.zand.DEFAULT,
  },
});
