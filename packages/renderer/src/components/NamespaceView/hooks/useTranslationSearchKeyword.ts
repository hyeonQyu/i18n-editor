import { useNamespaceViewSearchStore } from '@/components/NamespaceView/stores/namespaceView.search.store';

export const useTranslationSearchKeyword = () => {
  return useNamespaceViewSearchStore((store) => store.keyword);
};
