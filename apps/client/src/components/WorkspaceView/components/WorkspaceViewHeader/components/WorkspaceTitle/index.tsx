import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useWorkspace } from '@providers/WorkspaceProvider';

function WorkspaceTitle() {
  const workspace = useWorkspace();

  return (
    <Box>
      <Typography variant={'h2'}>{workspace?.name}</Typography>
      <Typography variant={'subtitle1'} color={grey[600]} sx={{ marginTop: '12px' }}>
        {workspace?.path}
      </Typography>
    </Box>
  );
}

export default WorkspaceTitle;
