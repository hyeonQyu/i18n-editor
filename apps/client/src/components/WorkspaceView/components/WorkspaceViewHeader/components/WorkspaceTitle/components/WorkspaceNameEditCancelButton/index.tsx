import { useWorkspaceViewHeaderStore } from '@components/WorkspaceView/components/WorkspaceViewHeader/stores';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

function WorkspaceNameEditCancelButton() {
  const setNameEditing = useWorkspaceViewHeaderStore(({ setNameEditing }) => setNameEditing);

  const handleClick = () => setNameEditing(false);

  return (
    <IconButton aria-label={'cancel edit workspace name'} size={'medium'} onClick={handleClick}>
      <CancelIcon fontSize={'small'} />
    </IconButton>
  );
}

export default WorkspaceNameEditCancelButton;
