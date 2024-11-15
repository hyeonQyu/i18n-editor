import FileManagerBreadcrumbs from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerBreadcrumbs';
import { Box } from '@mui/material';
import HistoryButtonGroup from 'components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/HistoryButtonGroup';

function FileManagerHeader() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '80px calc(100% - 80px)',
        gap: '8px',
        height: '42px',
      }}
    >
      <HistoryButtonGroup />
      <FileManagerBreadcrumbs />
    </Box>
  );
}

export default FileManagerHeader;
