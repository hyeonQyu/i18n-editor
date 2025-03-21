import WorkspaceLanguages from '@components/WorkspaceView/components/WorkspaceLanguages';
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
  );
}

export default WorkspaceView;
