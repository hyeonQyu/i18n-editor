import { create } from 'zustand/react';

interface WorkspaceViewTitleState {
  editingName: string;
  isNameEditing: boolean;
  hasError: boolean;
  setEditingName: (name: string) => void;
  setIsNameEditing: (isEditing: boolean) => void;
  setHasError: (hasError: boolean) => void;
}

export const useWorkspaceTitleStore = create<WorkspaceViewTitleState>((set) => ({
  editingName: '',
  isNameEditing: false,
  hasError: false,
  setEditingName: (name) => set({ editingName: name }),
  setIsNameEditing: (isEditing) => set({ isNameEditing: isEditing }),
  setHasError: (hasError) => set({ hasError }),
}));
