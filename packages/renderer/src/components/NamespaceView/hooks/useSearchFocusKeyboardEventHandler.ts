import { useNamespaceViewSearchStore } from '@/components/NamespaceView/stores/namespaceView.search.store';
import { useCheckMetaKey } from '@/hooks/common';
import { useCallback } from 'react';

export const useSearchFocusKeyboardEventHandler = () => {
  const triggerSearchFocus = useNamespaceViewSearchStore((store) => store.focusSearchInput);

  const checkMetaKey = useCheckMetaKey();

  return useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'f' && checkMetaKey(e)) {
        e.preventDefault();
        e.stopPropagation();
        triggerSearchFocus();
      }
    },
    [triggerSearchFocus, checkMetaKey],
  );
};
