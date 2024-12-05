import { FILE_MANAGER_SEARCH_TRANSITION_SECONDS } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/defines/animation';
import useFileManagerSearchInputWidth from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/hooks/useFileManagerSearchInputWidth';
import { useFileManagerSearchStore } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/stores/fileManagerSearch';
import useOS from '@hooks/useOS';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Tooltip } from '@mui/material';

const getShortcutByOS = (os: string | undefined) => {
  switch (os) {
    case 'macos':
      return '⌘ + F';
    case 'win':
    case 'linux':
    default:
      return 'Ctrl + F';
  }
};

function FileManagerSearchIconButton() {
  const os = useOS();
  const { searchMode, startSearch: handleClick } = useFileManagerSearchStore();
  const right = useFileManagerSearchInputWidth();

  return (
    <Tooltip title={searchMode ? undefined : `검색창 열기 (${getShortcutByOS(os)})`}>
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
    </Tooltip>
  );
}

export default FileManagerSearchIconButton;
