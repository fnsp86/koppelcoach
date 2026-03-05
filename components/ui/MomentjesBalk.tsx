import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/lib/theme';
import { useVerhaalStore } from '@/lib/stores/verhaal-store';
import { usePartnerStore } from '@/lib/stores/partner-store';
import { Plus } from 'lucide-react-native';
import type { Momentje } from '@/lib/types';

interface MomentjesBalkProps {
  onCreateMomentje: () => void;
  onViewMomentje: (momentje: Momentje) => void;
}

export function MomentjesBalk({
  onCreateMomentje,
  onViewMomentje,
}: MomentjesBalkProps) {
  const partnerName = usePartnerStore((s) => s.partnerName) ?? 'Partner';
  const momentjes = useVerhaalStore((s) => s.momentjes);
  const activeMomentjes = useMemo(() => {
    const now = new Date().toISOString();
    return momentjes.filter((m) => m.expires_at > now && !m.saved_to_verhaal);
  }, [momentjes]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
    >
      {/* Create new momentje */}
      <TouchableOpacity
        onPress={onCreateMomentje}
        activeOpacity={0.7}
        className="items-center"
      >
        <View
          className="h-14 w-14 items-center justify-center rounded-full"
          style={{
            borderWidth: 2,
            borderColor: colors.terracotta.DEFAULT,
            borderStyle: 'dashed',
          }}
        >
          <Plus size={22} color={colors.terracotta.DEFAULT} strokeWidth={2} />
        </View>
        <Text
          className="mt-1 text-xs font-medium"
          style={{ color: colors.nachtblauw }}
        >
          Jouw
        </Text>
      </TouchableOpacity>

      {/* Partner momentjes */}
      {activeMomentjes.map((momentje) => {
        const isSeen = momentje.seen_by_partner;
        return (
          <TouchableOpacity
            key={momentje.id}
            onPress={() => onViewMomentje(momentje)}
            activeOpacity={0.7}
            className="items-center"
          >
            <View
              className="h-14 w-14 items-center justify-center rounded-full"
              style={{
                borderWidth: isSeen ? 2 : 3,
                borderColor: isSeen
                  ? colors.zand.dark
                  : colors.terracotta.DEFAULT,
              }}
            >
              {/* Partner avatar placeholder */}
              <View
                className="h-11 w-11 items-center justify-center rounded-full"
                style={{
                  backgroundColor: isSeen
                    ? colors.zand.DEFAULT
                    : colors.terracotta.DEFAULT + '15',
                }}
              >
                <Text
                  className="text-sm font-bold"
                  style={{
                    color: isSeen
                      ? '#6B7C8F'
                      : colors.terracotta.DEFAULT,
                  }}
                >
                  {partnerName.charAt(0).toUpperCase()}
                </Text>
              </View>
            </View>
            <Text
              className="mt-1 text-xs font-medium"
              style={{
                color: isSeen ? '#6B7C8F' : colors.nachtblauw,
              }}
            >
              {partnerName}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
