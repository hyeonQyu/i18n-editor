import { MUTATION_KEY } from '@defines/reactQuery';
import useInvalidateGetWorkspacesQuery from '@hooks/workspace/useInvalidateGetWorkspacesQuery';
import { useAPI } from '@providers/APIProvider';
import { useMutation } from '@tanstack/react-query';
import { DeleteWorkspaceParams } from 'i18n-editor-common';

function useDeleteWorkspace() {
  const api = useAPI();

  const invalidateWorkspaces = useInvalidateGetWorkspacesQuery();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.workspace.deleteWorkspace(),
    mutationFn: async (req: DeleteWorkspaceParams) => (await api.workspace.deleteWorkspace(req)).data,
  });

  return async (req: DeleteWorkspaceParams) => {
    await mutateAsync(req);
    await invalidateWorkspaces();
  };
}

export default useDeleteWorkspace;
