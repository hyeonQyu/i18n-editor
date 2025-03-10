import { useWorkspaceTitleStore } from '@components/WorkspaceView/components/WorkspaceTitle/stores';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

function WorkspaceNameEditButton() {
  const setIsNameEditing = useWorkspaceTitleStore(({ setIsNameEditing }) => setIsNameEditing);

  const handleClick = () => setIsNameEditing(true);

  return (
    <IconButton aria-label={'edit workspace name'} size={'medium'} onClick={handleClick} sx={{ display: 'inline-flex', flexShrink: 0 }}>
      <EditIcon fontSize={'small'} />
    </IconButton>
  );
}

export default WorkspaceNameEditButton;
