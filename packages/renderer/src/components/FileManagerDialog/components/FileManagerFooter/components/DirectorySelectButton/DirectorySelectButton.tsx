import { useFileManagerDialogCloseHandler } from '@/components/FileManagerDialog/hooks';
import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';
import { Button } from '@mui/material';

function DirectorySelectButton() {
  const path = useFileManagerDialogStore(({ path }) => path);
  const onConfirm = useFileManagerDialogStore(({ onConfirm }) => onConfirm);

  const close = useFileManagerDialogCloseHandler();

  const handleClick = async () => {
    if (!path) return;

    await onConfirm(path);
    close();

    // TODO 예외 처리 로직 이동 필요
    try {
    } catch (e) {
      // TODO locale 디렉토리 아닌 경우 에러 처리
    }
  };

  return (
    <Button disabled={!path} variant={'contained'} onClick={handleClick}>
      현재 디렉토리 선택
    </Button>
  );
}

export default DirectorySelectButton;
