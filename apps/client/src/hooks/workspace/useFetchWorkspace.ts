import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQueryClient } from '@tanstack/react-query';
import useInvalidateGetWorkspacesQuery from './useInvalidateGetWorkspacesQuery';

function useFetchWorkspace() {
  const queryClient = useQueryClient();

  const api = useAPI();

  const invalidateWorkspaces = useInvalidateGetWorkspacesQuery();

  return async (id: string) => {
    const req = { id };

    await Promise.all([
      queryClient.fetchQuery({
        queryKey: QUERY_KEY.workspace.getNamespaces(req),
        queryFn: async () => (await api.workspace.getNamespaces(req)).data,
      }),
      queryClient.fetchQuery({
        queryKey: QUERY_KEY.workspace.getLanguages(req),
        queryFn: async () => (await api.workspace.getLanguages(req)).data,
      }),
    ]);

    await invalidateWorkspaces();
  };
}

export default useFetchWorkspace;
