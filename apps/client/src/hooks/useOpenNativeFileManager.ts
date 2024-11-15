import { MUTATION_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useMutation } from '@tanstack/react-query';

function useOpenNativeFileManager() {
  const api = useAPI();

  const { mutateAsync } = useMutation({
    mutationKey: MUTATION_KEY.fileSystem.postFileManager(),
    mutationFn: api.fileSystem.postFileSystemFileManager,
  });

  return mutateAsync;
}

export default useOpenNativeFileManager;
