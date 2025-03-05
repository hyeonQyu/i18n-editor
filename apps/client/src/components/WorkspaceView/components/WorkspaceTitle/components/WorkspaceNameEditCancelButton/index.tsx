import useCancelEditWorkspaceName from '@components/WorkspaceView/components/WorkspaceTitle/hooks/useCancelEditWorkspaceName';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

function WorkspaceNameEditCancelButton() {
  const cancelEdit = useCancelEditWorkspaceName();

  const handleClick = () => cancelEdit();

  return (
    <IconButton aria-label={'cancel edit workspace name'} size={'medium'} onClick={handleClick}>
      <CancelIcon fontSize={'small'} />
    </IconButton>
  );
}

export default WorkspaceNameEditCancelButton;
