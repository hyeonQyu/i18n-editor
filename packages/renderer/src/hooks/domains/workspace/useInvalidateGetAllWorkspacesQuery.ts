import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/reactQuery.query.constants';

export const useInvalidateGetAllWorkspacesQuery = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: QUERY_KEY.workspace.getAll() });
};
