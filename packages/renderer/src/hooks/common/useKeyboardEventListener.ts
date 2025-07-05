import { useEffect } from 'react';

export const useKeyboardEventListener = (handler: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handler]);
};
