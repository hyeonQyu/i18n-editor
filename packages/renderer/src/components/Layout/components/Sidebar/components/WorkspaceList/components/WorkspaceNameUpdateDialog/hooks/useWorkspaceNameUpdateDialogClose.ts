import { useWorkspaceNameUpdateStore } from '@/components/Layout/components/Sidebar/components/WorkspaceList/stores/workspaceNameUpdate.store';

export const useWorkspaceNameUpdateDialogClose = () => {
  return useWorkspaceNameUpdateStore(({ reset }) => reset);
};
