import { useWorkspaceViewHeaderStore } from '@components/WorkspaceView/components/WorkspaceViewHeader/stores';
import useUpdateWorkspace from '@hooks/workspace/useUpdateWorkspace';
import useWorkspace from '@hooks/workspace/useWorkspace';

export default function useUpdateCurrentWorkspaceName() {
  const workspace = useWorkspace();

  const editingName = useWorkspaceViewHeaderStore(({ editingName }) => editingName);
  const setHasError = useWorkspaceViewHeaderStore(({ setHasError }) => setHasError);
  const setIsNameEditing = useWorkspaceViewHeaderStore(({ setIsNameEditing }) => setIsNameEditing);
  const updateWorkspaceName = useUpdateWorkspace();

  return async () => {
    if (!workspace) return;

    try {
      await updateWorkspaceName({
        ...workspace,
        name: editingName,
      });
      setHasError(false);
      setIsNameEditing(false);
    } catch (err) {
      setHasError(true);
    }
  };
}
