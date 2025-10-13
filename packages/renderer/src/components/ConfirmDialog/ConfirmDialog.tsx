import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FormEventHandler, useRef, useState } from 'react';
import { create } from 'zustand';
import { ConfirmDialogState } from './ConfirmDialog.types';

export const useConfirmDialogStore = create<ConfirmDialogState>((set) => ({
  title: '',
  content: '',
  cancelAction: { label: '' },
  confirmAction: { label: '' },
  opened: false,
  close: () => set({ opened: false }),
  resolve: () => {},
  open: (params) => set({ ...params, opened: true }),
}));

function ConfirmDialog() {
  const { opened, title, content, cancelAction, confirmAction, close: onClose, resolve } = useConfirmDialogStore();
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  const [focusInitialized, setFocusInitialized] = useState(false);

  const close = () => {
    setFocusInitialized(false);
    onClose();
  };

  const handleCancel = async () => {
    await cancelAction.onClick?.();
    resolve?.(false);
    close();
  };

  const handleConfirm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await confirmAction.onClick?.();
    resolve?.(true);
    close();
  };

  const handleFocus = () => {
    if (focusInitialized) return true;

    confirmButtonRef.current?.focus();
    setFocusInitialized(true);
  };

  return (
    <Dialog open={opened} onClose={handleCancel} PaperProps={{ component: 'form', onSubmit: handleConfirm }} onFocus={handleFocus}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent sx={{ whiteSpace: 'pre-line' }}>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel} variant={'text'} color={cancelAction.color}>
          {cancelAction.label}
        </Button>
        <Button variant="contained" type="submit" color={confirmAction.color} ref={confirmButtonRef}>
          {confirmAction.label}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
