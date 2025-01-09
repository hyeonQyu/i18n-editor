import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useGlobalStore } from '@stores/globalStore';
import { useQuery } from '@tanstack/react-query';
import { GetNamespaceRequest, GetNamespaceResponse } from 'i18n-editor-common';

function useNamespace(): GetNamespaceResponse | undefined {
  const api = useAPI();

  const path = useGlobalStore(({ path }) => path) ?? '';
  const namespace = useGlobalStore(({ namespace }) => namespace) ?? '';

  const req: GetNamespaceRequest = { localeDirectoryPath: path, namespace };

  const { data: { data } = {} } = useQuery({
    queryKey: QUERY_KEY.namespace.getNamespace(req),
    queryFn: async () => (await api.namespace.getNamespace(req)).data,
    enabled: Boolean(path && namespace),
  });

  return data;
}

export default useNamespace;
