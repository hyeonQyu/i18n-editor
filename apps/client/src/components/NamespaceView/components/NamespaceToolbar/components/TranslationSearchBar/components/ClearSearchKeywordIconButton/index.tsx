import { useNamespaceViewSearchStore } from '@components/NamespaceView/stores/search';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

function ClearSearchKeywordIconButton() {
  const setKeyword = useNamespaceViewSearchStore((state) => state.setKeyword);
  const focusSearchInput = useNamespaceViewSearchStore((state) => state.focusSearchInput);

  const handleClear = () => {
    setKeyword('');
    focusSearchInput();
  };

  return (
    <IconButton
      onClick={handleClear}
      size="small"
      sx={{
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover': {
          color: 'white',
        },
      }}
    >
      <ClearIcon fontSize="small" />
    </IconButton>
  );
}

export default ClearSearchKeywordIconButton;
