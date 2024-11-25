import { create } from 'zustand/react';

interface GlobalStore {
  path: string | undefined;
  setPath: (path: string) => void;
  namespace: string | undefined;
  setNamespace: (namespace: string) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => {
  return {
    path: undefined,
    namespace: undefined,
    setPath: (path) => set({ path, namespace: undefined }),
    setNamespace: (namespace) => set({ namespace }),
  };
});
