import { useWorkspaceNameUpdateStore } from '@components/Layout/components/Sidebar/components/WorkspaceList/stores/nameUpdate';

function useWorkspaceNameUpdateDialogClose() {
  const reset = useWorkspaceNameUpdateStore(({ reset }) => reset);
  return () => reset();
}

export default useWorkspaceNameUpdateDialogClose;
