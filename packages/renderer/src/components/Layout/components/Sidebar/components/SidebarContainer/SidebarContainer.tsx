import { HEADER_HEIGHT, SIDEBAR_TRANSITION_DURATION, SIDEBAR_WIDTH } from '@/components/Layout/constants/layout.style.constants';
import { useUIConfig } from '@/hooks/domains/ui';
import { TIME_UNIT } from '@i18n-editor/shared';
import { Box, Drawer } from '@mui/material';
import { ReactNode } from 'react';

interface SidebarContainerProps {
  displayIndex: number;
  children: ReactNode;
}

function SidebarContainer(props: SidebarContainerProps) {
  const { children, displayIndex } = props;

  const { sidebarOpened } = useUIConfig();

  const marginLeft = `-${displayIndex * SIDEBAR_WIDTH}px`;

  return (
    <Drawer
      open={sidebarOpened}
      variant={'persistent'}
      anchor={'left'}
      transitionDuration={{
        exit: SIDEBAR_TRANSITION_DURATION * TIME_UNIT.unitOfMs.asSecond,
        enter: SIDEBAR_TRANSITION_DURATION * TIME_UNIT.unitOfMs.asSecond,
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
