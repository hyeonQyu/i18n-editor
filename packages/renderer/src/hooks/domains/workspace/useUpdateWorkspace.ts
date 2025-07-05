import { useElectronAPI } from '@/hooks/common';
import { useInvalidateGetAllWorkspacesQuery } from '@/hooks/domains/workspace/useInvalidateGetAllWorkspacesQuery';
import { WorkspaceUpdateRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';

export const useUpdateWorkspace = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationFn: (request: WorkspaceUpdateRequest) => electronAPI.workspace.update(request),
  });

  const invalidateGetAllWorkspacesQuery = useInvalidateGetAllWorkspacesQuery();

  return async (request: WorkspaceUpdateRequest) => {
    await mutateAsync(request);
    await invalidateGetAllWorkspacesQuery();
  };
};
