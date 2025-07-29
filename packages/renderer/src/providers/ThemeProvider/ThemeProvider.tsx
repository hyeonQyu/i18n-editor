import { createTheme, ThemeProvider as MUIThemeProvider, useMediaQuery } from '@mui/material';
import { blue, green, indigo, orange, purple, red } from '@mui/material/colors';
import { ReactNode, useMemo } from 'react';

function ThemeProvider({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: indigo,
          secondary: purple,
          success: green,
          warning: orange,
          error: red,
          info: blue,
          background: {
            default: prefersDarkMode ? '#121212' : '#f5f5f5',
            paper: prefersDarkMode ? '#1e1e1e' : '#ffffff',
          },
          text: {
            primary: prefersDarkMode ? '#ffffff' : '#000000',
            secondary: prefersDarkMode ? '#bbbbbb' : '#666666',
            disabled: prefersDarkMode ? '#888888' : '#999999',
          },
        },
        typography: {
          fontFamily: [
            'Pretendard',
            '-apple-system',
            'BlinkMacSystemFont',
            'system-ui',
            'Roboto',
            '"Helvetica Neue"',
            '"Segoe UI"',
            '"Apple SD Gothic Neo"',
            '"Noto Sans KR"',
            '"Malgun Gothic"',
            'sans-serif',
          ].join(','),
          h1: {
            fontSize: '2rem',
            fontWeight: 500,
          },
          h2: {
            fontSize: '1.75rem',
            fontWeight: 500,
          },
          h3: {
            fontSize: '1.5rem',
            fontWeight: 500,
          },
          body1: {
            fontSize: '1rem',
          },
          body2: {
            fontSize: '0.875rem',
          },
        },
        spacing: 8,
        shape: {
          borderRadius: 4,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: prefersDarkMode ? indigo[800] : indigo[700],
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [prefersDarkMode],
  );

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}

export default ThemeProvider;
