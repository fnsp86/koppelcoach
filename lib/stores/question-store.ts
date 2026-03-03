import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Question, QuestionResponse } from '@/lib/types';

type QuestionState = {
  todayQuestion: Question | null;
  myAnswer: QuestionResponse | null;
  partnerAnswered: boolean;
  revealed: boolean;
  answers: { mine: QuestionResponse | null; partner: QuestionResponse | null };
  isLoading: boolean;
  error: string | null;
};

type QuestionActions = {
  loadTodayQuestion: () => Promise<void>;
  submitAnswer: (answer: string) => Promise<void>;
  revealAnswers: () => Promise<void>;
};

function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useQuestionStore = create<QuestionState & QuestionActions>()(
  (set, get) => ({
    todayQuestion: null,
    myAnswer: null,
    partnerAnswered: false,
    revealed: false,
    answers: { mine: null, partner: null },
    isLoading: false,
    error: null,

    loadTodayQuestion: async () => {
      try {
        set({ isLoading: true, error: null });

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Niet ingelogd');

        const { data: profile } = await supabase
          .from('profiles')
          .select('couple_id')
          .eq('id', user.id)
          .single();

        if (!profile?.couple_id) return;

        const today = todayDateString();

        // Get today's question - use date-based seeding for consistency
        // across both partners (both get the same daily question)
        const { data: question } = await supabase
          .from('questions')
          .select('*')
          .eq('is_free', true)
          .is('pack_id', null)
          .limit(1)
          .single();

        // Check if there's already a response from the daily_questions view
        // or fall back to checking responses for this date
        const { data: responses } = await supabase
          .from('question_responses')
          .select('*')
          .eq('couple_id', profile.couple_id)
          .eq('date', today);

        const myAnswer =
          responses?.find((r) => r.user_id === user.id) ?? null;
        const partnerAnswer =
          responses?.find((r) => r.user_id !== user.id) ?? null;

        const bothAnswered = myAnswer != null && partnerAnswer != null;
        const revealed = bothAnswered && (myAnswer?.revealed ?? false);

        set({
          todayQuestion: question ?? null,
          myAnswer,
          partnerAnswered: partnerAnswer != null,
          revealed,
          answers: revealed
            ? { mine: myAnswer, partner: partnerAnswer }
            : { mine: myAnswer, partner: null },
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Vraag laden mislukt';
        set({ error: message });
      } finally {
        set({ isLoading: false });
      }
    },

    submitAnswer: async (answer: string) => {
      try {
        set({ isLoading: true, error: null });

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Niet ingelogd');

        const { data: profile } = await supabase
          .from('profiles')
          .select('couple_id')
          .eq('id', user.id)
          .single();

        if (!profile?.couple_id) {
          throw new Error('Je bent nog niet gekoppeld');
        }

        const { todayQuestion } = get();
        if (!todayQuestion) {
          throw new Error('Geen vraag beschikbaar');
        }

        const today = todayDateString();

        const { data: response, error } = await supabase
          .from('question_responses')
          .upsert(
            {
              question_id: todayQuestion.id,
              user_id: user.id,
              couple_id: profile.couple_id,
              answer,
              revealed: false,
              date: today,
            },
            { onConflict: 'question_id,user_id,date' },
          )
          .select()
          .single();

        if (error) throw error;

        // Check if partner has also answered
        const { data: partnerResponse } = await supabase
          .from('question_responses')
          .select('*')
          .eq('question_id', todayQuestion.id)
          .eq('couple_id', profile.couple_id)
          .eq('date', today)
          .neq('user_id', user.id)
          .single();

        set({
          myAnswer: response,
          partnerAnswered: partnerResponse != null,
        });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Antwoord opslaan mislukt';
        set({ error: message });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    revealAnswers: async () => {
      try {
        set({ isLoading: true, error: null });

        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error('Niet ingelogd');

        const { data: profile } = await supabase
          .from('profiles')
          .select('couple_id')
          .eq('id', user.id)
          .single();

        if (!profile?.couple_id) {
          throw new Error('Je bent nog niet gekoppeld');
        }

        const { todayQuestion, partnerAnswered } = get();
        if (!todayQuestion) throw new Error('Geen vraag beschikbaar');
        if (!partnerAnswered) {
          throw new Error(
            'Je partner heeft nog niet geantwoord',
          );
        }

        const today = todayDateString();

        // Mark all responses for this question+date as revealed
        const { error } = await supabase
          .from('question_responses')
          .update({ revealed: true })
          .eq('question_id', todayQuestion.id)
          .eq('couple_id', profile.couple_id)
          .eq('date', today);

        if (error) throw error;

        // Load both answers
        const { data: responses } = await supabase
          .from('question_responses')
          .select('*')
          .eq('question_id', todayQuestion.id)
          .eq('couple_id', profile.couple_id)
          .eq('date', today);

        const mine = responses?.find((r) => r.user_id === user.id) ?? null;
        const partner =
          responses?.find((r) => r.user_id !== user.id) ?? null;

        set({
          revealed: true,
          answers: { mine, partner },
        });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Antwoorden onthullen mislukt';
        set({ error: message });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },
  }),
);
