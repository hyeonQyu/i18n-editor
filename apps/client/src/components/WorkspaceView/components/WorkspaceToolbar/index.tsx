import Toolbar from '@components/Toolbar';
import { ToolbarButtonProps } from '@components/Toolbar/components/ToolbarButton';
import useAddNamespaceToolbarButtonProps from '@components/WorkspaceView/components/WorkspaceToolbar/hooks/useAddNamespaceToolbarButtonProps';
import useChangeDirectoryToolbarButtonProps from '@components/WorkspaceView/components/WorkspaceToolbar/hooks/useChangeDirectoryToolbarButtonProps';
import useOpenNativeFileManagerToolbarButtonProps from '@components/WorkspaceView/components/WorkspaceToolbar/hooks/useOpenNativeFileManagerToolbarButtonProps';
import { useTheme } from '@mui/material';

function WorkspaceToolbar() {
  const {
    palette: { divider },
  } = useTheme();

  const toolbars: ToolbarButtonProps[] = [
    useChangeDirectoryToolbarButtonProps(),
    useOpenNativeFileManagerToolbarButtonProps(),
    useAddNamespaceToolbarButtonProps(),
  ];

  return (
    <Toolbar
      sx={{
        borderBottom: `1px solid ${divider}`,
        padding: '4px 32px',
      }}
      buttons={toolbars}
    />
  );
}

export default WorkspaceToolbar;
