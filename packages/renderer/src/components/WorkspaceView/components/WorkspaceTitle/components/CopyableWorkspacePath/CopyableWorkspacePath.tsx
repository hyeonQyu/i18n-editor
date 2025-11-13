import { CopyableButton } from '@/components/CopyableButton';
import { useWorkspace } from '@/hooks/domains/workspace';
import { Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

function CopyableWorkspacePath() {
  const workspace = useWorkspace();
  const workspacePath = workspace?.path ?? '';

  return (
    <Tooltip title={'경로 복사'}>
      <CopyableButton copyText={workspacePath} sx={{ marginTop: '12px', color: grey[600], alignItems: 'center' }}>
        <Typography variant={'subtitle1'}>{workspace?.path}</Typography>
      </CopyableButton>
    </Tooltip>
  );
}

export default CopyableWorkspacePath;
