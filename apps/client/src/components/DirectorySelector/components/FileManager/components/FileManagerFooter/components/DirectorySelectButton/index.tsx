import useCloseFileManager from '@components/DirectorySelector/components/FileManager/hooks/useCloseFileManager';
import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import useFetchLocaleNamespaces from '@hooks/file-system/useFetchLocaleNamespaces';
import useCreateAxiosErrorHandler from '@hooks/useCreateAxiosErrorHandler';
import { Button } from '@mui/material';
import { usePathStore } from '@stores/pathStore';
import { HttpStatusCode } from 'axios';

function DirectorySelectButton() {
  const path = useFileManagerStore(({ path }) => path);
  const setPath = usePathStore(({ setPath }) => setPath);

  const close = useCloseFileManager();

  const fetchNamespaces = useFetchLocaleNamespaces();
  const createErrorHandler = useCreateAxiosErrorHandler();

  const handleClick = async () => {
    if (!path) return;

    try {
      await fetchNamespaces(path);
      setPath(path);
      close();
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
