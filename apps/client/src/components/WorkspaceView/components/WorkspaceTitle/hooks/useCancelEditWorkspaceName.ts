import { useWorkspaceTitleStore } from '@components/WorkspaceView/components/WorkspaceTitle/stores';

function useCancelEditWorkspaceName() {
  const setIsNameEditing = useWorkspaceTitleStore(({ setIsNameEditing }) => setIsNameEditing);

  return () => setIsNameEditing(false);
}

export default useCancelEditWorkspaceName;
