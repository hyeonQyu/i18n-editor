import { Box } from '@mui/material';
import WorkspaceTitle from './components/WorkspaceTitle';
import WorkspaceToolbar from './components/WorkspaceToolbar';
import WorkspaceViewNamespaceSelector from './components/WorkspaceViewNamespaceSelector';

function WorkspaceView() {
  return (
    <Box
      component={'section'}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <WorkspaceToolbar />
      <WorkspaceTitle />

      <Box sx={{ marginTop: '24px' }}>
        <WorkspaceViewNamespaceSelector />
      </Box>
    </Box>
  );
}

export default WorkspaceView;
