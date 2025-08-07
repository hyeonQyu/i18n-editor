import {
  useWorkspaceNameUpdateDialogClose,
  useWorkspaceNameUpdateFormSubmit,
} from '@/components/Layout/components/Sidebar/components/WorkspaceList/components/WorkspaceNameUpdateDialog/hooks';
import { useWorkspaceNameUpdateStore } from '@/components/Layout/components/Sidebar/components/WorkspaceList/stores/workspaceNameUpdate.store';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';

function WorkspaceNameUpdateDialog() {
  const workspace = useWorkspaceNameUpdateStore(({ workspace }) => workspace);
  const newName = useWorkspaceNameUpdateStore(({ newName }) => newName);
  const setNewName = useWorkspaceNameUpdateStore(({ setNewName }) => setNewName);
  const hasError = useWorkspaceNameUpdateStore(({ hasError }) => hasError);
  const setHasError = useWorkspaceNameUpdateStore(({ setHasError }) => setHasError);

  const opened = Boolean(workspace);

  const handleClose = useWorkspaceNameUpdateDialogClose();
  const handleSubmit = useWorkspaceNameUpdateFormSubmit();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewName(e.target.value);
    setHasError(false);
  };

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      disableRestoreFocus
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>워크스페이스 이름 변경</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          required
          margin={'dense'}
          name={'workspace'}
          label={'워크스페이스 이름'}
          variant={'standard'}
          fullWidth
          value={newName}
          onChange={handleChange}
          error={hasError}
        />
      </DialogContent>

      <DialogActions>
        <Button variant={'text'} onClick={handleClose}>
          취소
        </Button>
        <Button variant={'contained'} type={'submit'}>
          변경
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WorkspaceNameUpdateDialog;
