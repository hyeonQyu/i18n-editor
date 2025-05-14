import NamespaceEditor from '@components/NamespaceView/components/NamespaceEditor';
import NamespaceToolbar from '@components/NamespaceView/components/NamespaceToolbar';
import useSearchFocusKeyboardEventHandler from '@components/NamespaceView/hooks/useSearchFocusKeyboardEventHandler';
import { useNamespaceViewSearchStore } from '@components/NamespaceView/stores/search';
import useNamespace from '@hooks/namespace/useNamespace';
import useKeyboardEventListener from '@hooks/useKeyboardEventListener';
import useWorkspace from '@hooks/workspace/useWorkspace';
import { Box } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';

function NamespaceView() {
  const workspace = useWorkspace();
  const namespace = useNamespace();

  const handleSearchFocus = useSearchFocusKeyboardEventHandler();
  useKeyboardEventListener(handleSearchFocus);

  const reset = useNamespaceViewSearchStore((state) => state.reset);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
      <Head>
        <title>
          {workspace?.name} / {namespace}
        </title>
      </Head>

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
    </>
  );
}

export default NamespaceView;
