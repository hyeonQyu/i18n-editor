import { ConfirmDialogState, useConfirmDialogStore } from '@/components/ConfirmDialog';

type ConfirmDialogParams = Pick<ConfirmDialogState, 'title' | 'content' | 'cancelAction' | 'confirmAction'>;

export const useConfirmDialog = () => {
  const open = useConfirmDialogStore((state) => state.open);

  return (params: ConfirmDialogParams): Promise<boolean> => {
    return new Promise((resolve) => {
      open({ ...params, resolve });
    });
  };
};
