import { useUpdateCurrentWorkspaceName } from '@/components/WorkspaceView/components/WorkspaceTitle/hooks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';

function WorkspaceNameEditFinishButton() {
  const updateWorkspaceName = useUpdateCurrentWorkspaceName();

  const handleClick = () => updateWorkspaceName();

  return (
    <IconButton aria-label={'complete edit workspace name'} size={'medium'} onClick={handleClick}>
      <CheckCircleIcon fontSize={'small'} />
    </IconButton>
  );
}

export default WorkspaceNameEditFinishButton;
