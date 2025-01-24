import { QUERY_KEY } from '@defines/reactQuery';
import useCreateWorkspace from '@hooks/workspace/useCreateWorkspace';
import { useQueryClient } from '@tanstack/react-query';

function useAddNewWorkspace() {
  const createWorkspace = useCreateWorkspace();

  const queryClient = useQueryClient();

  return async (path: string) => {
    await createWorkspace({ path, name: path });
    await queryClient.invalidateQueries(QUERY_KEY.workspace.getWorkspaces());
  };
}

export default useAddNewWorkspace;
