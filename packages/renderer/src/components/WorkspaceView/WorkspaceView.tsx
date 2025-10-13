import { WorkspaceLanguages } from '@/components/WorkspaceView/components/WorkspaceLanguages';
import { WorkspaceTitle } from '@/components/WorkspaceView/components/WorkspaceTitle';
import { WorkspaceToolbar } from '@/components/WorkspaceView/components/WorkspaceToolbar';
import { WorkspaceViewNamespaceSelector } from '@/components/WorkspaceView/components/WorkspaceViewNamespaceSelector';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { Box, useTheme } from '@mui/material';

function WorkspaceView() {
  const {
    palette: { background },
  } = useTheme();

  const workspaceId = useWorkspaceId();

  if (!workspaceId) return null;

  return (
    <>
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
            backgroundColor: background.default,
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
