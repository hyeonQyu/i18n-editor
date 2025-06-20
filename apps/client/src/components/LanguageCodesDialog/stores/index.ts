import { createDialogStore } from '@stores/factories/dialog';

interface LanguageCodesDialogStore {
  workspaceId: string;
  setWorkspaceId: (workspaceId: string) => void;
}

export const useLanguageCodesDialogStore = createDialogStore<LanguageCodesDialogStore>((set) => {
  return {
    workspaceId: '',
    setWorkspaceId: (workspaceId) => set({ workspaceId }),
  };
});
