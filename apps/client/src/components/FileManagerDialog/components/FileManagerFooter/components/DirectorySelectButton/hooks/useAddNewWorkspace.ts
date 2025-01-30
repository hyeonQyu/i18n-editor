import useCreateWorkspace from '@hooks/workspace/useCreateWorkspace';

function useAddNewWorkspace() {
  const createWorkspace = useCreateWorkspace();

  return async (path: string) => {
    await createWorkspace({ path, name: path });
  };
}

export default useAddNewWorkspace;
