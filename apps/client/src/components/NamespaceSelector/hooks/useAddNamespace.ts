import useCreateNewNamespace from '@hooks/namespace/useCreateNewNamespace';
import { useGlobalStore } from '@stores/globalStore';

function useAddNamespace() {
  const path = useGlobalStore(({ path }) => path) ?? '';
  return useCreateNewNamespace(path);
}

export default useAddNamespace;
