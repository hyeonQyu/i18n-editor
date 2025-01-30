import useWorkspaceNameUpdateDialogClose from '@components/Layout/components/Sidebar/components/WorkspaceList/components/hooks/useWorkspaceNameUpdateDialogClose';
import useWorkspaceNameUpdateFormSubmit from '@components/Layout/components/Sidebar/components/WorkspaceList/components/hooks/useWorkspaceNameUpdateFormSubmit';
import { useWorkspaceNameUpdateStore } from '@components/Layout/components/Sidebar/components/WorkspaceList/stores/nameUpdate';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function WorkspaceNameUpdateDialog() {
  const workspace = useWorkspaceNameUpdateStore(({ workspace }) => workspace);
  const newName = useWorkspaceNameUpdateStore(({ newName }) => newName);
  const setNewName = useWorkspaceNameUpdateStore(({ setNewName }) => setNewName);

  const opened = Boolean(workspace);

  const handleClose = useWorkspaceNameUpdateDialogClose();

  const handleSubmit = useWorkspaceNameUpdateFormSubmit();

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
      <DialogTitle>workspace 이름 변경</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          required
          margin={'dense'}
          name={'workspace'}
          label={'workspace 이름'}
          variant={'standard'}
          fullWidth
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
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
