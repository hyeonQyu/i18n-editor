import { create } from 'zustand/react';

interface WorkspaceViewHeaderStore {
  isNameEditing: boolean;
  editingName: string;

  setNameEditing: (isEditing: boolean) => void;
  setEditingName: (name: string) => void;
}

export const useWorkspaceViewHeaderStore = create<WorkspaceViewHeaderStore>((set) => ({
  isNameEditing: false,
  editingName: '',

  setNameEditing: (isEditing) => set(() => ({ isNameEditing: isEditing })),
  setEditingName: (name) => set(() => ({ editingName: name })),
}));
