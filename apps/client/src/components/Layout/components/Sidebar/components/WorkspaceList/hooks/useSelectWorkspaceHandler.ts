import useFetchWorkspace from '@hooks/workspace/useQueryGetWorkspace';

function useSelectWorkspaceHandler() {
  const fetchWorkspace = useFetchWorkspace();

  return (id: string) => fetchWorkspace(id);
}

export default useSelectWorkspaceHandler;
