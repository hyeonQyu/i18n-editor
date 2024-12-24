import useAddNewWorkspace from '@hooks/workspace/useAddNewWorkspace';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';

function WorkspaceAddButton() {
  const addNewWorkspace = useAddNewWorkspace();

  const handleClick = () => addNewWorkspace();

  return (
    <Tooltip title={'워크스페이스 추가'}>
      <IconButton size={'large'} edge={'start'} color={'inherit'} onClick={handleClick}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}

export default WorkspaceAddButton;
