import { QueryOption, QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';
import { GetNamespacesParams, GetNamespacesResponse } from 'i18n-editor-common';
import { useMemo } from 'react';

function useQueryGetNamespaces(
  workspaceId: string,
  options: QueryOption<GetNamespacesResponse, typeof QUERY_KEY.workspace.getNamespaces> = {},
) {
  const api = useAPI();
  const req: GetNamespacesParams = useMemo(() => ({ id: workspaceId }), [workspaceId]);

  return useQuery({
    queryKey: QUERY_KEY.workspace.getNamespaces(req),
    queryFn: async () => (await api.workspace.getNamespaces(req)).data,
    enabled: Boolean(workspaceId),
    ...options,
  });
}

export default useQueryGetNamespaces;
