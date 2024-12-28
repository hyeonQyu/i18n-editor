import { QUERY_KEY } from '@defines/reactQuery';
import { useQueryClient } from '@tanstack/react-query';

function useInvalidateGetNamespaceQuery() {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: QUERY_KEY.namespace.getNamespaceAll() });
}

export default useInvalidateGetNamespaceQuery;
