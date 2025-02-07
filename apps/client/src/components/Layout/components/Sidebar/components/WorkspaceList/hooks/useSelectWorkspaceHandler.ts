import useFetchWorkspace from '@hooks/workspace/useFetchWorkspace';

function useSelectWorkspaceHandler() {
  const fetchWorkspace = useFetchWorkspace();

  return fetchWorkspace;
}

export default useSelectWorkspaceHandler;
