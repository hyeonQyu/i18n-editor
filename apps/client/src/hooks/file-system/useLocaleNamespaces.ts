import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';
import { GetFileSystemLocaleRequest } from 'i18n-editor-common';

const DEFAULT_NAMESPACES: string[] = [];

function useLocaleNamespaces(path: string) {
  const api = useAPI();

  const req: GetFileSystemLocaleRequest = { path };

  const { data: { data: { namespaces } = { namespaces: DEFAULT_NAMESPACES } } = {} } = useQuery({
    queryKey: QUERY_KEY.fileSystem.getLocale(req),
    queryFn: async () => (await api.fileSystem.getFileSystemLocale(req)).data,
    enabled: Boolean(path),
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  return namespaces;
}

export default useLocaleNamespaces;
