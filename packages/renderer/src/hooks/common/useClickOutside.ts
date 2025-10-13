import { RefObject, useEffect } from 'react';

type GeneralRefObject = RefObject<HTMLElement | null | undefined>;

export const useClickOutside = (ref: GeneralRefObject | GeneralRefObject[], onClickOutside: (e: MouseEvent) => void) => {
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (Array.isArray(ref)) {
        if (!ref.find((refObj) => refObj.current?.contains(e.target as Node))) {
          onClickOutside(e);
        }
        return;
      }

      if (!ref.current?.contains(e.target as Node)) {
        onClickOutside(e);
      }
    };

    window.addEventListener('click', clickOutside, { capture: true });
    return () => {
      window.removeEventListener('click', clickOutside, { capture: true });
    };
  }, [onClickOutside, ref]);
};
