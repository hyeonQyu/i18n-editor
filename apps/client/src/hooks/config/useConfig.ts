import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';

/**
 * @deprecated
 */
function useConfig() {
  const api = useAPI();

  const { data: { data: { config } = { config: undefined } } = {} } = useQuery({
    queryKey: QUERY_KEY.config.getConfig(),
    queryFn: async () => (await api.config.getConfig()).data,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return config;
}

export default useConfig;
