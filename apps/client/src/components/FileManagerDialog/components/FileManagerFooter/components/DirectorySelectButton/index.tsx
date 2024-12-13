import useFileManagerDialogCloseHandler from '@components/FileManagerDialog/hooks/useFileManagerDialogCloseHandler';
import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';
import useCreateAxiosErrorHandler from '@hooks/useCreateAxiosErrorHandler';
import { Button } from '@mui/material';
import { useGlobalStore } from '@stores/globalStore';
import { HttpStatusCode } from 'axios';

function DirectorySelectButton() {
  const path = useFileManagerDialogStore(({ path }) => path);
  const setPath = useGlobalStore(({ setPath }) => setPath);

  const close = useFileManagerDialogCloseHandler();

  const createErrorHandler = useCreateAxiosErrorHandler();

  const handleClick = async () => {
    if (!path) return;

    setPath(path);
    close();

    // TODO 예외 처리 로직 이동 필요
    try {
    } catch (e) {
      createErrorHandler({
        [HttpStatusCode.BadRequest]: ({ errorMessage }) => {
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
