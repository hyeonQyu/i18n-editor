import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';

function FileManagerExitSearchIconButton() {
  const handleClick = useFileManagerDialogStore((state) => state.finishSearch);

  return (
    <Tooltip title={'검색창 닫기 (esc)'}>
      <IconButton
        aria-label={'exit search'}
        size={'small'}
        onClick={handleClick}
        sx={{
          position: 'absolute',
          right: 0,
        }}
      >
        <CloseIcon fontSize={'medium'} />
      </IconButton>
    </Tooltip>
  );
}

export default FileManagerExitSearchIconButton;
