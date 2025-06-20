import WorkspaceLanguages from '@components/WorkspaceView/components/WorkspaceLanguages';
import { Box } from '@mui/material';
import Head from 'next/head';
import useWorkspace from '../../hooks/workspace/useWorkspace';
import WorkspaceTitle from './components/WorkspaceTitle';
import WorkspaceToolbar from './components/WorkspaceToolbar';
import WorkspaceViewNamespaceSelector from './components/WorkspaceViewNamespaceSelector';

function WorkspaceView() {
  const workspace = useWorkspace();

  return (
    <>
      <Head>
        <title>{workspace?.name}</title>
      </Head>

      <Box
        component={'section'}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <WorkspaceToolbar />

        <Box
          sx={{
            padding: '40px 36px 32px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          <WorkspaceTitle />
          <WorkspaceLanguages />
          <WorkspaceViewNamespaceSelector />
        </Box>
      </Box>
    </>
  );
}

export default WorkspaceView;
