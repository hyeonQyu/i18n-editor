import useAddNewWorkspace from '@hooks/workspace/useAddNewWorkspace';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Button, Typography } from '@mui/material';

function WorkspaceSelectButton() {
  const addNewWorkspace = useAddNewWorkspace();

  const handleClick = () => addNewWorkspace();

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
