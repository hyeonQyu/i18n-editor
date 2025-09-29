import { useNamespace } from '@/hooks/domains/namespace';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { useLocation } from 'react-router-dom';

export const useSidebarDisplayIndex = () => {
  const location = useLocation();
  console.log('location', location);
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  if (workspaceId) {
    if (namespace) return 1;
    return 0;
  }

  if (location.pathname === '/config') return 2;

  return -1;
};
