import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, organic } from '@/lib/theme';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, X } from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const STORY_DURATION = 5000; // 5 seconds

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'Zojuist';
  if (diffMin < 60) return `${diffMin} min geleden`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} uur geleden`;
  return 'Gisteren';
}

export default function MomentjeViewerScreen() {
  const { momentjeId } = useLocalSearchParams<{ momentjeId: string }>();
  const store = useVerhaalStore();
  const activeMomentjes = store.getActiveMomentjes();

  // Find the starting index based on the passed momentje ID
  const startIndex = activeMomentjes.findIndex((m) => m.id === momentjeId);
  const [currentIndex, setCurrentIndex] = useState(
    startIndex >= 0 ? startIndex : 0,
  );
  const [saved, setSaved] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  const currentMomentje = activeMomentjes[currentIndex];

  useEffect(() => {
    if (!currentMomentje) {
      router.back();
      return;
    }

    // Mark as seen
    store.markMomentjeSeen(currentMomentje.id);
    setSaved(false);

    // Start progress animation
    progressAnim.setValue(0);
    animRef.current = Animated.timing(progressAnim, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false,
    });

    animRef.current.start(({ finished }) => {
      if (finished) {
        advanceToNext();
      }
    });

    return () => {
      if (animRef.current) {
        animRef.current.stop();
      }
    };
  }, [currentIndex]);

  const advanceToNext = () => {
    if (currentIndex < activeMomentjes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.back();
    }
  };

  const handleTap = () => {
    if (animRef.current) {
      animRef.current.stop();
    }
    advanceToNext();
  };

  const handleSaveToVerhaal = () => {
    if (!currentMomentje || saved) return;
    store.saveMomentjeToVerhaal(currentMomentje.id);
    setSaved(true);
  };

  if (!currentMomentje) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: '#000000' }}
      >
        <Text className="text-white">Geen momentjes beschikbaar</Text>
      </View>
    );
  }

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleTap}
      className="flex-1"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Full screen image */}
      {currentMomentje.image_uri && (
        <Image
          source={{ uri: currentMomentje.image_uri }}
          style={{
            position: 'absolute',
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          }}
          resizeMode="cover"
        />
      )}

      {/* Progress bar area */}
      <View
        className="flex-row px-3"
        style={{
          paddingTop: Platform.OS === 'ios' ? 58 : 38,
          gap: 4,
        }}
      >
        {activeMomentjes.map((_, index) => (
          <View
            key={index}
            className="h-1 flex-1 overflow-hidden rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
          >
            {index < currentIndex && (
              <View
                className="h-full rounded-full"
                style={{
                  backgroundColor: colors.terracotta.DEFAULT,
                  width: '100%',
                }}
              />
            )}
            {index === currentIndex && (
              <Animated.View
                className="h-full rounded-full"
                style={{
                  backgroundColor: colors.terracotta.DEFAULT,
                  width: progressWidth,
                }}
              />
            )}
          </View>
        ))}
      </View>

      {/* Top bar: avatar + name + time + close */}
      <View className="mt-3 flex-row items-center justify-between px-4">
        <View className="flex-row items-center">
          {/* Partner avatar */}
          <View
            className="h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.terracotta.DEFAULT }}
          >
            <Text className="text-sm font-bold text-white">P</Text>
          </View>
          <View className="ml-2">
            <Text className="text-sm font-semibold text-white">Partner</Text>
            <Text className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {timeAgo(currentMomentje.created_at)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-9 w-9 items-center justify-center rounded-full"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          <X size={18} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Bottom area */}
      <View className="flex-1 justify-end">
        {/* Text overlay with gradient */}
        {currentMomentje.text && (
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={{ paddingHorizontal: 20, paddingBottom: 8, paddingTop: 40 }}
          >
            <Text className="text-base leading-6 text-white">
              {currentMomentje.text}
            </Text>
          </LinearGradient>
        )}

        {/* Bottom actions */}
        <View
          className="flex-row items-center justify-between px-5"
          style={{
            paddingBottom: Platform.OS === 'ios' ? 50 : 30,
            paddingTop: currentMomentje.text ? 8 : 20,
            backgroundColor: currentMomentje.text
              ? 'rgba(0,0,0,0.7)'
              : 'transparent',
          }}
        >
          <View className="flex-1" />

          {/* Save to Ons Verhaal */}
          <TouchableOpacity
            onPress={handleSaveToVerhaal}
            activeOpacity={0.7}
            className="flex-row items-center rounded-full px-4 py-2"
            style={{
              backgroundColor: saved
                ? colors.salie.DEFAULT
                : 'rgba(255,255,255,0.2)',
            }}
          >
            <Heart
              size={18}
              color="#FFFFFF"
              strokeWidth={2}
              fill={saved ? '#FFFFFF' : 'none'}
            />
            <Text className="ml-2 text-sm font-medium text-white">
              {saved ? 'Bewaard' : 'Bewaar in Ons Verhaal'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
