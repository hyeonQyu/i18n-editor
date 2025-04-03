import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, TextField } from '@mui/material';
import { useRef, useState } from 'react';

function TranslationSearchBar() {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<HTMLInputElement>();

  const handleClear = () => {
    setSearchText('');
    inputRef.current?.focus();
  };

  return (
    <TextField
      inputRef={inputRef}
      size={'small'}
      variant={'filled'}
      placeholder={'검색'}
      value={searchText}
      fullWidth
      onChange={(e) => setSearchText(e.target.value)}
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
        endAdornment: searchText && (
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
        ),
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
