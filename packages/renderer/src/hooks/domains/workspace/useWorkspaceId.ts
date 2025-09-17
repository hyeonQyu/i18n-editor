import { useParams } from 'react-router-dom';

export const useWorkspaceId = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  return workspaceId as string;
};
