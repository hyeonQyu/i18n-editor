import { SIDEBAR_TRANSITION_DURATION } from '@components/Layout/defines/transitions';
import useCurrentSidebarWidth from '@components/Layout/hooks/useCurrentSidebarWidth';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

function Main(props: MainProps) {
  const { children } = props;

  const sidebarWidth = useCurrentSidebarWidth();

  return (
    <Box
      component={'main'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        transition: `width ${SIDEBAR_TRANSITION_DURATION}s ease`,
        width: `calc(100% - ${sidebarWidth}px)`,
      }}
    >
      {children}
    </Box>
  );
}

export default Main;
