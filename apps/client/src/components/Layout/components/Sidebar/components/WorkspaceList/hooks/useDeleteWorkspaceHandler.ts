import { useWorkspaceDeleteDialogStore } from '@components/Layout/components/Sidebar/components/WorkspaceList/stores/delete';

function useDeleteWorkspaceHandler() {
  const open = useWorkspaceDeleteDialogStore(({ open }) => open);

  return (id: string) => open(() => ({ workspaceId: id }));
}

export default useDeleteWorkspaceHandler;
