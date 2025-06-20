import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '@components/Layout/defines/size';
import { SIDEBAR_TRANSITION_DURATION } from '@components/Layout/defines/transitions';
import useSidebarOpened from '@hooks/ui/useSidebarOpened';
import { Box, Drawer } from '@mui/material';
import { ReactNode } from 'react';

interface SidebarContainerProps {
  displayIndex: number;
  children: ReactNode;
}

function SidebarContainer(props: SidebarContainerProps) {
  const { children, displayIndex } = props;

  const opened = useSidebarOpened();

  const marginLeft = `-${displayIndex * SIDEBAR_WIDTH}px`;

  return (
    <Drawer
      open={opened}
      variant={'persistent'}
      anchor={'left'}
      transitionDuration={{
        exit: SIDEBAR_TRANSITION_DURATION * 1000,
        enter: SIDEBAR_TRANSITION_DURATION * 1000,
      }}
      sx={{
        flexShrink: 0,
      }}
      PaperProps={{
        sx: {
          width: SIDEBAR_WIDTH,
          top: `${HEADER_HEIGHT}px`,
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          boxSizing: 'borderBox',
          gap: '24px',
          padding: '16px 0',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          marginLeft,
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        {children}
      </Box>
    </Drawer>
  );
}

export default SidebarContainer;
