import useOpenFileManagerDialog from '@hooks/useOpenFileManagerDialog';
import useUpdateWorkspace from '@hooks/workspace/useUpdateWorkspace';
import useWorkspace from '@hooks/workspace/useWorkspace';

function useChangeDirectoryClickHandler() {
  const workspace = useWorkspace();

  const openFileManagerDialog = useOpenFileManagerDialog();

  const updateWorkspace = useUpdateWorkspace();

  return () => {
    if (!workspace?.path) return;
    openFileManagerDialog(workspace.path, (path) => updateWorkspace({ ...workspace, path }));
  };
}

export default useChangeDirectoryClickHandler;
