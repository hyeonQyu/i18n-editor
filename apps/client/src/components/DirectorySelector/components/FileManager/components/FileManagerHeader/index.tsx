import FileManagerBreadcrumbs from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerBreadcrumbs';
import SearchBar from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/FileManagerSearch';
import {
  FILE_MANAGER_HEADER_GAP,
  FILE_MANAGER_SEARCH_ICON_WIDTH,
  HISTORY_BUTTON_WIDTH,
} from '@components/DirectorySelector/components/FileManager/defines/sizes';
import { Box } from '@mui/material';
import HistoryButtonGroup from 'components/DirectorySelector/components/FileManager/components/FileManagerHeader/components/HistoryButtonGroup';

function FileManagerHeader() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `${HISTORY_BUTTON_WIDTH}px calc(100% - ${
          HISTORY_BUTTON_WIDTH + FILE_MANAGER_SEARCH_ICON_WIDTH + 2 * FILE_MANAGER_HEADER_GAP
        }px) ${FILE_MANAGER_SEARCH_ICON_WIDTH}px`,
        gap: '8px',
        height: '42px',
        position: 'relative',
      }}
    >
      <HistoryButtonGroup />
      <FileManagerBreadcrumbs />
      <SearchBar />
    </Box>
  );
}

export default FileManagerHeader;
