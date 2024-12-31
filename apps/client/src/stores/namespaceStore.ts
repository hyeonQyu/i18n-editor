import { create } from 'zustand/react';

interface NamespaceStore {
  namespace: string | undefined;
  setNamespace: (namespace: string) => void;
  reset: () => void;
}

export const useNamespaceStore = create<NamespaceStore>((set) => ({
  namespace: undefined,
  setNamespace: (namespace) => set({ namespace }),
  reset: () => set({ namespace: undefined }),
}));
