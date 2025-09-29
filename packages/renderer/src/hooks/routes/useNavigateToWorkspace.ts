import { useNavigate } from 'react-router-dom';

export const useNavigateToWorkspace = () => {
  const navigate = useNavigate();

  return (workspaceId: string) => {
    navigate(`/${workspaceId}`);
  };
};
