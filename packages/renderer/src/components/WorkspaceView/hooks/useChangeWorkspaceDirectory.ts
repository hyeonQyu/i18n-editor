import { useOpenFileManagerDialog } from '@/components/FileManagerDialog';
import { useUpdateWorkspace, useWorkspace } from '@/hooks/domains/workspace';

export const useChangeWorkspaceDirectory = () => {
  const workspace = useWorkspace();
  const openFileManagerDialog = useOpenFileManagerDialog();
  const updateWorkspace = useUpdateWorkspace();

  return () => {
    if (!workspace?.path) return;
    openFileManagerDialog(workspace.path, (path) => updateWorkspace({ ...workspace, path }));
  };
};
