import { FolderOpen } from '@mui/icons-material';
import { Button } from '@mui/material';

function OpenNativeFileExplorerButton() {
  return (
    <Button sx={{ width: '54px' }}>
      <FolderOpen />
    </Button>
  );
}

export default OpenNativeFileExplorerButton;
