import { QUERY_KEY } from '@/constants/reactQuery.query.constants';
import { useElectronAPI } from '@/hooks/common';
import { NamespaceGetAllRequest, NamespaceGetAllResponse } from '@i18n-editor/shared';
import { useQuery } from '@tanstack/react-query';

const DEFAULT_RESPONSE: NamespaceGetAllResponse = { namespaces: [] };

export const useNamespaces = (workspaceId?: string) => {
  const electronAPI = useElectronAPI();

  const request: NamespaceGetAllRequest = { workspaceId: workspaceId ?? '' };

  const { data: { namespaces } = DEFAULT_RESPONSE } = useQuery({
    queryKey: QUERY_KEY.workspace.namespace.getAll(request),
    queryFn: () => electronAPI.workspace.namespace.getAll(request),
    enabled: Boolean(workspaceId),
  });

  return namespaces;
};
