import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GradientHeader } from '@/components/ui/GradientHeader';
import { WarmCard } from '@/components/ui/WarmCard';
import { colors, organic, warmShadow } from '@/lib/theme';
import { TOPIC_ACTIVITIES } from '@/content/topic-activities';
import { CARD_DECKS } from '@/content/card-decks';
import { useOnboardingStore } from '@/lib/stores/onboarding-store';
import { useBookmarksStore } from '@/lib/stores/bookmarks-store';
import {
  deriveSituations,
  getRecommendations,
  type Situation,
  type Recommendation,
} from '@/lib/recommendations';
import {
  Search,
  MessageCircle,
  Gamepad2,
  HelpCircle,
  MessageSquare,
  ShieldAlert,
  Flame,
  Link2,
  TrendingUp,
  Wallet,
  PartyPopper,
  Briefcase,
  Users,
  X,
  Layers,
  Lightbulb,
  CalendarHeart,
  ChevronRight,
  Sparkles,
  Home,
  Baby,
  Gem,
  HeartHandshake,
  MapPin,
  Star,
  Bookmark,
} from 'lucide-react-native';

// Icon mapping for situations
const SITUATION_ICONS: Record<string, any> = {
  Sparkles,
  Home,
  Baby,
  Gem,
  HeartHandshake,
  MapPin,
};

const ACTIVITY_TYPES = [
  { label: 'Kaarten', type: 'kaarten', icon: Layers, color: colors.terracotta.DEFAULT, route: null },
  { label: 'Vragen', type: 'vraag', icon: MessageCircle, color: colors.oceaan.DEFAULT, route: '/activity/type-list' },
  { label: 'Spellen', type: 'spel', icon: Gamepad2, color: colors.goud.DEFAULT, route: '/activity/type-list' },
  { label: 'Quizzen', type: 'quiz', icon: HelpCircle, color: colors.salie.DEFAULT, route: '/activity/type-list' },
  { label: 'Tips', type: 'tips', icon: Lightbulb, color: '#D4728C', route: '/activity/tips' },
  { label: 'Dates', type: 'dates', icon: CalendarHeart, color: '#8B7EC8', route: '/activity/dates' },
];

const TOPICS = [
  { id: 'communicatie', label: 'Communicatie', description: 'Verbeter de communicatie met je partner', icon: MessageSquare, color: colors.oceaan.DEFAULT },
  { id: 'conflict', label: 'Conflict', description: 'Leer omgaan met meningsverschillen', icon: ShieldAlert, color: '#E06B50' },
  { id: 'intimiteit', label: 'Sex & Intimiteit', description: 'Verdiep jullie intimiteit en verbinding', icon: Flame, color: colors.terracotta.DEFAULT },
  { id: 'connectie', label: 'Connectie', description: 'Versterk de band tussen jullie', icon: Link2, color: colors.salie.DEFAULT },
  { id: 'groei', label: 'Groei & Betekenis', description: 'Groei samen en als individu', icon: TrendingUp, color: colors.goud.DEFAULT },
  { id: 'geld', label: 'Geld & Financien', description: 'Financiele onderwerpen samen bespreken', icon: Wallet, color: '#6B8E8E' },
  { id: 'plezier', label: 'Plezier & Avontuur', description: 'Breng meer plezier in jullie relatie', icon: PartyPopper, color: '#D4728C' },
  { id: 'werk', label: 'Huis & Werk', description: 'Balans vinden tussen werk en thuis', icon: Briefcase, color: '#7B8794' },
  { id: 'familie', label: 'Familie & Vrienden', description: 'Omgaan met familie en sociale kringen', icon: Users, color: '#8B7EC8' },
];

const REC_TYPE_LABELS: Record<string, string> = {
  deck: 'Kaartenset',
  activity: 'Activiteit',
  date: 'Date-idee',
};

