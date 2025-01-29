import WorkspaceToolbarButton, {
  WorkspaceToolbarButtonProps,
} from '@components/WorkspaceView/components/WorkspaceToolbar/components/WorkspaceToolbarButton';
import useAddNamespaceToolbarButtonProps from '@components/WorkspaceView/components/WorkspaceToolbar/hooks/useAddNamespaceToolbarButtonProps';
import useChangeDirectoryToolbarButtonProps from '@components/WorkspaceView/components/WorkspaceToolbar/hooks/useChangeDirectoryToolbarButtonProps';
import useOpenNativeFileManagerToolbarButtonProps from '@components/WorkspaceView/components/WorkspaceToolbar/hooks/useOpenNativeFileManagerToolbarButtonProps';
import { Box, useTheme } from '@mui/material';

function WorkspaceToolbar() {
  const {
    palette: { divider },
  } = useTheme();

  const toolbars: WorkspaceToolbarButtonProps[] = [
    useChangeDirectoryToolbarButtonProps(),
    useOpenNativeFileManagerToolbarButtonProps(),
    useAddNamespaceToolbarButtonProps(),
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '16px',
        borderBottom: `1px solid ${divider}`,
        padding: '4px 32px',
      }}
    >
      {toolbars.map((toolbar) => (
        <WorkspaceToolbarButton key={toolbar.label} {...toolbar} />
      ))}
    </Box>
  );
}

export default WorkspaceToolbar;
