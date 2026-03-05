import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { usePartnerStore } from '@/lib/stores/partner-store';
import { useActivityHistoryStore } from '@/lib/stores/activity-history-store';
import type { RealtimeChannel } from '@supabase/supabase-js';

type RealtimePayload = {
  table: string;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: Record<string, unknown>;
  old: Record<string, unknown>;
};

/**
 * Subscribes to realtime changes on the couple channel.
 * Listens for:
 * - check_ins: partner mood updates
 * - question_responses: partner answered a question
 * - couples: status changes (partner joined)
 *
 * Call this once at the app root level.
 */
export function useRealtimeCouple(
  onPartnerCheckIn?: (mood: number, pulse: number) => void,
  onPartnerQuestionAnswer?: (questionId: string) => void,
) {
  const channelRef = useRef<RealtimeChannel | null>(null);
  const coupleId = usePartnerStore((s) => s.coupleId);
  const userId = usePartnerStore((s) => s.userId);
  const isOnline = usePartnerStore((s) => s.isOnline);
  const syncFromSupabase = usePartnerStore((s) => s.syncFromSupabase);

  useEffect(() => {
    if (!coupleId || !userId || !isOnline) {
      // Clean up existing channel if we go offline
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
      return;
    }

    const channel = supabase
      .channel(`couple:${coupleId}`)
      // Listen for check-ins from partner
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'check_ins',
          filter: `couple_id=eq.${coupleId}`,
        },
        (payload: RealtimePayload) => {
          const row = payload.new;
          if (row.user_id !== userId && onPartnerCheckIn) {
            onPartnerCheckIn(row.mood as number, row.pulse as number);
          }
        },
      )
      // Listen for question responses from partner
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'question_responses',
          filter: `couple_id=eq.${coupleId}`,
        },
        (payload: RealtimePayload) => {
          const row = payload.new;
          if (row.user_id !== userId && onPartnerQuestionAnswer) {
            onPartnerQuestionAnswer(row.question_id as string);
          }
        },
      )
      // Listen for couple status changes (partner joins)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'couples',
          filter: `id=eq.${coupleId}`,
        },
        (payload: RealtimePayload) => {
          const row = payload.new;
          if (row.status === 'active') {
            // Partner just joined - resync
            syncFromSupabase();
          }
        },
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [coupleId, userId, isOnline, onPartnerCheckIn, onPartnerQuestionAnswer, syncFromSupabase]);
}
