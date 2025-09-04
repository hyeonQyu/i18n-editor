import { useWorkspaceTitleStore } from '@/components/WorkspaceView/components/WorkspaceTitle/stores/workspaceTitle.store';
import { useUpdateWorkspace, useWorkspace } from '@/hooks/domains/workspace';

export const useUpdateCurrentWorkspaceName = () => {
  const workspace = useWorkspace();

  const editingName = useWorkspaceTitleStore((store) => store.editingName);
  const setHasError = useWorkspaceTitleStore((store) => store.setHasError);
  const setIsNameEditing = useWorkspaceTitleStore((store) => store.setIsNameEditing);

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
};
