import { FILE_MANAGER_SEARCH_TRANSITION_SECONDS } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/defines/animation';
import useFileManagerSearchInputWidth from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/hooks/useFileManagerSearchInputWidth';
import {
  FILE_MANAGER_HEADER_GAP,
  FILE_MANAGER_SEARCH_ICON_WIDTH,
} from '@components/DirectorySelector/components/FileManager/defines/sizes';
import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import { TextField } from '@mui/material';
import { ChangeEventHandler, useEffect, useRef } from 'react';

function FileManagerSearchInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchMode = useFileManagerStore(({ searchMode }) => searchMode);
  const keyword = useFileManagerStore(({ searchKeyword }) => searchKeyword);
  const setKeyword = useFileManagerStore(({ setSearchKeyword }) => setSearchKeyword);

  const width = useFileManagerSearchInputWidth();

  useEffect(() => {
    if (!searchMode) return;
    inputRef.current?.focus();
  }, [searchMode]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => setKeyword(e.target.value);

  return (
    <TextField
      inputRef={inputRef}
      value={keyword}
      onChange={handleChange}
      size={'small'}
      variant={'outlined'}
      placeholder={'검색'}
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
