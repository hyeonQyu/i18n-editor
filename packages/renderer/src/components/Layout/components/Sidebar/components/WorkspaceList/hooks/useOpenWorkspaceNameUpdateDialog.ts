import { useWorkspaceNameUpdateStore } from '@/components/Layout/components/Sidebar/components/WorkspaceList/stores/workspaceNameUpdate.store';

export const useOpenWorkspaceNameUpdateDialog = () => {
  return useWorkspaceNameUpdateStore(({ setWorkspace }) => setWorkspace);
};
