/**
 * Recommendation engine for the Ontdek tab.
 * Derives life situations from onboarding data and
 * produces personalized activity recommendations.
 */

import { colors } from '@/lib/theme';
import { CARD_DECKS } from '@/content/card-decks';
import { TOPIC_ACTIVITIES } from '@/content/topic-activities';
import { dateIdeas } from '@/content/date-ideas';

// ---------------------------------------------------------------------------
// Life situations
// ---------------------------------------------------------------------------

export type SituationId =
  | 'net-samen'
  | 'samenwonen'
  | 'ouders'
  | 'verloofd-getrouwd'
  | 'band-versterken'
  | 'op-afstand';

export interface Situation {
  id: SituationId;
  title: string;
  subtitle: string;
  color: string;
  icon: string; // lucide icon name
  topics: string[];
}

export const ALL_SITUATIONS: Situation[] = [
  {
    id: 'net-samen',
    title: 'Net samen',
    subtitle: 'Leer elkaar nog beter kennen',
    color: colors.oceaan.DEFAULT,
    icon: 'Sparkles',
    topics: ['connectie', 'plezier', 'communicatie'],
  },
  {
    id: 'samenwonen',
    title: 'Samenwonen',
    subtitle: 'Samen een thuis bouwen',
    color: colors.salie.DEFAULT,
    icon: 'Home',
    topics: ['communicatie', 'werk', 'geld'],
  },
  {
    id: 'ouders',
    title: 'Ouders samen',
    subtitle: 'Jullie gezin, jullie team',
    color: colors.terracotta.DEFAULT,
    icon: 'Baby',
    topics: ['familie', 'werk', 'communicatie'],
  },
  {
    id: 'verloofd-getrouwd',
    title: 'Verloofd of getrouwd',
    subtitle: 'Groei samen verder',
    color: colors.goud.DEFAULT,
    icon: 'Gem',
    topics: ['groei', 'connectie', 'intimiteit'],
  },
  {
    id: 'band-versterken',
    title: 'Band versterken',
    subtitle: 'Investeer in jullie relatie',
    color: colors.terracotta.light,
    icon: 'HeartHandshake',
    topics: ['intimiteit', 'connectie', 'groei'],
  },
  {
    id: 'op-afstand',
    title: 'Op afstand',
    subtitle: 'Dichtbij ondanks de kilometers',
    color: colors.oceaan.light,
    icon: 'MapPin',
    topics: ['communicatie', 'connectie', 'plezier'],
  },
];

// ---------------------------------------------------------------------------
// Derive active situations from onboarding data
// ---------------------------------------------------------------------------

export interface OnboardingSnapshot {
  relationshipType: string | null;
  relationshipStartDate: string | null;
  duration: string | null;
  livingTogether: string | null;
  hasChildren: boolean | null;
  topics: string[];
}

export function deriveSituations(data: OnboardingSnapshot): Situation[] {
  const active: Situation[] = [];
  const byId = (id: SituationId) => ALL_SITUATIONS.find((s) => s.id === id)!;

  // Relationship duration
  let yearsRelation: number | null = null;
  if (data.relationshipStartDate) {
    const start = new Date(data.relationshipStartDate);
    yearsRelation = (Date.now() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  }

  const isNew =
    yearsRelation !== null
      ? yearsRelation < 1
      : data.duration === '0-6' || data.duration === '6-12';

  if (isNew || data.relationshipType === 'dating') {
    active.push(byId('net-samen'));
  }

  if (data.livingTogether === 'together') {
    active.push(byId('samenwonen'));
  }

  if (data.hasChildren === true) {
    active.push(byId('ouders'));
  }

  if (data.relationshipType === 'engaged' || data.relationshipType === 'married') {
    active.push(byId('verloofd-getrouwd'));
  }

  if (data.livingTogether === 'distance') {
    active.push(byId('op-afstand'));
  }

  // Always include "band versterken" as universal
  active.push(byId('band-versterken'));

  // Deduplicate (shouldn't happen, but safety)
  const seen = new Set<string>();
  return active.filter((s) => {
    if (seen.has(s.id)) return false;
    seen.add(s.id);
    return true;
  });
}

// ---------------------------------------------------------------------------
// Personalized recommendations
// ---------------------------------------------------------------------------

export type RecommendationType = 'deck' | 'activity' | 'date';

export interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  reason: string;
  color: string;
  /** route to navigate to */
  route: string;
  routeParams?: Record<string, string>;
}

/**
 * Generate a list of personalized recommendations based on onboarding data.
 * Returns 6-8 items mixing decks, topic activities and date ideas.
 */
