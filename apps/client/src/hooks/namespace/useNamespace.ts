import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { useWorkspaceStore } from '@stores/workspace';
import { useQuery } from '@tanstack/react-query';
import { GetNamespaceRequest1, GetNamespaceResponse1 } from 'i18n-editor-common';

function useNamespace(): GetNamespaceResponse1 | undefined {
  const api = useAPI();

  const workspace = useWorkspace();
  const namespace = useWorkspaceStore(({ namespace }) => namespace) ?? '';

  const path = workspace?.path ?? '';

  const req: GetNamespaceRequest1 = { localeDirectoryPath: path, namespace };

  const { data: { data } = {} } = useQuery({
    queryKey: QUERY_KEY.namespace.getNamespace(req),
    queryFn: async () => (await api.namespace.getNamespace(req)).data,
    enabled: Boolean(path && namespace),
  });

  return data;
}

export default useNamespace;
