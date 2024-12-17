import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface SidebarMenuTitleProps {
  children: ReactNode;
}

function SidebarMenuTitle(props: SidebarMenuTitleProps) {
  const { children } = props;

  return (
    <Box sx={{ padding: '8px 16px 0 16px' }}>
      <Typography variant={'h6'}>{children}</Typography>
    </Box>
  );
}

export default SidebarMenuTitle;
