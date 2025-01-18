import FileManagerExitSearchIconButton from '@components/FileManagerDialog/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerExitSearchIconButton';
import FileManagerSearchIconButton from '@components/FileManagerDialog/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerSearchIconButton';
import FileManagerSearchInput from '@components/FileManagerDialog/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerSearchInput';
import useFileManagerSearchShortcuts from '@components/FileManagerDialog/components/FileManagerHeader/components/FileManagerSearch/hooks/useFileManagerSearchShortcuts';
import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';
import useClickOutside from '@hooks/useClickOutside';
import { Box } from '@mui/material';
import { memo, useEffect, useRef } from 'react';

function FileManagerSearch() {
  const searchMode = useFileManagerDialogStore(({ searchMode }) => searchMode);
  const finishSearch = useFileManagerDialogStore(({ finishSearch }) => finishSearch);

  const ref = useRef<HTMLElement>();

  useEffect(() => {
    return () => {
      finishSearch();
    };
  }, [finishSearch]);

  useClickOutside(ref, () => {
    finishSearch();
  });

  useFileManagerSearchShortcuts();

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
      }}
    >
      <FileManagerSearchIconButton />
      <FileManagerSearchInput />
      {searchMode && <FileManagerExitSearchIconButton />}
    </Box>
  );
}

export default memo(FileManagerSearch);
