import FileManagerBody from '@components/FileManagerDialog/components/FileManagerBody';
import useEntries from '@components/FileManagerDialog/components/FileManagerBody/hooks/useEntries';
import FileManagerFooter from '@components/FileManagerDialog/components/FileManagerFooter';
import FileManagerHeader from '@components/FileManagerDialog/components/FileManagerHeader';
import useFileManagerDialogCloseHandler from '@components/FileManagerDialog/hooks/useFileManagerDialogCloseHandler';
import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';
import { Box, Dialog } from '@mui/material';

const width = 800;

function FileManagerDialog() {
  const opened = useFileManagerDialogStore(({ opened }) => opened);
  const searchMode = useFileManagerDialogStore(({ searchMode }) => searchMode);

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
