import { List } from '@mui/material';
import { ReactNode } from 'react';

interface SidebarMenuListProps {
  children: ReactNode | ReactNode[];
}

function SidebarMenuList(props: SidebarMenuListProps) {
  const { children } = props;

  return (
    <List dense sx={{ overflowY: 'auto' }}>
      {children}
    </List>
  );
}

export default SidebarMenuList;
