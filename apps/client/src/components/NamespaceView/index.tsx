import NamespaceEditor from '@components/NamespaceView/components/NamespaceEditor';
import NamespaceToolbar from '@components/NamespaceView/components/NamespaceToolbar';
import useSearchFocusKeyboardEventHandler from '@components/NamespaceView/hooks/useSearchFocusKeyboardEventHandler';
import { useNamespaceViewSearchStore } from '@components/NamespaceView/stores/search';
import useKeyboardEventListener from '@hooks/useKeyboardEventListener';
import { Box } from '@mui/material';
import { useEffect } from 'react';

function NamespaceView() {
  const handleSearchFocus = useSearchFocusKeyboardEventHandler();
  useKeyboardEventListener(handleSearchFocus);

  const reset = useNamespaceViewSearchStore((state) => state.reset);

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
      <NamespaceEditor />
    </Box>
  );
}

export default NamespaceView;
