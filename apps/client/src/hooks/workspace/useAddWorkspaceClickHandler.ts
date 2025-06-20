import useInitialPath from '@hooks/file-system/useInitialPath';
import useOpenFileManagerDialog from '@hooks/useOpenFileManagerDialog';
import useRouteWorkspacePage from '@hooks/workspace/useRouteWorkspacePage';
import useCreateWorkspace from './useCreateWorkspace';

function useAddWorkspaceClickHandler() {
  const openFileManagerDialog = useOpenFileManagerDialog();

  const createWorkspace = useCreateWorkspace();

  const initialPath = useInitialPath();

  const toWorkspacePage = useRouteWorkspacePage();

  return () =>
    openFileManagerDialog(initialPath, async (path) => {
      const id = await createWorkspace({ path, name: path });
      if (!id) return;
      await toWorkspacePage(id);
    });
}

export default useAddWorkspaceClickHandler;
