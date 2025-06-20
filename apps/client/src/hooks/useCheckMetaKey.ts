import useOS from '@hooks/useOS';
import { useCallback } from 'react';

function useCheckMetaKey() {
  const os = useOS();

  return useCallback(
    (e: KeyboardEvent) => {
      if (os === 'macos') return e.metaKey;
      return e.ctrlKey;
    },
    [os],
  );
}

export default useCheckMetaKey;
