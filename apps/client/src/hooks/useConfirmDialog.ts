import { ConfirmDialogState, useConfirmDialogStore } from '@components/ConfirmDialog';

type ConfirmDialogParams = Pick<ConfirmDialogState, 'title' | 'content' | 'cancelAction' | 'confirmAction'>;

function useConfirmDialog() {
  const open = useConfirmDialogStore((state) => state.open);

  return (params: ConfirmDialogParams): Promise<boolean> => {
    return new Promise((resolve) => {
      open({ ...params, resolve });
    });
  };
}

export default useConfirmDialog;
