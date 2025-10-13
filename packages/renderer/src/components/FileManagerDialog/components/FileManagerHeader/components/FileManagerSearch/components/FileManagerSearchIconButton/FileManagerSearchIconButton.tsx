import { useFileManagerSearchInputWidth } from '@/components/FileManagerDialog/components/FileManagerHeader/components/FileManagerSearch/hooks';
import { FILE_MANAGER_SEARCH_TRANSITION_SECONDS } from '@/components/FileManagerDialog/constants/fileManagerDialog.style.constants';
import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';
import { useMetaKeyLabel } from '@/hooks/common';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Tooltip } from '@mui/material';

function FileManagerSearchIconButton() {
  const { searchMode, startSearch } = useFileManagerDialogStore();
  const right = useFileManagerSearchInputWidth();
  const metaKey = useMetaKeyLabel();

  const handleClick = () => startSearch('');

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
