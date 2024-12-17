import DirectoryChangeButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceMenu/components/DirectoryChangeButton';
import NativeFileManagerOpenButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceMenu/components/NativeFileManagerOpenButton';
import { Box } from '@mui/material';
import DirectoryPathCopyButton from 'components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceMenu/components/DirectoryPathCopyButton';

function WorkspaceMenu() {
  return (
    <Box sx={{ display: 'flex', gap: '8px' }}>
      <DirectoryChangeButton />
      <DirectoryPathCopyButton />
      <NativeFileManagerOpenButton />
    </Box>
  );
}

export default WorkspaceMenu;
