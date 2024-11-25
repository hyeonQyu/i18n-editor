import { QUERY_KEY } from '@defines/reactQuery';
import { useQueryClient } from '@tanstack/react-query';
import { GetFileSystemLocaleRequest, GetFileSystemLocaleResponse, ResponseEntity } from 'i18n-editor-common';

const DEFAULT_NAMESPACES: string[] = [];

function useLocaleNamespaces(path: string) {
  const req: GetFileSystemLocaleRequest = { path };

  const queryClient = useQueryClient();

  const queryData = queryClient.getQueryData<ResponseEntity<GetFileSystemLocaleResponse>>(QUERY_KEY.fileSystem.getLocale(req));

  return queryData?.data?.namespaces ?? DEFAULT_NAMESPACES;
}

export default useLocaleNamespaces;
