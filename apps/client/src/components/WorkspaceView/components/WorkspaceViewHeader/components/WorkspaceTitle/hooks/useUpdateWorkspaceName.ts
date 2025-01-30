import { useWorkspaceViewHeaderStore } from '@components/WorkspaceView/components/WorkspaceViewHeader/stores';
import useUpdateWorkspace from '@hooks/workspace/useUpdateWorkspace';
import { useWorkspace } from '@providers/WorkspaceProvider';

function useUpdateWorkspaceName() {
  const workspace = useWorkspace();

  const editingName = useWorkspaceViewHeaderStore(({ editingName }) => editingName);
  const setNameEditing = useWorkspaceViewHeaderStore(({ setNameEditing }) => setNameEditing);

  const updateWorkspace = useUpdateWorkspace();

  return async () => {
    if (!workspace) return;

    await updateWorkspace({ ...workspace, name: editingName });
    setNameEditing(false);
  };
}

export default useUpdateWorkspaceName;
