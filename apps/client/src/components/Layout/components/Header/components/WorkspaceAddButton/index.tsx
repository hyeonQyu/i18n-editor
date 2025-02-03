import useAddNewWorkspace from '@components/Layout/components/Header/components/WorkspaceAddButton/hooks/useAddNewWorkspace';
import useInitialPath from '@hooks/file-system/useInitialPath';
import useOpenFileManagerDialog from '@hooks/useOpenFileManagerDialog';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import { useWorkspace } from 'providers/WorkspaceProvider';

function WorkspaceAddButton() {
  const openFileManagerDialog = useOpenFileManagerDialog();

  const workspace = useWorkspace();

  const initialPath = useInitialPath();

  const addNewWorkspace = useAddNewWorkspace();

  const handleClick = () => openFileManagerDialog(workspace?.path ?? initialPath, addNewWorkspace);

  return (
    <Tooltip title={'워크스페이스 추가'}>
      <IconButton size={'large'} edge={'start'} color={'inherit'} onClick={handleClick}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}

export default WorkspaceAddButton;
