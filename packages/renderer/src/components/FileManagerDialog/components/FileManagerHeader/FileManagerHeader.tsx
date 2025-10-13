import {
  FileManagerBreadcrumbs,
  FileManagerSearch,
  HistoryButtonGroup,
} from '@/components/FileManagerDialog/components/FileManagerHeader/components';
import {
  FILE_MANAGER_HEADER_GAP,
  FILE_MANAGER_SEARCH_ICON_WIDTH,
  HISTORY_BUTTON_WIDTH,
} from '@/components/FileManagerDialog/constants/fileManagerDialog.style.constants';
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
