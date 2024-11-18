import { useEffect } from 'react';

function useKeyboardEventListener(handler: (e: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handler]);
}

export default useKeyboardEventListener;
