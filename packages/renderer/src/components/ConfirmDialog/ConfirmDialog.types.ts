import { ButtonOwnProps } from '@mui/material';
import { ReactNode } from 'react';

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
