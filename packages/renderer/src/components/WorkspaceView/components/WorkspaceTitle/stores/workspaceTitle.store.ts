import { create } from 'zustand';

interface WorkspaceTitleStates {
  editingName: string;
  isNameEditing: boolean;
  hasError: boolean;
}

interface WorkspaceTitleActions {
  setEditingName: (name: string) => void;
  setIsNameEditing: (isEditing: boolean) => void;
  setHasError: (hasError: boolean) => void;
}

type WorkspaceTitleStore = WorkspaceTitleStates & WorkspaceTitleActions;

export const useWorkspaceTitleStore = create<WorkspaceTitleStore>((set) => ({
  editingName: '',
  isNameEditing: false,
  hasError: false,
  setEditingName: (name) => set({ editingName: name }),
  setIsNameEditing: (isEditing) => set({ isNameEditing: isEditing }),
  setHasError: (hasError) => set({ hasError }),
}));
