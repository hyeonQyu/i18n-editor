import useUpdateWorkspace from '@hooks/workspace/useUpdateWorkspace';
import { useWorkspace } from '@providers/WorkspaceProvider';

function useChangeCurrentWorkspacePath() {
  const workspace = useWorkspace();

  const updateWorkspace = useUpdateWorkspace();

  return async (path: string) => {
    if (!workspace) return;
    await updateWorkspace({ ...workspace, path });
  };
}

export default useChangeCurrentWorkspacePath;
