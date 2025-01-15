import DirectoryChangeButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceMenu/components/DirectoryChangeButton';
import NativeFileManagerOpenButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceMenu/components/NativeFileManagerOpenButton';
import { Box } from '@mui/material';

function WorkspaceMenu() {
  return (
    <Box sx={{ display: 'inline-flex', gap: '8px', flexShrink: 0 }}>
      <DirectoryChangeButton />
      <NativeFileManagerOpenButton />
    </Box>
  );
}

export default WorkspaceMenu;
