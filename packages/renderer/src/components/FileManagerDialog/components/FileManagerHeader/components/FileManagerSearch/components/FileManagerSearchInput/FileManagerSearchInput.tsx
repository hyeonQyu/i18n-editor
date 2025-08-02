import { useFileManagerSearchInputWidth } from '@/components/FileManagerDialog/components/FileManagerHeader/components/FileManagerSearch/hooks';
import {
  FILE_MANAGER_HEADER_GAP,
  FILE_MANAGER_SEARCH_ICON_WIDTH,
  FILE_MANAGER_SEARCH_TRANSITION_SECONDS,
} from '@/components/FileManagerDialog/constants/fileManagerDialog.style.constants';
import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';
import { TextField, useTheme } from '@mui/material';
import { ChangeEventHandler, useEffect, useRef } from 'react';

function FileManagerSearchInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();

  const searchMode = useFileManagerDialogStore(({ searchMode }) => searchMode);
  const keyword = useFileManagerDialogStore(({ searchKeyword }) => searchKeyword);
  const setKeyword = useFileManagerDialogStore(({ setSearchKeyword }) => setSearchKeyword);

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
      slotProps={{
        input: {
          style: {
            paddingLeft: `${FILE_MANAGER_SEARCH_ICON_WIDTH + FILE_MANAGER_HEADER_GAP}px`,
            width: `calc(100% - ${FILE_MANAGER_SEARCH_ICON_WIDTH + FILE_MANAGER_HEADER_GAP * 3}px)`,
          },
        },
      }}
      sx={{
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
        width,
        height: searchMode ? '42px' : 0,
        right: `${FILE_MANAGER_SEARCH_ICON_WIDTH + FILE_MANAGER_HEADER_GAP}px`,
        transition: `width ${FILE_MANAGER_SEARCH_TRANSITION_SECONDS}s`,
        justifyContent: 'center',

        '& > div': {
          display: 'block',
        },

        '& .MuiOutlinedInput-root': {
          backgroundColor: theme.palette.background.paper,
        },
      }}
    />
  );
}

export default FileManagerSearchInput;
