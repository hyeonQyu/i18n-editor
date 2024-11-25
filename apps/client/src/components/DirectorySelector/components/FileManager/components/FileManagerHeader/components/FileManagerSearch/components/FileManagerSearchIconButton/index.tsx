import { FILE_MANAGER_SEARCH_TRANSITION_SECONDS } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/defines/animation';
import useFileManagerSearchInputWidth from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/hooks/useFileManagerSearchInputWidth';
import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import useMetaKeyLabel from '@hooks/useMetaKeyLabel';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Tooltip } from '@mui/material';

function FileManagerSearchIconButton() {
  const { searchMode, startSearch: handleClick } = useFileManagerStore();
  const right = useFileManagerSearchInputWidth();
  const metaKey = useMetaKeyLabel();

  return (
    <Tooltip title={searchMode ? undefined : `검색창 열기 (${metaKey} + F)`}>
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