export function getRecommendations(data: OnboardingSnapshot): Recommendation[] {
  const situations = deriveSituations(data);
  const relevantTopics = new Set<string>();

  // Collect topics from situations + user-chosen topics
  for (const s of situations) {
    for (const t of s.topics) relevantTopics.add(t);
  }
  for (const t of data.topics) relevantTopics.add(t);

  const recs: Recommendation[] = [];

  // 1. Recommend card decks based on situation
  const deckMap: Record<string, string[]> = {
    'net-samen': ['eerste-keer', 'lekker-lachen', 'dieper-verbinden'],
    'samenwonen': ['grenzen-behoeften', 'geld-toekomst'],
    'ouders': ['ouderschap-gezin', 'grenzen-behoeften'],
    'verloofd-getrouwd': ['toekomst-samen', 'dieper-verbinden'],
    'band-versterken': ['intimiteit-verlangen', 'dankbaarheid', 'dieper-verbinden'],
    'op-afstand': ['dieper-verbinden', 'dromen-wensen'],
  };

  const addedDecks = new Set<string>();
  for (const s of situations) {
    const deckIds = deckMap[s.id] ?? [];
    for (const deckId of deckIds) {
      if (addedDecks.has(deckId)) continue;
      const deck = CARD_DECKS.find((d) => d.id === deckId);
      if (!deck) continue;
      addedDecks.add(deckId);
      recs.push({
        id: `rec-deck-${deckId}`,
        type: 'deck',
        title: deck.title,
        reason: `Past bij: ${s.title}`,
        color: deck.color,
        route: '/activity/card-deck',
        routeParams: { deckId },
      });
    }
  }

  // 2. Recommend topic activities from relevant topics
  const topicActivities = TOPIC_ACTIVITIES.filter((a) => relevantTopics.has(a.topic));
  // Pick up to 3 diverse activities (different topics)
  const usedTopics = new Set<string>();
  for (const a of topicActivities) {
    if (usedTopics.has(a.topic)) continue;
    usedTopics.add(a.topic);
    const topicLabel = a.topic.charAt(0).toUpperCase() + a.topic.slice(1);
    recs.push({
      id: `rec-act-${a.id}`,
      type: 'activity',
      title: a.title,
      reason: topicLabel,
      color: colors.oceaan.DEFAULT,
      route: '/(tabs)/ontdek/[topic]',
      routeParams: { topic: a.topic },
    });
    if (usedTopics.size >= 3) break;
  }

  // 3. Recommend date ideas
  const hasBudget = relevantTopics.has('geld');
  const hasKids = data.hasChildren === true;
  // Pick 2 date ideas, prefer kid-friendly if they have kids
  const dates = [...dateIdeas].sort(() => Math.random() - 0.5);
  let dateCount = 0;
  for (const d of dates) {
    if (dateCount >= 2) break;
    // If has kids, boost kid-friendly dates
    if (hasKids && 'kidFriendly' in d && !(d as any).kidFriendly && Math.random() > 0.3) continue;
    // If budget-conscious, prefer gratis/goedkoop
    if (hasBudget && d.budget === 'uitgebreid' && Math.random() > 0.3) continue;
    recs.push({
      id: `rec-date-${d.id}`,
      type: 'date',
      title: d.title,
      reason: 'Date-idee',
      color: '#8B7EC8',
      route: '/activity/dates',
    });
    dateCount++;
  }

  // Limit to 8, shuffle a bit for variety
  return recs.slice(0, 8);
}

// ---------------------------------------------------------------------------
// Get activities for a specific situation
// ---------------------------------------------------------------------------

export function getActivitiesForSituation(situationId: SituationId) {
  const situation = ALL_SITUATIONS.find((s) => s.id === situationId);
  if (!situation) return { decks: [], activities: [], dates: [] };

  const deckMap: Record<string, string[]> = {
    'net-samen': ['eerste-keer', 'lekker-lachen', 'dieper-verbinden'],
    'samenwonen': ['grenzen-behoeften', 'geld-toekomst', 'toekomst-samen'],
    'ouders': ['ouderschap-gezin', 'grenzen-behoeften', 'dankbaarheid'],
    'verloofd-getrouwd': ['toekomst-samen', 'dieper-verbinden', 'intimiteit-verlangen'],
    'band-versterken': ['intimiteit-verlangen', 'dankbaarheid', 'dieper-verbinden', 'moeilijke-gesprekken'],
    'op-afstand': ['dieper-verbinden', 'dromen-wensen', 'dankbaarheid'],
  };

  const deckIds = deckMap[situationId] ?? [];
  const decks = deckIds
    .map((id) => CARD_DECKS.find((d) => d.id === id))
    .filter(Boolean);

  const activities = TOPIC_ACTIVITIES.filter((a) =>
    situation.topics.includes(a.topic),
  );

  const dates = dateIdeas.slice(0, 12); // Show a selection

  return { decks, activities, dates };
}
