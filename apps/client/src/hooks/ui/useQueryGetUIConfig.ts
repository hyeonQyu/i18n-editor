import { QueryOption, QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';
import { GetUIResponse } from 'i18n-editor-common';

function useQueryGetUIConfig(options: QueryOption<GetUIResponse, typeof QUERY_KEY.config.getUI> = {}) {
  const api = useAPI();

  return useQuery({
    queryKey: QUERY_KEY.config.getUI(),
    queryFn: async () => (await api.config.getUI()).data,
    ...options,
  });
}

export default useQueryGetUIConfig;
