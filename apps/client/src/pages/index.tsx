import StartView from '@components/StartView';
import useInitialLoading from '@hooks/useInitialLoading';
import useRouteWorkspacePage from '@hooks/workspace/useRouteWorkspacePage';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useWorkspace } from 'providers/WorkspaceProvider';
import { useEffect } from 'react';

function HomePage() {
  const router = useRouter();

  const loading = useInitialLoading();

  const workspace = useWorkspace();

  const toWorkspacePage = useRouteWorkspacePage();

  useEffect(() => {
    if (!workspace?.id) return;
    toWorkspacePage(workspace.id);
  }, [workspace?.id, toWorkspacePage]);

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

  return <StartView />;
}

export default HomePage;
