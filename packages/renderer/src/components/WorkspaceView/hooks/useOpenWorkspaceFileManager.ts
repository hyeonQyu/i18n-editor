import { useOpenFileManager } from '@/hooks/domains/file-system';
import { useWorkspace } from '@/hooks/domains/workspace';

export const useOpenWorkspaceFileManager = () => {
  const workspace = useWorkspace();
  const openFileManager = useOpenFileManager();

  return () => {
    if (!workspace?.path) return;
    return openFileManager(workspace.path);
  };
};
