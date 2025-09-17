import { useEffect, useState } from 'react';

export const useWindowFocus = ({ onFocus, onBlur, disabled }: { onFocus?: () => void; onBlur?: () => void; disabled?: boolean } = {}) => {
  const [focused, setFocused] = useState(true);

  useEffect(() => {
    if (disabled) return;

    const handleFocus = () => {
      onFocus?.();
      setFocused(true);
    };

    const handleBlur = () => {
      onBlur?.();
      setFocused(false);
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    setFocused(document.hasFocus());

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [disabled, onFocus, onBlur]);

  return focused;
};
