import { MUTATION_KEY } from '@defines/reactQuery';
import useInvalidateGetWorkspacesQuery from '@hooks/workspace/useInvalidateGetWorkspacesQuery';
import { useAPI } from '@providers/APIProvider';
import { useMutation } from '@tanstack/react-query';
import { PostWorkspaceRequest } from 'i18n-editor-common';

function useCreateWorkspace() {
  const api = useAPI();

  const invalidateWorkspaces = useInvalidateGetWorkspacesQuery();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.workspace.postWorkspace(),
    mutationFn: async (req: PostWorkspaceRequest) => (await api.workspace.postWorkspace(req)).data,
  });

  return async (req: PostWorkspaceRequest) => {
    const { data: { id } = {} } = await mutateAsync(req);
    await invalidateWorkspaces();
    return id;
  };
}

export default useCreateWorkspace;
