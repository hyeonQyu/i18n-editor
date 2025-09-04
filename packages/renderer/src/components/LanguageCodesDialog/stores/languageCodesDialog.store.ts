import { createDialogStore } from '@/stores/factories/dialog.store.factory';

interface LanguageCodesDialogStates {
  workspaceId: string;
}

interface LanguageCodesDialogActions {
  setWorkspaceId: (workspaceId: string) => void;
}

type LanguageCodesDialogStore = LanguageCodesDialogStates & LanguageCodesDialogActions;

export const useLanguageCodesDialogStore = createDialogStore<LanguageCodesDialogStore>((set) => ({
  workspaceId: '',
  setWorkspaceId: (workspaceId) => set({ workspaceId }),
}));
