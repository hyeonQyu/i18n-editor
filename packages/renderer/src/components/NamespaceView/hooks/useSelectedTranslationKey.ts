import { useNamespaceViewTranslationStore } from '@/components/NamespaceView/stores';

export const useSelectedTranslationKey = () => {
  return useNamespaceViewTranslationStore((store) => store.selectedTranslationKey);
};
