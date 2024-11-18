import { useFileManagerSearchStore } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/stores/fileManagerSearch';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';

function FileManagerExitSearchIconButton() {
  const handleClick = useFileManagerSearchStore(({ finishSearch }) => finishSearch);

  return (
    <Tooltip title={'검색창 닫기'}>
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
