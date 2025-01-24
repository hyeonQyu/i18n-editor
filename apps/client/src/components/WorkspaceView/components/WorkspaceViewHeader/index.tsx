import WorkspaceMenu from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceMenu';
import WorkspaceTitle from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle';
import { Box } from '@mui/material';

function WorkspaceViewHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <WorkspaceTitle />
      <WorkspaceMenu />
    </Box>
  );
}

export default WorkspaceViewHeader;
