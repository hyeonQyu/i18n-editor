import useInitialPath from '@hooks/file-system/useInitialPath';
import useOpenFileManagerDialog from '@hooks/useOpenFileManagerDialog';
import useCreateWorkspace from './useCreateWorkspace';

function useAddNewWorkspace() {
  const openFileManagerDialog = useOpenFileManagerDialog();

  const createWorkspace = useCreateWorkspace();

  const initialPath = useInitialPath();

  return () => openFileManagerDialog(initialPath, async (path) => await createWorkspace({ path, name: path }));
}

export default useAddNewWorkspace;
