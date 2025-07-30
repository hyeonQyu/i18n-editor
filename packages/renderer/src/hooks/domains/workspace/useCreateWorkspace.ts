import { useElectronAPI } from '@/hooks/common/useElectronAPI';
import { useInvalidateGetAllWorkspacesQuery } from '@/hooks/domains/workspace/useInvalidateGetAllWorkspacesQuery';
import { WorkspaceCreateRequest } from '@i18n-editor/shared';
import { useMutation } from '@tanstack/react-query';

export const useCreateWorkspace = () => {
  const electronAPI = useElectronAPI();

  const { mutateAsync } = useMutation({
    mutationFn: (request: WorkspaceCreateRequest) => electronAPI.workspace.create(request),
  });

  const invalidateGetAllWorkspacesQuery = useInvalidateGetAllWorkspacesQuery();

  return async (request: WorkspaceCreateRequest) => {
    const { id } = await mutateAsync(request);
    await invalidateGetAllWorkspacesQuery();
    return id;
  };
};
