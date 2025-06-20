import { OS } from 'i18n-editor-common';
import { useEffect, useState } from 'react';

function useOS() {
  const [os, setOS] = useState<OS>();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    setOS(() => {
      if (/win/i.test(userAgent)) {
        return 'win';
      }

      if (/macintosh|mac os x/i.test(userAgent)) {
        return 'macos';
      }

      if (/linux/i.test(userAgent)) {
        return 'linux';
      }

      return undefined;
    });
  }, []);

  return os;
}

export default useOS;
