import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AnsweredQuestion = {
  id: string;
  questionText: string;
  category: string;
  myAnswer: string;
  partnerAnswer?: string;
  date: string; // YYYY-MM-DD
  createdAt: string; // ISO
};

export type GameTraitChoice = {
  trait: string;
  myChoice: 'me' | 'partner';
  partnerChoice?: 'me' | 'partner';
};

export type GameSession = {
  id: string;
  gameType: 'jij-of-ik';
  date: string;
  traits: GameTraitChoice[];
  myScore: number;
  partnerScore: number;
  createdAt: string;
};

export type QuizAreaScore = {
  area: string;
  myScore: number;
  partnerScore?: number;
};

export type QuizSession = {
  id: string;
  gameType: 'quiz';
  date: string;
  scores: QuizAreaScore[];
  createdAt: string;
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

type ActivityHistoryState = {
  questions: AnsweredQuestion[];
  games: GameSession[];
  quizzes: QuizSession[];
};

type ActivityHistoryActions = {
  addQuestion: (q: Omit<AnsweredQuestion, 'id' | 'createdAt'>) => void;
  updatePartnerAnswer: (questionId: string, partnerAnswer: string) => void;

  addGameSession: (g: Omit<GameSession, 'id' | 'createdAt'>) => void;
  updateGamePartnerChoices: (
    sessionId: string,
    partnerChoices: { trait: string; choice: 'me' | 'partner' }[],
  ) => void;

  addQuizSession: (q: Omit<QuizSession, 'id' | 'createdAt'>) => void;
  updateQuizPartnerScores: (
    sessionId: string,
    partnerScores: { area: string; score: number }[],
  ) => void;

  getRecentQuestions: (limit?: number) => AnsweredQuestion[];
  getRecentGames: (limit?: number) => GameSession[];
  getRecentQuizzes: (limit?: number) => QuizSession[];
  getTotalCount: () => { questions: number; games: number; quizzes: number };
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const useActivityHistoryStore = create<
  ActivityHistoryState & ActivityHistoryActions
>()(
  persist(
    (set, get) => ({
      questions: [],
      games: [],
      quizzes: [],

      addQuestion: (q) => {
        const entry: AnsweredQuestion = {
          ...q,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ questions: [entry, ...s.questions] }));
      },

      updatePartnerAnswer: (questionId, partnerAnswer) => {
        set((s) => ({
          questions: s.questions.map((q) =>
            q.id === questionId ? { ...q, partnerAnswer } : q,
          ),
        }));
      },

      addGameSession: (g) => {
        const entry: GameSession = {
          ...g,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ games: [entry, ...s.games] }));
      },

      updateGamePartnerChoices: (sessionId, partnerChoices) => {
        set((s) => ({
          games: s.games.map((g) => {
            if (g.id !== sessionId) return g;
            const updatedTraits = g.traits.map((t) => {
              const pc = partnerChoices.find((p) => p.trait === t.trait);
              return pc ? { ...t, partnerChoice: pc.choice } : t;
            });
            return { ...g, traits: updatedTraits };
          }),
        }));
      },

      addQuizSession: (q) => {
        const entry: QuizSession = {
          ...q,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ quizzes: [entry, ...s.quizzes] }));
      },

      updateQuizPartnerScores: (sessionId, partnerScores) => {
        set((s) => ({
          quizzes: s.quizzes.map((q) => {
            if (q.id !== sessionId) return q;
            const updatedScores = q.scores.map((sc) => {
              const ps = partnerScores.find((p) => p.area === sc.area);
              return ps ? { ...sc, partnerScore: ps.score } : sc;
            });
            return { ...q, scores: updatedScores };
          }),
        }));
      },

      getRecentQuestions: (limit = 20) => {
        return get().questions.slice(0, limit);
      },

      getRecentGames: (limit = 10) => {
        return get().games.slice(0, limit);
      },

      getRecentQuizzes: (limit = 10) => {
        return get().quizzes.slice(0, limit);
      },

      getTotalCount: () => {
        const s = get();
        return {
          questions: s.questions.length,
          games: s.games.length,
          quizzes: s.quizzes.length,
        };
      },
    }),
    {
      name: 'activity-history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
