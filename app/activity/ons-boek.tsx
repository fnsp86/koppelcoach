import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, BookOpen, Sparkles, Download, Lock } from 'lucide-react-native';
import { colors } from '@/lib/theme';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';
import { usePartnerStore } from '@/lib/stores/partner-store';
import { usePremiumStore } from '@/lib/stores/premium-store';
import { supabase } from '@/lib/supabase';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import type { TimelineEntry } from '@/lib/types';

const MONTH_NAMES = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
];

function formatDate(dateString: string): string {
  const d = new Date(dateString);
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

type Chapter = {
  title: string;
  period: string;
  entries: TimelineEntry[];
  aiSummary?: string;
};

function buildChapters(
  entries: TimelineEntry[],
  relationshipStartDate: string | null,
  livingTogetherDate: string | null,
  childBirthDates: string[],
): Chapter[] {
  const sorted = [...entries].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  if (sorted.length === 0 && !relationshipStartDate) return [];

  // Group by year
  const yearGroups = new Map<number, TimelineEntry[]>();
  sorted.forEach((entry) => {
    const year = new Date(entry.created_at).getFullYear();
    if (!yearGroups.has(year)) yearGroups.set(year, []);
    yearGroups.get(year)!.push(entry);
  });

  // Add auto-entries years too
  if (relationshipStartDate) {
    const year = new Date(relationshipStartDate).getFullYear();
    if (!yearGroups.has(year)) yearGroups.set(year, []);
  }
  if (livingTogetherDate) {
    const year = new Date(livingTogetherDate).getFullYear();
    if (!yearGroups.has(year)) yearGroups.set(year, []);
  }
  childBirthDates.forEach((d) => {
    const year = new Date(d).getFullYear();
    if (!yearGroups.has(year)) yearGroups.set(year, []);
  });

  const chapters: Chapter[] = [];
  const sortedYears = Array.from(yearGroups.keys()).sort();

  sortedYears.forEach((year) => {
    const yearEntries = yearGroups.get(year) ?? [];

    // Build chapter title based on significant events
    let title = String(year);
    const milestones = yearEntries.filter((e) => e.type === 'milestone');
    if (milestones.length > 0) {
      title = milestones[0].data.title;
    } else if (relationshipStartDate && new Date(relationshipStartDate).getFullYear() === year) {
      title = 'Het begin';
    }

    chapters.push({
      title,
      period: String(year),
      entries: yearEntries,
    });
  });

  return chapters;
}

function generateBookHtml(
  chapters: Chapter[],
  userName: string,
  partnerName: string,
  relationshipStartDate: string | null,
): string {
  const coverDate = relationshipStartDate
    ? formatDate(relationshipStartDate)
    : 'Ons verhaal';

  let html = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <style>
      @page { margin: 40px; size: A4; }
      body {
        font-family: Georgia, 'Times New Roman', serif;
        color: #1B2838;
        background: #FBF9F6;
        line-height: 1.6;
      }
      .cover {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        page-break-after: always;
      }
      .cover h1 {
        font-size: 48px;
        color: #C4704B;
        margin-bottom: 8px;
        letter-spacing: 2px;
      }
      .cover .subtitle {
        font-size: 20px;
        color: #6B7C8F;
        margin-bottom: 40px;
      }
      .cover .names {
        font-size: 28px;
        color: #1B2838;
        font-weight: bold;
      }
      .cover .date {
        font-size: 16px;
        color: #C4704B;
        margin-top: 12px;
      }
      .cover .ornament {
        width: 60px;
        height: 2px;
        background: #C4704B;
        margin: 24px auto;
      }
      .chapter {
        page-break-before: always;
        padding-top: 40px;
      }
      .chapter:first-of-type {
        page-break-before: auto;
      }
      .chapter-title {
        font-size: 28px;
        color: #C4704B;
        margin-bottom: 4px;
      }
      .chapter-period {
        font-size: 14px;
        color: #6B7C8F;
        margin-bottom: 24px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .ai-summary {
        font-size: 16px;
        line-height: 1.8;
        color: #2A3444;
        margin-bottom: 28px;
        padding: 20px;
        background: #F2EBE4;
        border-radius: 8px;
        border-left: 3px solid #C4704B;
        font-style: italic;
      }
      .entry {
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 1px solid #E8DDD3;
      }
      .entry:last-child { border-bottom: none; }
      .entry-date {
        font-size: 12px;
        color: #9CA3AF;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .entry-type {
        display: inline-block;
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 4px;
        margin-left: 8px;
      }
      .type-milestone { background: #D4A84315; color: #D4A843; }
      .type-reflection { background: #7A9E7E15; color: #7A9E7E; }
      .type-gratitude { background: #C4704B15; color: #C4704B; }
      .type-checkin { background: #5B8FA815; color: #5B8FA8; }
      .type-moment { background: #C4704B15; color: #C4704B; }
      .entry-title {
        font-size: 18px;
        font-weight: bold;
        margin-top: 4px;
        color: #1B2838;
      }
      .entry-text {
        font-size: 15px;
        margin-top: 4px;
        color: #2A3444;
      }
      .entry-mood {
        font-size: 13px;
        color: #6B7C8F;
        margin-top: 4px;
      }
    </style>
    </head>
    <body>
    <div class="cover">
      <h1>Samen</h1>
      <div class="subtitle">Ons verhaal</div>
      <div class="ornament"></div>
      <div class="names">${userName || 'Jij'} & ${partnerName || 'Partner'}</div>
      <div class="date">${coverDate}</div>
    </div>
  `;

  const typeLabels: Record<string, string> = {
    milestone: 'Mijlpaal',
    reflection: 'Herinnering',
    gratitude: 'Dankbaarheid',
    checkin: 'Check-in',
    moment: 'Moment',
    activity: 'Activiteit',
  };

  chapters.forEach((chapter) => {
    html += `
      <div class="chapter">
        <div class="chapter-title">${chapter.title}</div>
        <div class="chapter-period">${chapter.period}</div>
    `;

    if (chapter.aiSummary) {
      html += `<div class="ai-summary">${chapter.aiSummary}</div>`;
    }

    chapter.entries.forEach((entry) => {
      html += `<div class="entry">`;
      html += `<span class="entry-date">${formatDate(entry.created_at)}</span>`;
      html += `<span class="entry-type type-${entry.type}">${typeLabels[entry.type] ?? entry.type}</span>`;

      switch (entry.type) {
        case 'milestone':
          html += `<div class="entry-title">${entry.data.title}</div>`;
          if (entry.data.note) html += `<div class="entry-text">${entry.data.note}</div>`;
          break;
        case 'reflection':
          html += `<div class="entry-text">${entry.data.text}</div>`;
          if (entry.data.mood_tag) html += `<div class="entry-mood">${entry.data.mood_tag}</div>`;
          break;
        case 'gratitude':
          html += `<div class="entry-text">${entry.data.text}</div>`;
          break;
        case 'checkin':
          html += `<div class="entry-mood">Stemming ${entry.data.mood}/5 - Verbinding ${entry.data.pulse}/5</div>`;
          break;
        case 'moment':
          if (entry.data.story) html += `<div class="entry-text">${entry.data.story}</div>`;
          break;
        case 'activity':
          html += `<div class="entry-text">${entry.data.title}</div>`;
          if (entry.data.summary) html += `<div class="entry-text">${entry.data.summary}</div>`;
          break;
      }

      html += `</div>`;
    });

    html += `</div>`;
  });

  html += `</body></html>`;
  return html;
}

export default function OnsBoekScreen() {
  const storeEntries = useVerhaalStore((s) => s.entries);
  const relationshipStartDate = useOnboardingStore((s) => s.relationshipStartDate);
  const livingTogetherDate = useOnboardingStore((s) => s.livingTogetherDate);
  const childBirthDates = useOnboardingStore((s) => s.childBirthDates);
  const userName = useOnboardingStore((s) => s.name);
  const partnerName = usePartnerStore((s) => s.partnerName);
  const isPremium = usePremiumStore((s) => s.isPremium);

  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);
  const [aiChapters, setAiChapters] = useState<Map<string, string>>(new Map());

  // Build auto-entries (same logic as verhaal/index.tsx)
  const autoEntries = useMemo((): TimelineEntry[] => {
    const auto: TimelineEntry[] = [];
    if (relationshipStartDate) {
      const d = new Date(relationshipStartDate);
      auto.push({
        id: 'auto-relationship-start',
        created_at: d.toISOString(),
        type: 'milestone',
        data: {
          title: `Samen sinds ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`,
          date: d.toISOString().split('T')[0],
          milestone_type: 'eerste-date',
        },
      });
    }
    if (livingTogetherDate) {
      const d = new Date(livingTogetherDate);
      auto.push({
        id: 'auto-living-together',
        created_at: d.toISOString(),
        type: 'milestone',
        data: {
          title: `Samen gaan wonen`,
          date: d.toISOString().split('T')[0],
          milestone_type: 'samenwonen',
        },
      });
    }
    if (childBirthDates) {
      childBirthDates.forEach((dateStr, i) => {
        const d = new Date(dateStr);
        auto.push({
          id: `auto-child-${i}`,
          created_at: d.toISOString(),
          type: 'milestone',
          data: {
            title: childBirthDates.length === 1 ? 'Jullie kindje geboren' : `Kind ${i + 1} geboren`,
            date: d.toISOString().split('T')[0],
            milestone_type: 'kind-geboren' as any,
          },
        });
      });
    }
    return auto;
  }, [relationshipStartDate, livingTogetherDate, childBirthDates]);

  const allEntries = useMemo(() => [...storeEntries, ...autoEntries], [storeEntries, autoEntries]);

  const chapters = useMemo(
    () => buildChapters(allEntries, relationshipStartDate, livingTogetherDate, childBirthDates),
    [allEntries, relationshipStartDate, livingTogetherDate, childBirthDates],
  );

  const totalEntries = allEntries.length;
  const milestoneCount = allEntries.filter((e) => e.type === 'milestone').length;
  const reflectionCount = allEntries.filter((e) => e.type === 'reflection' || e.type === 'gratitude').length;

  const handleExportPdf = async () => {
    if (!isPremium) {
      Alert.alert('Samen Premium', 'Exporteer jullie verhaal als boek met Samen Premium.');
      return;
    }

    setGeneratingPdf(true);
    try {
      const html = generateBookHtml(chapters, userName, partnerName ?? '', relationshipStartDate);
      const { uri } = await Print.printToFileAsync({ html, base64: false });
      setGeneratingPdf(false);

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Deel jullie verhaal',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('PDF opgeslagen', `Het bestand is opgeslagen op: ${uri}`);
      }
    } catch (e) {
      setGeneratingPdf(false);
      Alert.alert('Fout', 'Kon het boek niet genereren. Probeer het opnieuw.');
    }
  };

  const handleGenerateAiSummary = async () => {
    if (!isPremium) {
      Alert.alert('Samen Premium', 'AI-samenvattingen zijn beschikbaar met Samen Premium.');
      return;
    }

    if (chapters.length === 0) {
      Alert.alert('Geen data', 'Voeg eerst herinneringen toe aan jullie verhaal.');
      return;
    }

    setGeneratingAi(true);
    try {
      const chaptersData = chapters.map((ch) => ({
        title: ch.title,
        period: ch.period,
        entries: ch.entries.map((e) => ({
          type: e.type,
          data: e.data,
          date: e.created_at,
        })),
      }));

      const { data, error } = await supabase.functions.invoke('generate-book-summary', {
        body: {
          chapters: chaptersData,
          userName: userName || 'Jij',
          partnerName: partnerName || 'Partner',
        },
      });

      if (error) throw error;

      if (data?.summaries && Array.isArray(data.summaries)) {
        const newMap = new Map<string, string>();
        data.summaries.forEach((s: { period: string; summary: string }) => {
          newMap.set(s.period, s.summary);
        });
        setAiChapters(newMap);

        // Also update chapters in-place for PDF export
        chapters.forEach((ch) => {
          const summary = newMap.get(ch.period);
          if (summary) ch.aiSummary = summary;
        });
      }

      setGeneratingAi(false);
    } catch (e: any) {
      setGeneratingAi(false);
      Alert.alert(
        'Samenvatting niet beschikbaar',
        'De AI-samenvatting is op dit moment niet beschikbaar. Probeer het later opnieuw.',
      );
    }
  };

  const typeLabels: Record<string, string> = {
    milestone: 'Mijlpaal',
    reflection: 'Herinnering',
    gratitude: 'Dankbaarheid',
    checkin: 'Check-in',
    moment: 'Moment',
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      {/* Header */}
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
        <Text style={{ color: colors.nachtblauw, fontSize: 18, fontWeight: '700', marginLeft: 12 }}>
          Ons Boek
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Book cover preview */}
        <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              padding: 32,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.zand.DEFAULT,
              shadowColor: colors.terracotta.dark,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                backgroundColor: colors.terracotta.DEFAULT + '12',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}
            >
              <BookOpen size={26} color={colors.terracotta.DEFAULT} strokeWidth={1.5} />
            </View>

            <Text style={{ fontSize: 32, fontWeight: '700', color: colors.terracotta.DEFAULT, letterSpacing: 1 }}>
              Samen
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7C8F', marginTop: 4 }}>
              Ons verhaal
            </Text>

            <View style={{ width: 40, height: 2, backgroundColor: colors.terracotta.DEFAULT, marginVertical: 16 }} />

            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.nachtblauw }}>
              {userName || 'Jij'} & {partnerName || 'Partner'}
            </Text>
            {relationshipStartDate && (
              <Text style={{ fontSize: 13, color: colors.terracotta.DEFAULT, marginTop: 6 }}>
                Samen sinds {formatDate(relationshipStartDate)}
              </Text>
            )}

            {/* Stats */}
            <View style={{ flexDirection: 'row', marginTop: 20, gap: 24 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: '700', color: colors.nachtblauw }}>{chapters.length}</Text>
                <Text style={{ fontSize: 12, color: '#6B7C8F' }}>Hoofdstukken</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: '700', color: colors.nachtblauw }}>{milestoneCount}</Text>
                <Text style={{ fontSize: 12, color: '#6B7C8F' }}>Mijlpalen</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 22, fontWeight: '700', color: colors.nachtblauw }}>{reflectionCount}</Text>
                <Text style={{ fontSize: 12, color: '#6B7C8F' }}>Herinneringen</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action buttons */}
        <View style={{ paddingHorizontal: 24, marginTop: 20, gap: 10 }}>
          <TouchableOpacity
            onPress={handleGenerateAiSummary}
            activeOpacity={0.8}
            disabled={generatingAi}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.terracotta.DEFAULT,
              borderRadius: 16,
              paddingVertical: 16,
              opacity: generatingAi ? 0.6 : 1,
            }}
          >
            {generatingAi ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Sparkles size={18} color="#FFFFFF" strokeWidth={2} />
            )}
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginLeft: 8 }}>
              {generatingAi ? 'Samenvatting maken...' : 'AI Samenvatting genereren'}
            </Text>
            {!isPremium && <Lock size={14} color="#FFFFFF" strokeWidth={2} style={{ marginLeft: 8 }} />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleExportPdf}
            activeOpacity={0.8}
            disabled={generatingPdf}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              paddingVertical: 16,
              borderWidth: 1.5,
              borderColor: colors.terracotta.DEFAULT,
              opacity: generatingPdf ? 0.6 : 1,
            }}
          >
            {generatingPdf ? (
              <ActivityIndicator size="small" color={colors.terracotta.DEFAULT} />
            ) : (
              <Download size={18} color={colors.terracotta.DEFAULT} strokeWidth={2} />
            )}
            <Text style={{ color: colors.terracotta.DEFAULT, fontSize: 16, fontWeight: '700', marginLeft: 8 }}>
              {generatingPdf ? 'PDF maken...' : 'Exporteer als PDF'}
            </Text>
            {!isPremium && <Lock size={14} color={colors.terracotta.DEFAULT} strokeWidth={2} style={{ marginLeft: 8 }} />}
          </TouchableOpacity>
        </View>

        {/* Chapters preview */}
        <View style={{ paddingHorizontal: 24, marginTop: 28 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginBottom: 16 }}>
            Hoofdstukken
          </Text>

          {chapters.length === 0 ? (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 24,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.zand.DEFAULT,
              }}
            >
              <Text style={{ fontSize: 14, color: '#6B7C8F', textAlign: 'center' }}>
                Jullie verhaal is nog leeg. Voeg herinneringen toe via Ons Verhaal om hier hoofdstukken te zien.
              </Text>
            </View>
          ) : (
            chapters.map((chapter, i) => (
              <View
                key={chapter.period}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  padding: 18,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: colors.zand.DEFAULT,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Hoofdstuk {i + 1}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#D1D5DB', marginHorizontal: 8 }}>-</Text>
                  <Text style={{ fontSize: 12, color: '#9CA3AF' }}>{chapter.period}</Text>
                </View>

                <Text style={{ fontSize: 17, fontWeight: '700', color: colors.nachtblauw, marginBottom: 10 }}>
                  {chapter.title}
                </Text>

                {(chapter.aiSummary || aiChapters.get(chapter.period)) && (
                  <Text style={{ fontSize: 14, lineHeight: 22, color: '#6B7C8F', fontStyle: 'italic', marginBottom: 10 }}>
                    {chapter.aiSummary || aiChapters.get(chapter.period)}
                  </Text>
                )}

                {/* Entry previews */}
                {chapter.entries.slice(0, 3).map((entry) => (
                  <View
                    key={entry.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 6,
                    }}
                  >
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: typeColors[entry.type] ?? '#9CA3AF',
                        marginRight: 10,
                      }}
                    />
                    <Text style={{ fontSize: 13, color: '#6B7C8F', flex: 1 }} numberOfLines={1}>
                      {entry.type === 'milestone' ? entry.data.title :
                       entry.type === 'reflection' ? entry.data.text :
                       entry.type === 'gratitude' ? entry.data.text :
                       entry.type === 'checkin' ? `Stemming ${entry.data.mood}/5` :
                       entry.type === 'moment' ? (entry.data.story || 'Foto') :
                       entry.type === 'activity' ? entry.data.title : ''}
                    </Text>
                    <Text style={{ fontSize: 11, color: '#D1D5DB', marginLeft: 8 }}>
                      {formatDate(entry.created_at).split(' ').slice(0, 2).join(' ')}
                    </Text>
                  </View>
                ))}

                {chapter.entries.length > 3 && (
                  <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>
                    + {chapter.entries.length - 3} meer
                  </Text>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
