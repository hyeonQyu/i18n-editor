import { QUERY_KEY } from '@defines/reactQuery';
import { useQueryClient } from '@tanstack/react-query';

function useInvalidateGetUIConfigQuery() {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries(QUERY_KEY.config.getUI());
}

export default useInvalidateGetUIConfigQuery;
