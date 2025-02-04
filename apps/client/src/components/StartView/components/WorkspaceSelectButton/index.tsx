import useAddNewWorkspace from '@components/Layout/components/Header/components/WorkspaceAddButton/hooks/useAddNewWorkspace';
import useInitialPath from '@hooks/file-system/useInitialPath';
import useOpenFileManagerDialog from '@hooks/useOpenFileManagerDialog';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Button, Typography } from '@mui/material';

function WorkspaceSelectButton() {
  const openFileManagerDialog = useOpenFileManagerDialog();

  const initialPath = useInitialPath();

  const addNewWorkspace = useAddNewWorkspace();

  const handleClick = () => openFileManagerDialog(initialPath, addNewWorkspace);

  return (
    <Button
      onClick={handleClick}
      variant={'contained'}
      sx={{
        display: 'flex',
        borderRadius: '8px',
        width: '300px',
        height: '56px',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      <Typography variant={'body1'} color={'white'}>
        디렉토리 선택하고 시작
      </Typography>
      <CreateNewFolderIcon sx={{ fontSize: 32, color: 'white' }} />
    </Button>
  );
}

export default WorkspaceSelectButton;
