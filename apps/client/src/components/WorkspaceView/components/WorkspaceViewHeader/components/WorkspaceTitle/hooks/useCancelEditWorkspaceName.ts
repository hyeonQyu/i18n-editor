import { useWorkspaceViewHeaderStore } from '@components/WorkspaceView/components/WorkspaceViewHeader/stores';

function useCancelEditWorkspaceName() {
  const setNameEditing = useWorkspaceViewHeaderStore(({ setNameEditing }) => setNameEditing);

  return () => setNameEditing(false);
}

export default useCancelEditWorkspaceName;
