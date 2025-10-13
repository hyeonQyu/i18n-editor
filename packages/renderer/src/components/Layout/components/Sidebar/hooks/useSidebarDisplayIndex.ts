import { useNamespace } from '@/hooks/domains/namespace';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { useLocation } from 'react-router-dom';

export const useSidebarDisplayIndex = () => {
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  const location = useLocation();

  if (workspaceId) {
    if (namespace) return 1;
    return 0;
  }

  if (location.pathname === '/config') return 2;

  return -1;
};
