import { useOpenFileManagerDialog } from '@/components/FileManagerDialog';
import { useInitialPath } from '@/hooks/domains/file-system';
import { useCreateWorkspace } from '@/hooks/domains/workspace/useCreateWorkspace';
import { useWorkspace } from '@/hooks/domains/workspace/useWorkspace';
import { useNavigateToWorkspace } from '@/hooks/routes/useNavigateToWorkspace';

export const useSelectNewWorkspaceDirectory = () => {
  const openFileManagerDialog = useOpenFileManagerDialog();

  const createWorkspace = useCreateWorkspace();

  const workspace = useWorkspace();

  const initialPath = useInitialPath(Boolean(workspace));

  const toWorkspacePage = useNavigateToWorkspace();

  return () => {
    if (!initialPath) return;

    openFileManagerDialog(initialPath, async (path) => {
      const id = await createWorkspace({ path, name: path });
      if (!id) return;
      return toWorkspacePage(id);
    });
  };
};
