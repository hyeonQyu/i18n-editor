import { create } from 'zustand/react';

interface WorkspaceViewHeaderState {
  editingName: string;
  isNameEditing: boolean;
  hasError: boolean;
  setEditingName: (name: string) => void;
  setIsNameEditing: (isEditing: boolean) => void;
  setHasError: (hasError: boolean) => void;
}

export const useWorkspaceViewHeaderStore = create<WorkspaceViewHeaderState>((set) => ({
  editingName: '',
  isNameEditing: false,
  hasError: false,
  setEditingName: (name) => set({ editingName: name }),
  setIsNameEditing: (isEditing) => set({ isNameEditing: isEditing }),
  setHasError: (hasError) => set({ hasError }),
}));
