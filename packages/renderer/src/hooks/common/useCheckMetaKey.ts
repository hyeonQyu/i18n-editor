import { useOS } from '@/hooks/common/useOS';
import { useCallback } from 'react';

export const useCheckMetaKey = () => {
  const os = useOS();

  return useCallback(
    (e: KeyboardEvent) => {
      if (os === 'macos') return e.metaKey;
      return e.ctrlKey;
    },
    [os],
  );
};
