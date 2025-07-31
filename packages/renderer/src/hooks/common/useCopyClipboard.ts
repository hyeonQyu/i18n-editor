import { enqueueClosableSnackbar } from '@/utils/snackbar.utils';

export const useCopyClipboard = () => {
  return (copyText: string) => {
    navigator.clipboard.writeText(copyText).then(
      () => {
        enqueueClosableSnackbar({
          message: '클립보드에 복사되었습니다.',
          variant: 'info',
        });
      },
      () => {
        enqueueClosableSnackbar({
          message: '클립보드 복사에 실패했습니다.',
          variant: 'error',
        });
      },
    );
  };
};
