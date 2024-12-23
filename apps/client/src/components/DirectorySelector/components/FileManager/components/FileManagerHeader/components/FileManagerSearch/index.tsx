import FileManagerExitSearchIconButton from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerExitSearchIconButton';
import FileManagerSearchInput from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerSearchInput';
import useFileManagerSearchShortcuts from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/hooks/useFileManagerSearchShortcuts';
import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import useClickOutside from '@hooks/useClickOutside';
import { Box } from '@mui/material';
import FileManagerSearchIconButton from 'components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerSearchIconButton';
import { memo, useEffect, useRef } from 'react';

function FileManagerSearch() {
  const searchMode = useFileManagerStore(({ searchMode }) => searchMode);
  const finishSearch = useFileManagerStore(({ finishSearch }) => finishSearch);

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
