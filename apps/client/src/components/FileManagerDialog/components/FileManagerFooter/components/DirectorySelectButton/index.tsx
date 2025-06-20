import useFileManagerDialogCloseHandler from '@components/FileManagerDialog/hooks/useFileManagerDialogCloseHandler';
import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';
import useCreateAxiosErrorHandler from '@hooks/useCreateAxiosErrorHandler';
import { Button } from '@mui/material';
import { StatusCodes } from 'http-status-codes';

function DirectorySelectButton() {
  const path = useFileManagerDialogStore(({ path }) => path);
  const onConfirm = useFileManagerDialogStore(({ onConfirm }) => onConfirm);

  const close = useFileManagerDialogCloseHandler();

  const createErrorHandler = useCreateAxiosErrorHandler();

  const handleClick = async () => {
    if (!path) return;

    await onConfirm(path);
    close();

    // TODO 예외 처리 로직 이동 필요
    try {
    } catch (e) {
      createErrorHandler({
        [StatusCodes.BAD_REQUEST]: ({ errorMessage }) => {
          // TODO locale 디렉토리 아닌 경우 에러 처리
          console.log(errorMessage);
        },
      })(e);
    }
  };

  return (
    <Button disabled={!path} variant={'contained'} onClick={handleClick}>
      현재 디렉토리 선택
    </Button>
  );
}

export default DirectorySelectButton;
