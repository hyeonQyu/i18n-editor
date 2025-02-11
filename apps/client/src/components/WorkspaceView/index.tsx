import NamespaceEditor from '@components/NamespaceEditor';
import WorkspaceViewHeader from '@components/WorkspaceView/components/WorkspaceViewHeader';
import useNamespace from '@hooks/namespace/useNamespace';
import { Box } from '@mui/material';

function WorkspaceView() {
  const namespace = useNamespace();

  return (
    <Box
      component={'section'}
      sx={{
        padding: '44px 36px',
      }}
    >
      <WorkspaceViewHeader />
      {namespace && <NamespaceEditor />}
    </Box>
  );
}

export default WorkspaceView;
