import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQueryClient } from '@tanstack/react-query';
import { GetWorkspaceRequest } from 'i18n-editor-common';
import useInvalidateGetWorkspacesQuery from './useInvalidateGetWorkspacesQuery';

function useFetchWorkspace() {
  const queryClient = useQueryClient();

  const api = useAPI();

  const invalidateWorkspaces = useInvalidateGetWorkspacesQuery();

  return async (id: string) => {
    const req: GetWorkspaceRequest = { id };

    await queryClient.fetchQuery({
      queryKey: QUERY_KEY.workspace.getWorkspace(req),
      queryFn: async () => (await api.workspace.getWorkspace(req)).data,
    });

    await invalidateWorkspaces();
  };
}

export default useFetchWorkspace;
