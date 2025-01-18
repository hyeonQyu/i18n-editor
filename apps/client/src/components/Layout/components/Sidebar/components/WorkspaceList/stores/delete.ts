import { createDialogStore } from '@stores/factories/dialog';

interface WorkspaceDeleteDialogStore {
  workspaceId: string | undefined;
}

export const useWorkspaceDeleteDialogStore = createDialogStore<WorkspaceDeleteDialogStore>(() => ({
  workspaceId: undefined,
}));
