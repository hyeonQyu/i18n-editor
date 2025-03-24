import { NAMESPACE_TOOLBAR_HEIGHT } from '@components/NamespaceView/components/NamespaceToolbar/defines/size';
import useToWorkspaceNamespaceToolbarButtonProps from '@components/NamespaceView/components/NamespaceToolbar/hooks/useToWorkspaceNamespaceToolbarButtonProps';
import Toolbar from '@components/Toolbar';
import { useTheme } from '@mui/material';

function NamespaceToolbar() {
  const {
    palette: { primary },
  } = useTheme();

  const toolbarButtons = [useToWorkspaceNamespaceToolbarButtonProps()];

  return (
    <Toolbar
      sx={{
        background: primary.main,
        height: `${NAMESPACE_TOOLBAR_HEIGHT}px`,
        padding: 2,
        position: 'sticky',
        top: 0,
      }}
      buttons={toolbarButtons}
    />
  );
}

export default NamespaceToolbar;
