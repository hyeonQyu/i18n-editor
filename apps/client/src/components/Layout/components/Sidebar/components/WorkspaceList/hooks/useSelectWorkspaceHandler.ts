import useResetNamespace from '@hooks/namespace/useResetNamespace';
import useFetchWorkspace from '@hooks/workspace/useFetchWorkspace';
import { useWorkspace } from '@providers/WorkspaceProvider';

function useSelectWorkspaceHandler() {
  const workspace = useWorkspace();
  const fetchWorkspace = useFetchWorkspace();
  const resetNamespace = useResetNamespace();

  return async (id: string) => {
    if (workspace?.id === id) return;

    await fetchWorkspace(id);
    await resetNamespace();
  };
}

export default useSelectWorkspaceHandler;
