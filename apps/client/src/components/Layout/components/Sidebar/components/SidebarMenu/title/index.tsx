import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface SidebarMenuTitleProps {
  label: ReactNode;
  action?: ReactNode;
}

function SidebarMenuTitle(props: SidebarMenuTitleProps) {
  const { label, action } = props;

  return (
    <Box sx={{ padding: '8px 16px 0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant={'h6'}>{label}</Typography>
      {action}
    </Box>
  );
}

export default SidebarMenuTitle;
