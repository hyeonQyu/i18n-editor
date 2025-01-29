import NamespaceEditor from '@components/NamespaceEditor';
import NamespaceToolbar from '@components/NamespaceToolbar';
import { Box } from '@mui/material';

function NamespaceView() {
  return (
    <Box
      style={{ height: '100%' }}
      sx={{
        position: 'relative',

        '& > div': {
          borderRadius: 0,
        },
      }}
    >
      <NamespaceToolbar />
      <NamespaceEditor />
    </Box>
  );
}

export default NamespaceView;
