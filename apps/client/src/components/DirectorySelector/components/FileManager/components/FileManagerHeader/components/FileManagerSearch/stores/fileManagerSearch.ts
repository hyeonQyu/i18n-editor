import { create } from 'zustand/react';

interface FileManagerSearchStore {
  searchMode: boolean;
  setSearchMode: () => void;
  exitSearchMode: () => void;
  reset: () => void;
}

export const useFileManagerSearchStore = create<FileManagerSearchStore>((set) => ({
  searchMode: false,
  setSearchMode: () => set({ searchMode: true }),
  exitSearchMode: () => set({ searchMode: false }),
  reset: () => set({ searchMode: false }),
}));
