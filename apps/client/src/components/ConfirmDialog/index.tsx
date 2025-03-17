import { Button, ButtonOwnProps, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FormEventHandler, ReactNode } from 'react';
import { create } from 'zustand';

export interface ConfirmDialogAction {
  onClick?: () => void | Promise<void>;
  label: string;
  color?: ButtonOwnProps['color'];
}

export interface ConfirmDialogState {
  title: ReactNode;
  content: ReactNode;
  cancelAction: ConfirmDialogAction;
  confirmAction: ConfirmDialogAction;
  opened: boolean;
  close: () => void;
  resolve: (value: boolean) => void;
  open: (params: Omit<ConfirmDialogState, 'open' | 'opened' | 'close'>) => void;
}

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
  const { opened, title, content, cancelAction, confirmAction, close, resolve } = useConfirmDialogStore();

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

  return (
    <Dialog open={opened} onClose={handleCancel} PaperProps={{ component: 'form', onSubmit: handleConfirm }}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent sx={{ whiteSpace: 'pre-line' }}>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel} variant={'text'}>
          {cancelAction.label}
        </Button>
        <Button variant="contained" type="submit">
          {confirmAction.label}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
