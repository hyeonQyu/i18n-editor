import { useElectronAPI } from '@/hooks/common';
import { useInvalidateGetAllNamespacesQuery } from '@/hooks/domains/namespace/useInvalidateGetAllNamespacesQuery';
import { NamespaceDeleteRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';

export const useDeleteNamespace = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationFn: (request: NamespaceDeleteRequest) => electronAPI.workspace.namespace.delete(request),
  });

  const invalidateGetAllNamespacesQuery = useInvalidateGetAllNamespacesQuery();

  return async (request: NamespaceDeleteRequest) => {
    await mutateAsync(request);
    await invalidateGetAllNamespacesQuery(request.workspaceId);
  };
};
