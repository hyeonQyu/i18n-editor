import WorkspaceTitle from '@components/WorkspaceView/components/WorkspaceTitle';
import WorkspaceMenu from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceMenu';
import { Box } from '@mui/material';

function WorkspaceViewHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
        width: '100%',
      }}
    >
      <WorkspaceTitle />
      <WorkspaceMenu />
    </Box>
  );
}

export default WorkspaceViewHeader;
