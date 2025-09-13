import ClearSearchKeywordIconButton from '@/components/NamespaceView/components/NamespaceToolbar/components/TranslationSearchBar/components/ClearSearchKeywordIconButton';
import { NAMESPACE_SEARCH_FOCUS_EVENT } from '@/components/NamespaceView/constants';
import { useTranslationSearchKeyword } from '@/components/NamespaceView/hooks';
import { useNamespaceViewSearchStore } from '@/components/NamespaceView/stores';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { ChangeEventHandler, useEffect, useRef } from 'react';

function TranslationSearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  const keyword = useTranslationSearchKeyword();
  const setKeyword = useNamespaceViewSearchStore((store) => store.setKeyword);

  useEffect(() => {
    const handleSearchFocus = () => inputRef.current?.focus();

    window.addEventListener(NAMESPACE_SEARCH_FOCUS_EVENT, handleSearchFocus);
    return () => window.removeEventListener(NAMESPACE_SEARCH_FOCUS_EVENT, handleSearchFocus);
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <TextField
      inputRef={inputRef}
      size={'small'}
      variant={'filled'}
      placeholder={'검색'}
      value={keyword}
      fullWidth
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <SearchIcon
            sx={{
              color: 'white',
              mr: 1.5,
              mt: '2px',
            }}
          />
        ),
        endAdornment: keyword && <ClearSearchKeywordIconButton />,
        sx: {
          color: 'white',

          '& .MuiFilledInput-input': {
            pt: 1.5,
            pb: 1,
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '&::before': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          },
          '&:hover::before': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.5) !important',
          },
          '&::after': {
            borderBottom: '2px solid white',
          },
        },
      }}
    />
  );
}

export default TranslationSearchBar;
