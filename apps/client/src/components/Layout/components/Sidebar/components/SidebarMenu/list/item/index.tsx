import { MenuItemProps } from '@defines/menu';
import usePopover from '@hooks/usePopover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { MouseEventHandler, ReactNode } from 'react';

interface SidebarMenuListItemProps {
  children: ReactNode;
  onClick: MouseEventHandler;
  selected: boolean;
  menuItems?: MenuItemProps[];
}

function SidebarMenuListItem(props: SidebarMenuListItemProps) {
  const { children, menuItems, onClick, selected } = props;

  const {
    palette: { text },
  } = useTheme();

  const hasMenu = Boolean(menuItems?.length);

  const { anchorElement, handleOpen, handleClose } = usePopover();

  const handleClickOpenMenu: MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleOpen(e);
  };

  return (
    <ListItem onClick={onClick}>
      <ListItemButton sx={{ gap: '6px' }} selected={selected}>
        <ListItemText primary={children} sx={{ color: text.secondary }} />

        {hasMenu && (
          <IconButton
            sx={{
              padding: '4px',
            }}
            onClick={handleClickOpenMenu}
          >
            <MoreVertIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        )}
      </ListItemButton>

      {hasMenu && (
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={handleClose}
          MenuListProps={{
            sx: { width: '200px' },
          }}
        >
          {menuItems?.map(({ label, IconComponent, onClick, color = text.secondary }, i) => (
            <MenuItem
              key={i}
              sx={{
                display: 'flex',
                gap: '12px',
              }}
              onClick={(e) => {
                onClick(e);
                handleClose();
              }}
            >
              {IconComponent && <IconComponent sx={{ color }} fontSize={'small'} />}
              <Typography variant={'body2'} sx={{ color }}>
                {label}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      )}
    </ListItem>
  );
}

export default SidebarMenuListItem;
