import { useGlobalStore } from '@/stores/global.store';

export const useSetNamespace = () => {
  return useGlobalStore((state) => state.setNamespace);
};
