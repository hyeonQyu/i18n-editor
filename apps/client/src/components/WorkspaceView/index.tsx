import WorkspaceViewHeader from '@components/WorkspaceView/components/WorkspaceViewHeader';
import { Box } from '@mui/material';

function WorkspaceView() {
  return (
    <Box
      component={'section'}
      sx={{
        padding: '40px 36px 32px 36px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <WorkspaceViewHeader />
    </Box>
  );
}

export default WorkspaceView;
