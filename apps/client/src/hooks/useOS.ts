import { OSType } from 'i18n-editor-common';
import { useEffect, useState } from 'react';

function useOS() {
  const [os, setOS] = useState<OSType>();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    setOS(() => {
      if (/windows phone/i.test(userAgent)) {
        return 'windows phone';
      }
      if (/win/i.test(userAgent)) {
        return 'windows';
      }
      if (/android/i.test(userAgent)) {
        return 'android';
      }
      if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return 'ios';
      }
      if (/macintosh|mac os x/i.test(userAgent)) {
        return 'mac';
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
