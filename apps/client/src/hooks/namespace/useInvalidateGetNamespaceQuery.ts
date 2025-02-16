import { QUERY_KEY } from '@defines/reactQuery';
import { useQueryClient } from '@tanstack/react-query';

function useInvalidateGetNamespaceQuery() {
  const queryClient = useQueryClient();

  return (id: string, namespace: string) => queryClient.invalidateQueries(QUERY_KEY.workspace.getNamespace({ id, namespace }));
}

export default useInvalidateGetNamespaceQuery;
