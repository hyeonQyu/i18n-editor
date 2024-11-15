import FileManagerExitSearchIconButton from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerExitSearchIconButton';
import FileManagerSearchInput from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerSearchInput';
import { useFileManagerSearchStore } from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/stores/fileManagerSearch';
import { Box } from '@mui/material';
import FileManagerSearchIconButton from 'components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch/components/FileManagerSearchIconButton';
import { useEffect } from 'react';

function FileManagerSearch() {
  const { searchMode, reset } = useFileManagerSearchStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <Box
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
