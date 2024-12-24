import { QUERY_KEY } from '@defines/reactQuery';
import useInvalidateGetWorkspacesQuery from '@hooks/workspace/useInvalidateGetWorkspacesQuery';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';
import { GetWorkspaceRequest } from 'i18n-editor-common';

function useQueryGetWorkspace(id: string) {
  const api = useAPI();

  const invalidateWorkspaces = useInvalidateGetWorkspacesQuery();

  const req: GetWorkspaceRequest = { id };

  return useQuery({
    queryKey: QUERY_KEY.workspace.getWorkspace(req),
    queryFn: async () => (await api.workspace.getWorkspace(req)).data,
    enabled: Boolean(id),
    onSuccess: invalidateWorkspaces,
  });
}

export default useQueryGetWorkspace;
