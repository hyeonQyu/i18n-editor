import { FileManagerBody, FileManagerFooter, FileManagerHeader } from '@/components/FileManagerDialog/components';
import { useEntries, useFileManagerDialogCloseHandler } from '@/components/FileManagerDialog/hooks';
import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';
import { Box, Dialog } from '@mui/material';

const width = 800;

function FileManagerDialog() {
  const opened = useFileManagerDialogStore((state) => state.opened);
  const searchMode = useFileManagerDialogStore((state) => state.searchMode);

  const handleClose = useFileManagerDialogCloseHandler();

  const entries = useEntries();

  return (
    <Dialog open={opened} onClose={handleClose} disableEscapeKeyDown={searchMode} PaperProps={{ sx: { maxWidth: width, width } }}>
      <Box sx={{ padding: '20px' }}>
        <FileManagerHeader />
        <FileManagerBody entries={entries} />
        <FileManagerFooter />
      </Box>
    </Dialog>
  );
}

export default FileManagerDialog;
