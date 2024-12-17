import useQueryGetWorkspaces from '@hooks/workspace/useQueryGetWorkspaces';

function useInitialLoading() {
  const { data, isLoading } = useQueryGetWorkspaces();
  return !data || isLoading;
}

export default useInitialLoading;
