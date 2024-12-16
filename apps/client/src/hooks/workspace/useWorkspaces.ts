import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';
import { GetWorkspacesResponse } from 'i18n-editor-common';

const DEFAULT_RESPONSE: GetWorkspacesResponse = { workspaces: [] };

function useWorkspaces() {
  const api = useAPI();

  const { data: { data: { workspaces } = DEFAULT_RESPONSE } = {} } = useQuery({
    queryKey: QUERY_KEY.workspace.getWorkspaces(),
    queryFn: async () => (await api.workspace.getWorkspaces()).data,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return workspaces;
}

export default useWorkspaces;
