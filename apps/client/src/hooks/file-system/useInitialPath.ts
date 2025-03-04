import { QUERY_KEY } from '@defines/reactQuery';
import useWorkspace from '@hooks/workspace/useWorkspace';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';

function useInitialPath() {
  const workspace = useWorkspace();

  const api = useAPI();

  const { data: { data: { path } = { path: '' } } = {} } = useQuery({
    queryKey: QUERY_KEY.fileSystem.getInitialPath(),
    queryFn: async () => (await api.fileSystem.getFileSystemInitialPath()).data,
    refetchOnWindowFocus: false,
    enabled: !workspace?.path,
    staleTime: Infinity,
  });

  return path;
}

export default useInitialPath;
