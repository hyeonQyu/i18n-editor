import { create } from 'zustand/react';

interface FileManagerSearchStore {
  searchMode: boolean;
  startSearch: () => void;
  finishSearch: () => void;
}

export const useFileManagerSearchStore = create<FileManagerSearchStore>((set) => ({
  searchMode: false,
  startSearch: () => set({ searchMode: true }),
  finishSearch: () => set({ searchMode: false }),
}));
