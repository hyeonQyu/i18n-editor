import TranslationSearchBar from '@components/NamespaceView/components/NamespaceToolbar/components/TranslationSearchBar';
import { NAMESPACE_TOOLBAR_HEIGHT } from '@components/NamespaceView/components/NamespaceToolbar/defines/size';
import useToWorkspaceNamespaceToolbarButtonProps from '@components/NamespaceView/components/NamespaceToolbar/hooks/useToWorkspaceNamespaceToolbarButtonProps';
import Toolbar from '@components/Toolbar';
import { Box, useTheme } from '@mui/material';

function NamespaceToolbar() {
  const {
    palette: { primary },
  } = useTheme();

  const toolbarButtons = [useToWorkspaceNamespaceToolbarButtonProps()];

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        background: primary.main,
        display: 'flex',
        alignItems: 'center',
        paddingRight: 2,
      }}
    >
      <Toolbar
        sx={{
          height: `${NAMESPACE_TOOLBAR_HEIGHT}px`,
          width: 'fit-content',
        }}
        buttons={toolbarButtons}
      />
      <TranslationSearchBar />
    </Box>
  );
}

export default NamespaceToolbar;
