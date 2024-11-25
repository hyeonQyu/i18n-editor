import { QUERY_KEY } from '@defines/reactQuery';
import { useQueryClient } from '@tanstack/react-query';

function useInvalidateLocaleNamespaces() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: QUERY_KEY.fileSystem.getLocaleAll(),
    });
}

export default useInvalidateLocaleNamespaces;
