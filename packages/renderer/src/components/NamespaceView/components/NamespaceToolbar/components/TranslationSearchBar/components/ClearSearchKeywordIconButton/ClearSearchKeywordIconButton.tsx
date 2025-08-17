import { useNamespaceViewSearchStore } from '@/components/NamespaceView/stores/namespaceView.search.store';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

function ClearSearchKeywordIconButton() {
  const setKeyword = useNamespaceViewSearchStore((store) => store.setKeyword);
  const focusSearchInput = useNamespaceViewSearchStore((store) => store.focusSearchInput);

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
