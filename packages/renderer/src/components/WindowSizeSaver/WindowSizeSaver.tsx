import { useUpdateUIConfig } from '@/hooks/domains/ui/useUpdateUIConfig';
import { TIME_UNIT } from '@i18n-editor/shared';
import { debounce } from 'lodash-es';
import { useEffect } from 'react';

function WindowSizeSaver() {
  const updateUIConfig = useUpdateUIConfig();

  const save = () =>
    updateUIConfig({
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });

  useEffect(() => {
    const debouncedSave = debounce(save, TIME_UNIT.unitOfMs.asSecond);

    const handleResize = () => {
      debouncedSave();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      debouncedSave.cancel();
    };
  }, []);

  return null;
}

export default WindowSizeSaver;
