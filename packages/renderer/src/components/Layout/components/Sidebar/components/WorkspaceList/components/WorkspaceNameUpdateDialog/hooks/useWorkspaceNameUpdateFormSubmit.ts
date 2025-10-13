import { useWorkspaceNameUpdateDialogClose } from '@/components/Layout/components/Sidebar/components/WorkspaceList/components/WorkspaceNameUpdateDialog/hooks/useWorkspaceNameUpdateDialogClose';
import { useWorkspaceNameUpdateStore } from '@/components/Layout/components/Sidebar/components/WorkspaceList/stores/workspaceNameUpdate.store';
import { useUpdateWorkspace } from '@/hooks/domains/workspace';
import { FormEventHandler } from 'react';

export const useWorkspaceNameUpdateFormSubmit = (): FormEventHandler<HTMLFormElement> => {
  const workspace = useWorkspaceNameUpdateStore(({ workspace }) => workspace);
  const newName = useWorkspaceNameUpdateStore(({ newName }) => newName);
  const setHasError = useWorkspaceNameUpdateStore(({ setHasError }) => setHasError);

  const updateWorkspace = useUpdateWorkspace();

  const close = useWorkspaceNameUpdateDialogClose();

  return async (e) => {
    e.preventDefault();

    if (!workspace) return;

    try {
      await updateWorkspace({ ...workspace, name: newName });
      close();
    } catch (e) {
      setHasError(true);
    }
  };
};
