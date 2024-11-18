import FileManagerExitSearchIconButton from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerExitSearchIconButton';
import FileManagerSearchInput from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerSearchInput';
import { useFileManagerSearchStore } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/stores/fileManagerSearch';
import useClickOutside from '@hooks/useClickOutside';
import { Box } from '@mui/material';
import FileManagerSearchIconButton from 'components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerSearchIconButton';
import { KeyboardEventHandler, useEffect, useRef } from 'react';

function FileManagerSearch() {
  const { searchMode, reset } = useFileManagerSearchStore();

  const ref = useRef<HTMLElement>();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useClickOutside(ref, () => {
    reset();
  });

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape' && searchMode) {
      reset();
      e.stopPropagation();
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
      }}
      onKeyDown={handleKeyDown}
    >
      <FileManagerSearchIconButton />
      <FileManagerSearchInput />
      {searchMode && <FileManagerExitSearchIconButton />}
    </Box>
  );
}

export default FileManagerSearch;
