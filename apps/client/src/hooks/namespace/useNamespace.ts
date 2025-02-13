import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { useWorkspaceStore } from '@stores/workspace';
import { useQuery } from '@tanstack/react-query';
import { GetNamespaceRequest, GetNamespaceResponse } from 'i18n-editor-common';

function useNamespace(): GetNamespaceResponse | undefined {
  const api = useAPI();

  const workspace = useWorkspace();
  const namespace = useWorkspaceStore(({ namespace }) => namespace) ?? '';

  const id = workspace?.id ?? '';

  const req: GetNamespaceRequest = { id, namespace };

  const { data: { data } = {} } = useQuery({
    queryKey: QUERY_KEY.workspace.getNamespace(req),
    queryFn: async () => (await api.workspace.getNamespace(req)).data,
    enabled: Boolean(id && namespace),
  });

  return data;
}

export default useNamespace;
