import useFetchWorkspace from '@hooks/workspace/useQueryGetWorkspace';

function useSelectWorkspace() {
  const fetchWorkspace = useFetchWorkspace();

  return (id: string) => fetchWorkspace(id);
}

export default useSelectWorkspace;
