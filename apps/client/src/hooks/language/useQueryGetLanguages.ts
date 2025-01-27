import { QueryOption, QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';
import { GetLanguagesParams, GetLanguagesResponse } from 'i18n-editor-common';
import { useMemo } from 'react';

function useQueryGetLanguages(
  workspaceId: string,
  options: QueryOption<GetLanguagesResponse, typeof QUERY_KEY.workspace.getLanguages> = {},
) {
  const api = useAPI();
  const req: GetLanguagesParams = useMemo(() => ({ id: workspaceId }), [workspaceId]);

  return useQuery({
    queryKey: QUERY_KEY.workspace.getLanguages(req),
    queryFn: async () => (await api.workspace.getLanguages(req)).data,
    enabled: Boolean(workspaceId),
    ...options,
  });
}

export default useQueryGetLanguages;
