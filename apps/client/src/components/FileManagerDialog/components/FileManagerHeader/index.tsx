import FileManagerBreadcrumbs from '@components/FileManagerDialog/components/FileManagerHeader/components/FileManagerBreadcrumbs';
import FileManagerSearch from '@components/FileManagerDialog/components/FileManagerHeader/components/FileManagerSearch';
import HistoryButtonGroup from '@components/FileManagerDialog/components/FileManagerHeader/components/HistoryButtonGroup';
import { FILE_MANAGER_HEADER_GAP, FILE_MANAGER_SEARCH_ICON_WIDTH, HISTORY_BUTTON_WIDTH } from '@components/FileManagerDialog/defines/sizes';
import { Box } from '@mui/material';

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
      <FileManagerSearch />
    </Box>
  );
}

export default FileManagerHeader;
