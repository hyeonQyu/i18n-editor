import { Stack } from '@mui/material';
import { ReactNode } from 'react';

interface SidebarMenuProps {
  children: ReactNode[];
}

function SidebarMenu(props: SidebarMenuProps) {
  const { children } = props;

  return <Stack>{children}</Stack>;
}

export default SidebarMenu;
