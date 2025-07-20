import {
  FileManagerExitSearchIconButton,
  FileManagerSearchIconButton,
  FileManagerSearchInput,
} from '@/components/FileManagerDialog/components/FileManagerHeader/components/FileManagerSearch/components';
import { useFileManagerSearchShortcuts } from '@/components/FileManagerDialog/components/FileManagerHeader/components/FileManagerSearch/hooks';
import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';
import { useClickOutside } from '@/hooks/common';
import { Box } from '@mui/material';
import { memo, useEffect, useRef } from 'react';

function FileManagerSearch() {
  const searchMode = useFileManagerDialogStore(({ searchMode }) => searchMode);
  const finishSearch = useFileManagerDialogStore(({ finishSearch }) => finishSearch);

  const ref = useRef<HTMLElement>(undefined);

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
