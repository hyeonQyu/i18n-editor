import { QUERY_KEY } from '@defines/reactQuery';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

/**
 * @deprecated
 * @returns
 */
function useInvalidateLocaleNamespaces() {
  const queryClient = useQueryClient();

  return useCallback(
    () =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.fileSystem.getLocaleAll(),
      }),
    [queryClient],
  );
}

export default useInvalidateLocaleNamespaces;
