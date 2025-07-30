import { useElectronAPI } from '@/hooks/common/useElectronAPI';
import { useInvalidateGetAllNamespacesQuery } from '@/hooks/domains/namespace/useInvalidateGetAllNamespacesQuery';
import { NamespaceCreateRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';

export const useCreateNamespace = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationFn: (request: NamespaceCreateRequest) => electronAPI.workspace.namespace.create(request),
  });

  const invalidateGetAllNamespacesQuery = useInvalidateGetAllNamespacesQuery();

  return async (request: NamespaceCreateRequest) => {
    await mutateAsync(request);
    await invalidateGetAllNamespacesQuery(request.workspaceId);
  };
};
