import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { usePathStore } from '@stores/pathStore';
import { useQuery } from '@tanstack/react-query';

function useInitialPath() {
  const pathFromStore = usePathStore(({ path }) => path);

  const api = useAPI();

  const { data: { data: { path } = { path: '' } } = {} } = useQuery({
    queryKey: QUERY_KEY.fileSystem.getInitialPath(),
    queryFn: async () => (await api.fileSystem.getFileSystemInitialPath()).data,
    refetchOnWindowFocus: false,
    enabled: !pathFromStore,
  });

  return path;
}

export default useInitialPath;
