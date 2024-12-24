import useAddWorkspaceClickHandler from '@hooks/workspace/useAddWorkspaceClickHandler';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';

function WorkspaceAddButton() {
  const handleClick = useAddWorkspaceClickHandler();

  return (
    <Tooltip title={'워크스페이스 추가'}>
      <IconButton size={'large'} edge={'start'} color={'inherit'} onClick={handleClick}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}

export default WorkspaceAddButton;
