import useWorkspaceNameUpdateDialogClose from '@components/Layout/components/Sidebar/components/WorkspaceList/components/hooks/useWorkspaceNameUpdateDialogClose';
import { useWorkspaceNameUpdateStore } from '@components/Layout/components/Sidebar/components/WorkspaceList/stores/nameUpdate';
import useUpdateWorkspace from '@hooks/workspace/useUpdateWorkspace';
import { FormEventHandler } from 'react';

function useWorkspaceNameUpdateFormSubmit(): FormEventHandler<HTMLFormElement> {
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
    } catch (e) {
      setHasError(true);
    }
    close();
  };
}

export default useWorkspaceNameUpdateFormSubmit;
