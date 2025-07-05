import { useElectronAPI } from '@/hooks/common';
import { useInvalidateGetAllWorkspacesQuery } from '@/hooks/domains/workspace/useInvalidateGetAllWorkspacesQuery';
import { WorkspaceDeleteRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';

export const useDeleteWorkspace = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationFn: (request: WorkspaceDeleteRequest) => electronAPI.workspace.delete(request),
  });

  const invalidateGetAllWorkspacesQuery = useInvalidateGetAllWorkspacesQuery();

  return async (request: WorkspaceDeleteRequest) => {
    await mutateAsync(request);
    await invalidateGetAllWorkspacesQuery();
  };
};
