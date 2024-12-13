import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '@components/Layout/defines/size';
import { SIDEBAR_TRANSITION_DURATION } from '@components/Layout/defines/transitions';
import { useLayoutStore } from '@components/Layout/stores';
import { Box, Drawer } from '@mui/material';

function Sidebar() {
  const opened = useLayoutStore(({ sidebarOpened }) => sidebarOpened);

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
        },
      }}
    >
      <Box></Box>
    </Drawer>
  );
}

export default Sidebar;
