import { useGlobalStore } from '@stores/global';

function useNamespace() {
  return useGlobalStore((state) => state.namespace);
}

export default useNamespace;
