import { useWorkspaceViewHeaderStore } from '@components/WorkspaceView/components/WorkspaceViewHeader/stores';

function useCancelEditWorkspaceName() {
  const setIsNameEditing = useWorkspaceViewHeaderStore(({ setIsNameEditing }) => setIsNameEditing);

  return () => setIsNameEditing(false);
}

export default useCancelEditWorkspaceName;
