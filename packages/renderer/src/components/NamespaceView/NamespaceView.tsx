import NamespaceToolbar from '@/components/NamespaceView/components/NamespaceToolbar';
import NamespaceTranslation from '@/components/NamespaceView/components/NamespaceTranslation/NamespaceTranslation';
import { useSearchFocusKeyboardEventHandler } from '@/components/NamespaceView/hooks';
import { useNamespaceViewSearchStore } from '@/components/NamespaceView/stores';
import { useKeyboardEventListener } from '@/hooks/common';
import { Box } from '@mui/material';
import { useEffect } from 'react';

function NamespaceView() {
  const searchFocusKeyboardEventHandler = useSearchFocusKeyboardEventHandler();
  useKeyboardEventListener(searchFocusKeyboardEventHandler);

  const reset = useNamespaceViewSearchStore((store) => store.reset);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <Box
      style={{ height: '100%' }}
      sx={{
        position: 'relative',

        '& > div': {
          borderRadius: 0,
        },
      }}
    >
      <NamespaceToolbar />
      <NamespaceTranslation />
    </Box>
  );
}

export default NamespaceView;
