import { Workspace } from '@i18n-editor/shared';
import { create } from 'zustand/react';

interface WorkspaceNameUpdateState {
  workspace: Workspace | undefined;
  newName: string;
  hasError: boolean;
}

const DEFAULT_STATE: WorkspaceNameUpdateState = {
  workspace: undefined,
  newName: '',
  hasError: false,
};

interface WorkspaceNameUpdateStore extends WorkspaceNameUpdateState {
  setWorkspace: (workspace: Workspace) => void;
  setNewName: (name: string) => void;
  setHasError: (hasError: boolean) => void;
  reset: () => void;
}

export const useWorkspaceNameUpdateStore = create<WorkspaceNameUpdateStore>((set) => ({
  ...DEFAULT_STATE,
  setWorkspace: (workspace) => set({ workspace, newName: workspace.name }),
  setNewName: (newName) => set({ newName }),
  setHasError: (hasError) => set({ hasError }),
  reset: () => set(DEFAULT_STATE),
}));
