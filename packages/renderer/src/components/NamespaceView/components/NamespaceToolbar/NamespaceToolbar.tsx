import TranslationSearchBar from '@/components/NamespaceView/components/NamespaceToolbar/components/TranslationSearchBar';
import { useWorkspaceNamespaceToolbarButtonProps } from '@/components/NamespaceView/components/NamespaceToolbar/hooks/useWorkspaceNamespaceToolbarButtonProps';
import { NAMESPACE_TOOLBAR_HEIGHT } from '@/components/NamespaceView/constants/namespaceView.size.constants';
import { Toolbar } from '@/components/Toolbar';
import { Box, useTheme } from '@mui/material';

function NamespaceToolbar() {
  const {
    palette: { primary },
  } = useTheme();

  const toolbarButtons = [useWorkspaceNamespaceToolbarButtonProps()];

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
