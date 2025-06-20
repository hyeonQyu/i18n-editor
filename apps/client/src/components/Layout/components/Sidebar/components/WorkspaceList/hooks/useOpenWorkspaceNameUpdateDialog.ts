import { useWorkspaceNameUpdateStore } from '@components/Layout/components/Sidebar/components/WorkspaceList/stores/nameUpdate';

function useOpenWorkspaceNameUpdateDialog() {
  return useWorkspaceNameUpdateStore(({ setWorkspace }) => setWorkspace);
}

export default useOpenWorkspaceNameUpdateDialog;
