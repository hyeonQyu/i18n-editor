import { useFileManagerSearchStore } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/stores/fileManagerSearch';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function FileManagerExitSearchIconButton() {
  const handleClick = useFileManagerSearchStore(({ exitSearchMode }) => exitSearchMode);

  return (
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
  );
}

export default FileManagerExitSearchIconButton;
