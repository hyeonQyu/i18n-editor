import { useNamespaceViewTranslationStore } from '@/components/NamespaceView/stores';

export const useSelectTranslationKey = () => {
  return useNamespaceViewTranslationStore((store) => store.setSelectedTranslationKey);
};
