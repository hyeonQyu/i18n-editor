import { useNamespaceViewSearchStore } from '@/components/NamespaceView/stores';

export const useTranslationSearchKeyword = () => {
  return useNamespaceViewSearchStore((store) => store.keyword);
};
