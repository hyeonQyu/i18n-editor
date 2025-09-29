import { useWorkspaceId } from '@/hooks/domains/workspace';
import { useNavigate } from 'react-router-dom';

export const useNavigateToNamespace = () => {
  const navigate = useNavigate();
  const workspaceId = useWorkspaceId();

  return (namespace: string) => {
    if (!workspaceId) {
      console.warn('Cannot navigate to namespace without workspaceId');
      return;
    }
    navigate(`/${workspaceId}/${namespace}`);
  };
};
