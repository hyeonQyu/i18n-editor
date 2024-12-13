import Header from '@components/Layout/components/Header';
import Main from '@components/Layout/components/Main';
import Sidebar from '@components/Layout/components/Sidebar';
import { HEADER_HEIGHT } from '@components/Layout/defines/size';
import { SIDEBAR_TRANSITION_DURATION } from '@components/Layout/defines/transitions';
import useCurrentSidebarWidth from '@components/Layout/hooks/useCurrentSidebarWidth';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  const { children } = props;

  const sidebarWidth = useCurrentSidebarWidth();

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
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          marginTop: `${HEADER_HEIGHT}px`,
          display: 'flex',
          transition: `margin-left ${SIDEBAR_TRANSITION_DURATION}s ease`,
          marginLeft: `${sidebarWidth}px`,
        }}
      >
        <Sidebar />
        <Main>{children}</Main>
      </Box>
    </Box>
  );
}

export default Layout;
