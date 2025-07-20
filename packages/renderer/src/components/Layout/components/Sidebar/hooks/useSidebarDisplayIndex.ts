import { useNamespace } from '@/hooks/domains/namespace';
import { useWorkspaceId } from '@/hooks/domains/workspace';

export const useSidebarDisplayIndex = () => {
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  if (workspaceId) {
    if (namespace) return 1;
    return 0;
  }

  return -1;
};
