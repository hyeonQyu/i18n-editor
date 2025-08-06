import { SIDEBAR_WIDTH } from '@/components/Layout/constants/layout.style.constants';
import { Stack } from '@mui/material';
import { ReactNode } from 'react';

interface SidebarMenuProps {
  children: ReactNode[];
}

function SidebarMenu(props: SidebarMenuProps) {
  const { children } = props;

  return <Stack sx={{ minWidth: `${SIDEBAR_WIDTH}px` }}>{children}</Stack>;
}

export default SidebarMenu;
