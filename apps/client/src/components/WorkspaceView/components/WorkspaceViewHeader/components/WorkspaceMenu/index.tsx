import DirectoryChangeButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceMenu/components/DirectoryChangeButton';
import NativeFileManagerOpenButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceMenu/components/NativeFileManagerOpenButton';
import { Box } from '@mui/material';

function WorkspaceMenu() {
  return (
    <Box sx={{ display: 'flex', gap: '8px', minWidth: 'fit-content' }}>
      <DirectoryChangeButton />
      <NativeFileManagerOpenButton />
    </Box>
  );
}

export default WorkspaceMenu;
