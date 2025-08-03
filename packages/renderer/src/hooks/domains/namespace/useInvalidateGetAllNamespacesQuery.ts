import { QUERY_KEY } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateGetAllNamespacesQuery = () => {
  const queryClient = useQueryClient();

  return (workspaceId: string) => queryClient.invalidateQueries({ queryKey: QUERY_KEY.workspace.namespace.getAll({ workspaceId }) });
};
