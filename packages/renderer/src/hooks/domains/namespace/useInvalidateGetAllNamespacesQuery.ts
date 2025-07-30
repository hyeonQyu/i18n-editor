import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/reactQuery.query.constants';

export const useInvalidateGetAllNamespacesQuery = () => {
  const queryClient = useQueryClient();

  return (workspaceId: string) => queryClient.invalidateQueries({ queryKey: QUERY_KEY.workspace.namespace.getAll({ workspaceId }) });
};
