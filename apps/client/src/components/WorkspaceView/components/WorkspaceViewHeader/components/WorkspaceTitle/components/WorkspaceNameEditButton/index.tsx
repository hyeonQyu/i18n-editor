import { useWorkspaceViewHeaderStore } from '@components/WorkspaceView/components/WorkspaceViewHeader/stores';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

function WorkspaceNameEditButton() {
  const setNameEditing = useWorkspaceViewHeaderStore(({ setNameEditing }) => setNameEditing);

  const handleClick = () => setNameEditing(true);

  return (
    <IconButton aria-label={'edit workspace name'} size={'medium'} onClick={handleClick}>
      <EditIcon fontSize={'small'} />
    </IconButton>
  );
}

export default WorkspaceNameEditButton;
