import { QueryOption, QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';
import { GetWorkspaceRequest, GetWorkspaceResponse } from 'i18n-editor-common';
import { useMemo } from 'react';

function useQueryGetWorkspace(id: string, options: QueryOption<GetWorkspaceResponse, typeof QUERY_KEY.workspace.getWorkspace> = {}) {
  const api = useAPI();
  const req: GetWorkspaceRequest = useMemo(() => ({ id }), [id]);

  return useQuery({
    queryKey: QUERY_KEY.workspace.getWorkspace(req),
    queryFn: async () => (await api.workspace.getWorkspace(req)).data,
    enabled: Boolean(id),
    ...options,
  });
}

export default useQueryGetWorkspace;