export default function OntdekScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const bookmarks = useBookmarksStore((s) => s.bookmarks);

  // Onboarding data for personalization
  const name = useOnboardingStore((s) => s.name);
  const relationshipType = useOnboardingStore((s) => s.relationshipType);
  const relationshipStartDate = useOnboardingStore((s) => s.relationshipStartDate);
  const duration = useOnboardingStore((s) => s.duration);
  const livingTogether = useOnboardingStore((s) => s.livingTogether);
  const hasChildren = useOnboardingStore((s) => s.hasChildren);
  const topics = useOnboardingStore((s) => s.topics);

  const onboardingData = useMemo(() => ({
    relationshipType,
    relationshipStartDate,
    duration,
    livingTogether,
    hasChildren,
    topics,
  }), [relationshipType, relationshipStartDate, duration, livingTogether, hasChildren, topics]);

  const situations = useMemo(() => deriveSituations(onboardingData), [onboardingData]);
  const recommendations = useMemo(() => getRecommendations(onboardingData), [onboardingData]);

  // Sort topics: user-chosen topics first
  const sortedTopics = useMemo(() => {
    const chosen = new Set(topics);
    return [...TOPICS].sort((a, b) => {
      const aChosen = chosen.has(a.id) ? 0 : 1;
      const bChosen = chosen.has(b.id) ? 0 : 1;
      return aChosen - bChosen;
    });
  }, [topics]);

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return sortedTopics;
    const q = searchQuery.toLowerCase();
    return sortedTopics.filter(
      (t) =>
        t.label.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q),
    );
  }, [searchQuery, sortedTopics]);

  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return TOPIC_ACTIVITIES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q),
    ).slice(0, 10);
  }, [searchQuery]);

  // Show max 6 decks, "bekijk alle" if more
  const visibleDecks = CARD_DECKS.slice(0, 6);
  const hasMoreDecks = CARD_DECKS.length > 6;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.warmwit }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Personalized header */}
        <GradientHeader
          title={name ? `Hoi ${name}` : 'Ontdek'}
        />

        {/* Search bar */}
        <View style={{ marginHorizontal: 24, marginTop: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: colors.zand.light,
              borderWidth: 1,
              borderColor: colors.zand.dark,
              borderRadius: organic.card,
            }}
          >
            <Search size={18} color="#9CA3AF" strokeWidth={2} />
            <TextInput
              placeholder="Zoek een relatie-onderwerp"
              placeholderTextColor="#9CA3AF"
              style={{ marginLeft: 10, flex: 1, fontSize: 16, color: colors.nachtblauw }}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={18} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Search results */}
        {searchQuery.trim().length > 0 && filteredActivities.length > 0 && (
          <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#6B7C8F', marginBottom: 8 }}>
              Activiteiten
            </Text>
            {filteredActivities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 12,
                  padding: 12,
                  backgroundColor: '#FFFFFF',
                  marginBottom: 8,
                }}
                activeOpacity={0.7}
                onPress={() => {
                  if (activity.type === 'quiz') {
                    router.push('/activity/quiz' as any);
                  } else if (activity.type === 'spel') {
                    router.push('/activity/game' as any);
                  } else {
                    router.push({
                      pathname: '/activity/question' as any,
                      params: {
                        questionId: activity.id,
                        questionText: activity.title,
                        questionCategory: activity.topic,
                        followUp: '',
                      },
                    });
                  }
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: colors.nachtblauw }}>
                    {activity.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6B7C8F' }}>
                    {activity.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Activity types - ronde icoontjes */}
        {!searchQuery.trim() && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}
            style={{ marginTop: 16 }}
          >
            {ACTIVITY_TYPES.map((type, index) => {
              const Icon = type.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={{ alignItems: 'center' }}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (type.type === 'kaarten') {
                      router.push('/activity/card-decks');
                      return;
                    }
                    if (type.route === '/activity/tips' || type.route === '/activity/dates') {
                      router.push(type.route as any);
                    } else {
                      router.push({
                        pathname: '/activity/type-list' as any,
                        params: { type: type.type, label: type.label },
                      });
                    }
                  }}
                >
                  <View
                    style={{
                      height: 64,
                      width: 64,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 32,
                      backgroundColor: type.color + '15',
                      borderWidth: 1,
                      borderColor: type.color + '25',
                    }}
                  >
                    <Icon size={22} color={type.color} strokeWidth={1.8} />
                  </View>
                  <Text
                    style={{ marginTop: 6, fontSize: 12, fontWeight: '500', color: colors.nachtblauw }}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        {/* Bookmarks */}
        {bookmarks.length > 0 && !searchQuery.trim() && (
          <View style={{ paddingTop: 20, paddingHorizontal: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Bookmark size={18} color={colors.goud.DEFAULT} strokeWidth={2} fill={colors.goud.DEFAULT} />
              <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginLeft: 8 }}>
                Bewaard
              </Text>
              <Text style={{ fontSize: 13, color: '#9CA3AF', marginLeft: 8 }}>
                {bookmarks.length}
              </Text>
            </View>
            {bookmarks.slice(0, 5).map((bm) => (
              <TouchableOpacity
                key={bm.id}
                activeOpacity={0.7}
                onPress={() => {
                  if (bm.route) {
                    router.push({ pathname: bm.route as any, params: bm.params });
                  }
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 12,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: colors.zand.dark,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: colors.goud.DEFAULT + '12',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Bookmark size={16} color={colors.goud.DEFAULT} strokeWidth={2} fill={colors.goud.DEFAULT} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '600', color: colors.nachtblauw }}>
                    {bm.title}
                  </Text>
                  {bm.subtitle && (
                    <Text numberOfLines={1} style={{ fontSize: 12, color: '#6B7C8F', marginTop: 1 }}>
                      {bm.subtitle}
                    </Text>
                  )}
                </View>
                <ChevronRight size={16} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* "Voor jullie" recommendations */}
        {recommendations.length > 0 && !searchQuery.trim() && (
          <View style={{ paddingTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, marginBottom: 12 }}>
              <Star size={18} color={colors.goud.DEFAULT} strokeWidth={2} fill={colors.goud.DEFAULT} />
              <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginLeft: 8 }}>
                Voor jullie
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
            >
              {recommendations.map((rec) => (
                <TouchableOpacity
                  key={rec.id}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (rec.routeParams) {
                      router.push({ pathname: rec.route as any, params: rec.routeParams });
                    } else {
                      router.push(rec.route as any);
                    }
                  }}
                  style={{
                    width: 160,
                    borderRadius: organic.card,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 1,
                    borderColor: rec.color + '20',
                    padding: 14,
                    ...warmShadow,
                    shadowOpacity: 0.05,
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      borderRadius: 6,
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      backgroundColor: rec.color + '15',
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ fontSize: 10, fontWeight: '600', color: rec.color }}>
                      {REC_TYPE_LABELS[rec.type] ?? rec.type}
                    </Text>
                  </View>
                  <Text
                    style={{ fontSize: 14, fontWeight: '700', color: colors.nachtblauw }}
                    numberOfLines={2}
                  >
                    {rec.title}
                  </Text>
                  <Text
                    style={{ fontSize: 11, color: '#6B7C8F', marginTop: 4 }}
                    numberOfLines={1}
                  >
                    {rec.reason}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* "Jullie reis" situations */}
        {situations.length > 1 && !searchQuery.trim() && (
          <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginBottom: 12 }}>
              Jullie reis
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {situations.slice(0, 4).map((sit) => {
                const Icon = SITUATION_ICONS[sit.icon] ?? Sparkles;
                return (
                  <TouchableOpacity
                    key={sit.id}
                    activeOpacity={0.7}
                    onPress={() =>
                      router.push({
                        pathname: '/(tabs)/ontdek/reis/[situation]' as any,
                        params: { situation: sit.id },
                      })
                    }
                    style={{
                      width: '48%' as any,
                      borderRadius: organic.card,
                      backgroundColor: sit.color + '08',
                      borderWidth: 1,
                      borderColor: sit.color + '20',
                      padding: 14,
                    }}
                  >
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        backgroundColor: sit.color + '18',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 8,
                      }}
                    >
                      <Icon size={18} color={sit.color} strokeWidth={1.8} />
                    </View>
                    <Text
                      style={{ fontSize: 14, fontWeight: '700', color: colors.nachtblauw }}
                      numberOfLines={1}
                    >
                      {sit.title}
                    </Text>
                    <Text
                      style={{ fontSize: 11, color: '#6B7C8F', marginTop: 2 }}
                      numberOfLines={2}
                    >
                      {sit.subtitle}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Card decks */}
        <View style={{ paddingHorizontal: 24, paddingTop: 28 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw }}>
              Kaartendecks
            </Text>
            {hasMoreDecks && (
              <TouchableOpacity
                onPress={() => router.push('/activity/card-decks')}
                activeOpacity={0.7}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.terracotta.DEFAULT }}>
                  Bekijk alle
                </Text>
                <ChevronRight size={14} color={colors.terracotta.DEFAULT} strokeWidth={2.5} />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {visibleDecks.map((deck) => (
              <TouchableOpacity
                key={deck.id}
                activeOpacity={0.7}
                onPress={() =>
                  router.push({
                    pathname: '/activity/card-deck' as any,
                    params: { deckId: deck.id },
                  })
                }
                style={{
                  width: '47%' as any,
                  borderRadius: organic.card,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: deck.color + '18',
                  overflow: 'hidden',
                  ...warmShadow,
                  shadowOpacity: 0.06,
                }}
              >
                <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 12,
                      backgroundColor: deck.color + '12',
                      marginBottom: 10,
                    }}
                  >
                    <Layers size={18} color={deck.color} strokeWidth={1.8} />
                  </View>
                  <Text
                    style={{ fontSize: 14, fontWeight: '700', color: colors.nachtblauw }}
                    numberOfLines={1}
                  >
                    {deck.title}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: '#6B7C8F', marginTop: 2, lineHeight: 16 }}
                    numberOfLines={2}
                  >
                    {deck.description}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: deck.color }}>
                      {deck.cardCount} kaarten
                    </Text>
                    <ChevronRight size={12} color={deck.color} strokeWidth={2.5} />
                  </View>
                </View>
                <View style={{ height: 3, backgroundColor: deck.color, opacity: 0.4 }} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Topics */}
        <View style={{ paddingHorizontal: 24, paddingTop: 28 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.nachtblauw, marginBottom: 12 }}>
            Onderwerpen
          </Text>

          {/* Highlight chosen topics */}
          {topics.length > 0 && !searchQuery.trim() && (
            <Text style={{ fontSize: 13, color: '#6B7C8F', marginBottom: 12 }}>
              Jullie gekozen onderwerpen staan bovenaan
            </Text>
          )}

          {filteredTopics.map((topic) => {
            const Icon = topic.icon;
            const isChosen = topics.includes(topic.id);
            return (
              <TouchableOpacity
                key={topic.id}
                activeOpacity={0.7}
                onPress={() => router.push(`/(tabs)/ontdek/${topic.id}` as any)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                  backgroundColor: isChosen ? topic.color + '08' : topic.color + '04',
                  borderWidth: isChosen ? 1.5 : 1,
                  borderColor: isChosen ? topic.color + '30' : topic.color + '15',
                  borderRadius: organic.card,
                  overflow: 'hidden',
                }}
              >
                <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 16 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: colors.nachtblauw }}>
                    {topic.label}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6B7C8F', marginTop: 2, lineHeight: 16 }}>
                    {topic.description}
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: 16,
                    height: 56,
                    width: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    backgroundColor: topic.color + '12',
                  }}
                >
                  <Icon size={24} color={topic.color} strokeWidth={1.5} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
