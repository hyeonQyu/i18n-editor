import { create } from 'zustand/react';

interface PathStore {
  path: string | undefined;
  setPath: (path: string) => void;
}

export const usePathStore = create<PathStore>((set) => ({
  path: undefined,
  setPath: (path) => set({ path }),
}));
