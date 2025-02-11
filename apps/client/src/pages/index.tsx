import StartView from '@components/StartView';
import WorkspaceView from '@components/WorkspaceView';
import useInitialLoading from '@hooks/useInitialLoading';
import { Box, CircularProgress } from '@mui/material';
import { useWorkspace } from 'providers/WorkspaceProvider';

function HomePage() {
  const loading = useInitialLoading();

  const workspace = useWorkspace();

  if (loading) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <Box sx={{ height: '100%' }}>{workspace ? <WorkspaceView /> : <StartView />}</Box>;
}

export default HomePage;
