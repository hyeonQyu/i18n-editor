import { create } from 'zustand/react';

interface GlobalStates {
  workspaceId: string;
  namespace: string;
}

interface GlobalActions {
  setWorkspaceId: (workspaceId: string) => void;
  setNamespace: (namespace: string) => void;
}

interface GlobalStore extends GlobalStates, GlobalActions {}

export const useGlobalStore = create<GlobalStore>((set) => ({
  workspaceId: '',
  namespace: '',
  setWorkspaceId: (workspaceId: string) => set({ workspaceId, namespace: '' }),
  setNamespace: (namespace: string) => set({ namespace }),
}));
