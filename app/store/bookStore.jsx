import { create } from 'zustand';

export const useBookStore = create((set) => ({
  savedBooks: [],
  saveBook: (book) =>
    set((state) => ({
      savedBooks: state.savedBooks.some((b) => b.id === book.id)
        ? state.savedBooks
        : [...state.savedBooks, book],
    })),
  removeBook: (id) =>
    set((state) => ({
      savedBooks: state.savedBooks.filter((b) => b.id !== id),
    })),
}));
