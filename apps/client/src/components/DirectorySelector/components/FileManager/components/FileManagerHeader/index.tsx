import FileManagerBreadcrumbs from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerBreadcrumbs';
import SearchBar from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch';
import { Box } from '@mui/material';
import HistoryButtonGroup from 'components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/HistoryButtonGroup';

function FileManagerHeader() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '80px calc(100% - 130px) 34px',
        gap: '8px',
        height: '42px',
      }}
    >
      <HistoryButtonGroup />
      <FileManagerBreadcrumbs />
      <SearchBar />
    </Box>
  );
}

export default FileManagerHeader;
