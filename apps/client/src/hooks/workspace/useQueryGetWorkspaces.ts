import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';

function useQueryGetWorkspaces() {
  const api = useAPI();

  return useQuery({
    queryKey: QUERY_KEY.workspace.getWorkspaces(),
    queryFn: async () => (await api.workspace.getWorkspaces()).data,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}

export default useQueryGetWorkspaces;
