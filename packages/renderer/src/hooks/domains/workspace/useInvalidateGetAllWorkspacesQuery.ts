import { QUERY_KEY } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateGetAllWorkspacesQuery = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: QUERY_KEY.workspace.getAll() });
};
