import TranslationSearchBar from '@/components/NamespaceView/components/NamespaceToolbar/components/TranslationSearchBar';
import { useAddTranslationToolbarButtonProps } from '@/components/NamespaceView/components/NamespaceToolbar/hooks/useAddTranslationToolbarButtonProps';
import { useToWorkspaceToolbarButtonProps } from '@/components/NamespaceView/components/NamespaceToolbar/hooks/useToWorkspaceToolbarButtonProps';
import { NAMESPACE_TOOLBAR_HEIGHT } from '@/components/NamespaceView/constants';
import { Toolbar } from '@/components/Toolbar';
import { Box, useTheme } from '@mui/material';

function NamespaceToolbar() {
  const {
    palette: { primary },
  } = useTheme();

  const prefixButtons = [useToWorkspaceToolbarButtonProps()];
  const suffixButtons = [useAddTranslationToolbarButtonProps()];

  const toolbarSx = {
    height: `${NAMESPACE_TOOLBAR_HEIGHT}px`,
    width: 'fit-content',
  };

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
      <Toolbar sx={toolbarSx} buttons={prefixButtons} />
      <TranslationSearchBar />
      <Toolbar sx={toolbarSx} buttons={suffixButtons} />
    </Box>
  );
}

export default NamespaceToolbar;
