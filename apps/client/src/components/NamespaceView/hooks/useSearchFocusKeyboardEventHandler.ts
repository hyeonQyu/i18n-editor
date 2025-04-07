import { useNamespaceViewSearchStore } from '@components/NamespaceView/stores/search';
import useCheckMetaKey from '@hooks/useCheckMetaKey';
import { useCallback } from 'react';

function useSearchFocusKeyboardEventHandler() {
  const triggerSearchFocus = useNamespaceViewSearchStore((state) => state.focusSearchInput);

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
}

export default useSearchFocusKeyboardEventHandler;
