import { HEADER_HEIGHT } from '@components/Layout/components/defines/size';
import Header from '@components/Layout/components/Header';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Header />

      <Box
        component={'main'}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          marginTop: `${HEADER_HEIGHT}px`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
