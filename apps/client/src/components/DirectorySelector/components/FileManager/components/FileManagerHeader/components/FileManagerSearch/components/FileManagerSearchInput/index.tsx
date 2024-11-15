import { FILE_MANAGER_SEARCH_TRANSITION_SECONDS } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/defines/animation';
import useFileManagerSearchInputWidth from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/hooks/useFileManagerSearchInputWidth';
import { useFileManagerSearchStore } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/stores/fileManagerSearch';
import {
  FILE_MANAGER_HEADER_GAP,
  FILE_MANAGER_SEARCH_ICON_WIDTH,
} from '@components/DirectorySelector/components/FileManager/defines/sizes';
import { TextField } from '@mui/material';
import { useEffect, useRef } from 'react';

function FileManagerSearchInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchMode = useFileManagerSearchStore(({ searchMode }) => searchMode);
  const width = useFileManagerSearchInputWidth();

  useEffect(() => {
    if (!searchMode) return;
    inputRef.current?.focus();
  }, [searchMode]);

  return (
    <TextField
      inputRef={inputRef}
      size={'small'}
      variant={'outlined'}
      inputProps={{
        style: {
          paddingLeft: `${FILE_MANAGER_SEARCH_ICON_WIDTH + FILE_MANAGER_HEADER_GAP}px`,
          width: `calc(100% - ${FILE_MANAGER_SEARCH_ICON_WIDTH + FILE_MANAGER_HEADER_GAP * 3}px)`,
        },
      }}
      sx={{
        position: 'absolute',
        background: '#fff',
        overflow: 'hidden',
        width,
        height: searchMode ? '42px' : 0,
        right: `${FILE_MANAGER_SEARCH_ICON_WIDTH + FILE_MANAGER_HEADER_GAP}px`,
        transition: `width ${FILE_MANAGER_SEARCH_TRANSITION_SECONDS}s`,

        '& > div': {
          display: 'block',
        },
      }}
    />
  );
}

export default FileManagerSearchInput;
