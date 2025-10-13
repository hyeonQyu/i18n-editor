import { SIDEBAR_TRANSITION_DURATION } from '@/components/Layout/constants/layout.style.constants';
import { useCurrentSidebarWidth } from '@/components/Layout/hooks/useCurrentSidebarWidth';
import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

function Main(props: MainProps) {
  const { children } = props;
  const theme = useTheme();

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
        height: '100%',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {children}
    </Box>
  );
}

export default Main;
