import { Workspace } from 'i18n-editor-common';
import { create } from 'zustand/react';

interface WorkspaceNameUpdateState {
  workspace: Workspace | undefined;
  newName: string;
}

const DEFAULT_STATE: WorkspaceNameUpdateState = {
  workspace: undefined,
  newName: '',
};

interface WorkspaceNameUpdateStore extends WorkspaceNameUpdateState {
  setWorkspace: (workspace: Workspace) => void;
  setNewName: (name: string) => void;
  reset: () => void;
}

export const useWorkspaceNameUpdateStore = create<WorkspaceNameUpdateStore>((set) => ({
  ...DEFAULT_STATE,
  setWorkspace: (workspace) => set({ workspace, newName: workspace.name }),
  setNewName: (newName) => set({ newName }),
  reset: () => set(DEFAULT_STATE),
}));
