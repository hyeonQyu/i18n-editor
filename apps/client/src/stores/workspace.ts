import { create } from 'zustand/react';

interface WorkspaceStore {
  /**
   * @deprecated
   */
  path: string | undefined;
  /**
   * @deprecated
   * @param path
   * @returns
   */
  setPath: (path: string) => void;
  namespace: string | undefined;
  setNamespace: (namespace: string) => void;
  resetNamespace: () => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => {
  return {
    path: undefined,
    namespace: undefined,
    setPath: (path) => set({ path, namespace: undefined }),
    setNamespace: (namespace) => set({ namespace }),
    resetNamespace: () => set({ namespace: undefined }),
  };
});
