import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useWorkspaceStore } from '@stores/workspace';
import { useQuery } from '@tanstack/react-query';
import { GetNamespaceRequest, GetNamespaceResponse } from 'i18n-editor-common';

function useNamespace(): GetNamespaceResponse | undefined {
  const api = useAPI();

  const path = useWorkspaceStore(({ path }) => path) ?? '';
  const namespace = useWorkspaceStore(({ namespace }) => namespace) ?? '';

  const req: GetNamespaceRequest = { localeDirectoryPath: path, namespace };

  const { data: { data } = {} } = useQuery({
    queryKey: QUERY_KEY.namespace.getNamespace(req),
    queryFn: async () => (await api.namespace.getNamespace(req)).data,
    enabled: Boolean(path && namespace),
  });

  return data;
}

export default useNamespace;
