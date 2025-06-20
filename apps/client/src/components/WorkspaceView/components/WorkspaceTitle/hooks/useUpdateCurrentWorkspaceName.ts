import { useWorkspaceTitleStore } from '@components/WorkspaceView/components/WorkspaceTitle/stores';
import useUpdateWorkspace from '@hooks/workspace/useUpdateWorkspace';
import useWorkspace from '@hooks/workspace/useWorkspace';

export default function useUpdateCurrentWorkspaceName() {
  const workspace = useWorkspace();

  const editingName = useWorkspaceTitleStore(({ editingName }) => editingName);
  const setHasError = useWorkspaceTitleStore(({ setHasError }) => setHasError);
  const setIsNameEditing = useWorkspaceTitleStore(({ setIsNameEditing }) => setIsNameEditing);
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
