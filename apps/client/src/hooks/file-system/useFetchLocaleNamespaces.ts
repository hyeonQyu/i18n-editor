import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQueryClient } from '@tanstack/react-query';
import { GetFileSystemLocaleRequest } from 'i18n-editor-common';

function useFetchLocaleNamespaces() {
  const api = useAPI();

  const queryClient = useQueryClient();

  return (path: string) => {
    const req: GetFileSystemLocaleRequest = { path };

    return queryClient.ensureQueryData({
      queryKey: QUERY_KEY.fileSystem.getLocale(req),
      queryFn: async () => (await api.fileSystem.getFileSystemLocale(req)).data,
      cacheTime: Infinity,
      staleTime: Infinity,
    });
  };
}

export default useFetchLocaleNamespaces;
