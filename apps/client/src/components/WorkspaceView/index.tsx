import NamespaceEditor from '@components/NamespaceEditor';
import WorkspaceViewHeader from '@components/WorkspaceView/components/WorkspaceViewHeader';
import { Box } from '@mui/material';
import { useWorkspaceStore } from '@stores/workspace';

function WorkspaceView() {
  const namespace = useWorkspaceStore(({ namespace }) => namespace);

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
      <Box sx={{ height: '100%', marginTop: '20px' }}>{namespace && <NamespaceEditor />}</Box>
    </Box>
  );
}

export default WorkspaceView;
