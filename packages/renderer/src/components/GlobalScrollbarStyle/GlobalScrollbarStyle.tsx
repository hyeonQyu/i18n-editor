import { GlobalStyles, useTheme } from '@mui/material';

function GlobalScrollbarStyle() {
  const {
    palette: { grey },
  } = useTheme();

  return (
    <GlobalStyles
      styles={{
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
          background: 'transparent',
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          background: grey[300],
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: grey[400],
        },
      }}
    />
  );
}
export default GlobalScrollbarStyle;
