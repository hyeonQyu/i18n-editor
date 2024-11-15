import { FILE_MANAGER_SEARCH_TRANSITION_SECONDS } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/defines/animation';
import useFileManagerSearchInputWidth from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/hooks/useFileManagerSearchInputWidth';
import { useFileManagerSearchStore } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/stores/fileManagerSearch';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

function FileManagerSearchIconButton() {
  const { searchMode, setSearchMode: handleClick } = useFileManagerSearchStore();
  const right = useFileManagerSearchInputWidth();

  return (
    <IconButton
      aria-label={'search file manager'}
      onClick={handleClick}
      size={'small'}
      sx={{
        position: 'absolute',
        right,
        pointerEvents: searchMode ? 'none' : 'auto',
        zIndex: 1,
        transition: `${FILE_MANAGER_SEARCH_TRANSITION_SECONDS}s`,
      }}
    >
      <SearchIcon fontSize={'medium'} />
    </IconButton>
  );
}

export default FileManagerSearchIconButton;
