import useDeleteRow from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenu/components/TranslationDeleteConfirmDialog/hooks/useDeleteRow';
import { useTranslationDeleteConfirmDialogStore } from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenu/stores/delete';
import { useRowIndex } from '@components/NamespaceEditor/providers/RowIndexProvider';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { enqueueClosableSnackbar } from '@utils/snackbar';
import { FormEventHandler } from 'react';

function TranslationDeleteConfirmDialog() {
  const opened = useTranslationDeleteConfirmDialogStore((state) => state.opened);
  const deletingRowIndex = useTranslationDeleteConfirmDialogStore((state) => state.rowIndex);
  const close = useTranslationDeleteConfirmDialogStore((state) => state.close);

  const rowIndex = useRowIndex();

  const isDeletingIndex = deletingRowIndex === rowIndex;

  const deleteRow = useDeleteRow();

  const handleClose = () => close();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!isDeletingIndex) return;

    await deleteRow(rowIndex);

    enqueueClosableSnackbar({
      message: '번역이 삭제되었습니다.',
      variant: 'success',
    });

    close();
  };

  return (
    <Dialog
      open={opened && isDeletingIndex}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>번역을 삭제하시겠습니까?</DialogTitle>

      <DialogContent>
        <DialogContentText>번역이 삭제됩니다.</DialogContentText>
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

export default TranslationDeleteConfirmDialog;
