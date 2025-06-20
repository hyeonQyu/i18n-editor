import { QueryOption, QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';
import { GetTranslationsParams, GetTranslationsResponse } from 'i18n-editor-common';
import { useMemo } from 'react';

function useQueryGetTranslations(
  workspaceId: string,
  namespace: string,
  options: QueryOption<GetTranslationsResponse, typeof QUERY_KEY.workspace.getTranslations> = {},
) {
  const api = useAPI();
  const req: GetTranslationsParams = useMemo(() => ({ id: workspaceId, namespace }), [workspaceId, namespace]);

  return useQuery({
    queryKey: QUERY_KEY.workspace.getTranslations(req),
    queryFn: async () => (await api.workspace.getTranslations(req)).data,
    enabled: Boolean(workspaceId && namespace),
    ...options,
  });
}

export default useQueryGetTranslations;
