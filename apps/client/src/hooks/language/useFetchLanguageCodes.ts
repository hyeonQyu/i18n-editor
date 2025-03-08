import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQueryClient } from '@tanstack/react-query';

function useFetchLanguageCodes() {
  const queryClient = useQueryClient();

  const api = useAPI();

  return (workspaceId: string) =>
    queryClient.fetchQuery({
      queryKey: QUERY_KEY.workspace.getLanguages({ id: workspaceId }),
      queryFn: async () => (await api.workspace.getLanguages({ id: workspaceId })).data,
    });
}

export default useFetchLanguageCodes;
