import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Bookmark = {
  id: string;
  type: 'question' | 'game' | 'quiz' | 'tip' | 'date-idea';
  title: string;
  subtitle?: string;
  route?: string;
  params?: Record<string, string>;
  createdAt: string;
};

type BookmarksState = {
  bookmarks: Bookmark[];
};

type BookmarksActions = {
  addBookmark: (b: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (type: Bookmark['type'], title: string) => boolean;
  toggleBookmark: (b: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  getByType: (type: Bookmark['type']) => Bookmark[];
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const useBookmarksStore = create<BookmarksState & BookmarksActions>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (b) => {
        const entry: Bookmark = {
          ...b,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ bookmarks: [entry, ...s.bookmarks] }));
      },

      removeBookmark: (id) => {
        set((s) => ({
          bookmarks: s.bookmarks.filter((b) => b.id !== id),
        }));
      },

      isBookmarked: (type, title) => {
        return get().bookmarks.some((b) => b.type === type && b.title === title);
      },

      toggleBookmark: (b) => {
        const existing = get().bookmarks.find(
          (bm) => bm.type === b.type && bm.title === b.title,
        );
        if (existing) {
          get().removeBookmark(existing.id);
        } else {
          get().addBookmark(b);
        }
      },

      getByType: (type) => {
        return get().bookmarks.filter((b) => b.type === type);
      },
    }),
    {
      name: 'bookmarks-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
