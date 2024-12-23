import { useWorkspaceDeleteDialogStore } from '@components/Layout/components/Sidebar/components/WorkspaceList/stores/delete';
import useDeleteWorkspace from '@hooks/workspace/useDeleteWorkspace';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { enqueueClosableSnackbar } from '@utils/snackbar';
import { FormEventHandler } from 'react';

function WorkspaceDeleteConfirmDialog() {
  const workspaceId = useWorkspaceDeleteDialogStore(({ workspaceId }) => workspaceId);
  const opened = useWorkspaceDeleteDialogStore(({ opened }) => opened);
  const close = useWorkspaceDeleteDialogStore(({ close }) => close);

  const deleteWorkspace = useDeleteWorkspace();

  const closeDialog = () => close(() => ({ workspaceId: undefined }));

  const handleClose = () => closeDialog();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!workspaceId) return;

    await deleteWorkspace({ id: workspaceId });

    enqueueClosableSnackbar({
      message: '워크스페이스가 삭제되었습니다.',
      variant: 'success',
    });

    closeDialog();
  };

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>워크스페이스를 삭제하시겠습니까?</DialogTitle>

      <DialogContent>
        <DialogContentText>워크스페이스 목록에서 삭제됩니다.</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant={'text'} onClick={handleClose}>
          취소
        </Button>
        <Button variant={'contained'} color={'error'} type={'submit'}>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WorkspaceDeleteConfirmDialog;
