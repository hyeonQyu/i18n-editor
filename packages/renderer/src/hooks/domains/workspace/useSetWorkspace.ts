import { useNavigate } from 'react-router-dom';

export const useSetWorkspace = () => {
  const navigate = useNavigate();

  return (workspaceId: string) => {
    navigate(`/${workspaceId}`);
  };
};
