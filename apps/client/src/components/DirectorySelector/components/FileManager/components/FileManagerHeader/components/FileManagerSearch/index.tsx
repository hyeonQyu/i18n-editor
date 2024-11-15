import FileManagerExitSearchIconButton from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerExitSearchIconButton';
import FileManagerSearchInput from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerSearchInput';
import { useFileManagerSearchStore } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/stores/fileManagerSearch';
import useClickOutside from '@hooks/useClickOutside';
import { Box } from '@mui/material';
import FileManagerSearchIconButton from 'components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerSearchIconButton';
import { useEffect, useRef } from 'react';

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

export default FileManagerSearch;
