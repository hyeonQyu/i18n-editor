import useFetchWorkspace from '@hooks/workspace/useFetchWorkspace';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { useWorkspaceStore } from '@stores/workspace';

function useSelectWorkspaceHandler() {
  const workspace = useWorkspace();
  const fetchWorkspace = useFetchWorkspace();
  const resetNamespace = useWorkspaceStore(({ resetNamespace }) => resetNamespace);

  return async (id: string) => {
    if (workspace?.id === id) return;

    await fetchWorkspace(id);
    resetNamespace();
  };
}

export default useSelectWorkspaceHandler;
