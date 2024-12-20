import useOpenFileManagerDialog from '@hooks/useOpenFileManagerDialog';
import FolderIcon from '@mui/icons-material/Folder';
import { Button } from '@mui/material';
import { useWorkspace } from '@providers/WorkspaceProvider';
import useChangeCurrentWorkspacePath from './hooks/useChangeCurrentWorkspacePath';

function DirectoryChangeButton() {
  const workspace = useWorkspace();

  const changeCurrentWorkspacePath = useChangeCurrentWorkspacePath();

  const openFileManagerDialog = useOpenFileManagerDialog();

  const handleClick = () => {
    if (!workspace?.path) return;
    openFileManagerDialog(workspace.path, changeCurrentWorkspacePath);
  };

  return (
    <Button variant={'contained'} sx={{ height: '40px', display: 'flex', gap: '8px' }} onClick={handleClick}>
      <FolderIcon fontSize={'small'} />
      <span>디렉토리 변경</span>
    </Button>
  );
}

export default DirectoryChangeButton;
