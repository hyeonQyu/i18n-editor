import useInvalidateLocaleNamespaces from '@hooks/file-system/useInvalidateLocaleNamespaces';
import { useCallback, useEffect, useState } from 'react';

function useNamespaceSelectOpenHandler() {
  const [shouldInvalidate, setShouldInvalidate] = useState(false);

  const invalidateLocaleNamespaces = useInvalidateLocaleNamespaces();

  useEffect(() => {
    const handleFocus = () => setShouldInvalidate(true);

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return useCallback(() => {
    if (!shouldInvalidate) return;
    setShouldInvalidate(false);
    return invalidateLocaleNamespaces();
  }, [shouldInvalidate, invalidateLocaleNamespaces]);
}

export default useNamespaceSelectOpenHandler;
