import { useCopyClipboard } from '@/hooks/common';
import { useWorkspace } from '@/hooks/domains/workspace';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { Button, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

function CopyableWorkspacePath() {
  const workspace = useWorkspace();
  const copyClipboard = useCopyClipboard();

  const handleClick = () => {
    if (!workspace) return;
    copyClipboard(workspace.path);
  };

  return (
    <Tooltip title={'경로 복사'}>
      <Button
        variant={'text'}
        sx={{ marginTop: '12px', color: grey[600], display: 'flex', alignItems: 'center', gap: '4px' }}
        onClick={handleClick}
      >
        <Typography variant={'subtitle1'}>{workspace?.path}</Typography>
        <ContentCopy fontSize={'small'} color={'inherit'} />
      </Button>
    </Tooltip>
  );
}

export default CopyableWorkspacePath;
