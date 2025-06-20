import { QUERY_KEY } from '@defines/reactQuery';
import { useQueryClient } from '@tanstack/react-query';

function useInvalidateGetNamespacesQuery() {
  const queryClient = useQueryClient();

  return (workspaceId: string) => queryClient.invalidateQueries(QUERY_KEY.workspace.getNamespaces({ id: workspaceId }));
}

export default useInvalidateGetNamespacesQuery;
