import useInitialPath from '@hooks/file-system/useInitialPath';
import useOpenFileManagerDialog from '@hooks/useOpenFileManagerDialog';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useWorkspaceStore } from '@stores/workspace';

function WorkspaceAddButton() {
  const openFileManagerDialog = useOpenFileManagerDialog();

  const workspacePath = useWorkspaceStore(({ path }) => path);

  const initialPath = useInitialPath();

  const handleClick = () => openFileManagerDialog(workspacePath ?? initialPath);

  return (
    <Tooltip title={'워크스페이스 추가'}>
      <IconButton size={'large'} edge={'start'} color={'inherit'} onClick={handleClick}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}

export default WorkspaceAddButton;
