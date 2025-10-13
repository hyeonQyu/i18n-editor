import { useWindowFocus } from '@/hooks/common';
import { useCallback, useState } from 'react';

export const useRenderKey = () => {
  const [renderKey, setRenderKey] = useState(0);

  useWindowFocus({
    onFocus: useCallback(() => {
      setRenderKey((prev) => prev + 1);
    }, []),
  });

  return renderKey;
};
