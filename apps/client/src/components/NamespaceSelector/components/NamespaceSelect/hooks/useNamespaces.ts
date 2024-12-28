import useLocaleNamespaces from '@hooks/file-system/useLocaleNamespaces';
import { usePathStore } from '@stores/pathStore';

function useNamespaces() {
  const path = usePathStore(({ path }) => path) ?? '';
  return useLocaleNamespaces(path);
}

export default useNamespaces;
