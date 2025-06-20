import useInvalidateGetWorkspacesQuery from '@hooks/workspace/useInvalidateGetWorkspacesQuery';
import { useAPI } from '@providers/APIProvider';
import { useMutation } from '@tanstack/react-query';
import { PutWorkspaceParams, PutWorkspaceRequest } from 'i18n-editor-common';

type Request = PutWorkspaceRequest & PutWorkspaceParams;

function useUpdateWorkspace() {
  const api = useAPI();

  const invalidateWorkspaces = useInvalidateGetWorkspacesQuery();

  const { mutateAsync } = useMutation({
    mutationFn: async (req: Request) => (await api.workspace.putWorkspace(req)).data,
  });

  return async (req: Request) => {
    await mutateAsync(req);
    await invalidateWorkspaces();
  };
}

export default useUpdateWorkspace;
