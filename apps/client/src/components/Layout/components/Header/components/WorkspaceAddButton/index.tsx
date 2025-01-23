import useInitialPath from '@hooks/file-system/useInitialPath';
import useOpenFileManagerDialog from '@hooks/useOpenFileManagerDialog';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useLastWorkedWorkspace } from '@providers/LastWorkedWorkspaceProvider';

function WorkspaceAddButton() {
  const openFileManagerDialog = useOpenFileManagerDialog();

  const lastWorkedWorkspace = useLastWorkedWorkspace();

  const initialPath = useInitialPath();

  const handleClick = () => openFileManagerDialog(lastWorkedWorkspace?.path ?? initialPath);

  return (
    <Tooltip title={'워크스페이스 추가'}>
      <IconButton size={'large'} edge={'start'} color={'inherit'} onClick={handleClick}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}

export default WorkspaceAddButton;
