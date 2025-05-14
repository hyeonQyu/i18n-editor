import useNamespace from '@hooks/namespace/useNamespace';
import useWorkspaceId from '@hooks/workspace/useWorkspaceId';

function useSidebarDisplayIndex() {
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  if (workspaceId) {
    if (namespace) return 1;
    return 0;
  }

  return -1;
}

export default useSidebarDisplayIndex;
