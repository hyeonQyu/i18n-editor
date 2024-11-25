import useLocaleNamespaces from '@hooks/file-system/useLocaleNamespaces';
import { useGlobalStore } from '@stores/globalStore';

function useNamespaces() {
  const path = useGlobalStore(({ path }) => path) ?? '';
  return useLocaleNamespaces(path);
}

export default useNamespaces;
