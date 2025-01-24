import WorkspaceViewHeader from '@components/WorkspaceView/components/WorkspaceViewHeader';
import { Box } from '@mui/material';

function WorkspaceView() {
  return (
    <Box
      component={'section'}
      sx={{
        padding: '44px 36px',
      }}
    >
      <WorkspaceViewHeader />
    </Box>
  );
}

export default WorkspaceView;
