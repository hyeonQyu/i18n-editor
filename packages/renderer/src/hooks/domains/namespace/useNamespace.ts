import { useGlobalStore } from '@/stores/global.store';

export const useNamespace = () => {
  return useGlobalStore((state) => state.namespace);
};
