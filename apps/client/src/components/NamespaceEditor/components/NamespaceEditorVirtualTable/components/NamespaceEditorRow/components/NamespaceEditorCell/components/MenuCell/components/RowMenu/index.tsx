import useRowMenuItems from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenu/hooks/useRowMenuItems';
import { Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { PopoverProps } from '@mui/material/Popover';

interface RowMenuProps {
  anchorElement: PopoverProps['anchorEl'];
  onClose: PopoverProps['onClose'];
}

function RowMenu(props: RowMenuProps) {
  const { anchorElement, onClose } = props;

  const {
    palette: { text },
  } = useTheme();

  const items = useRowMenuItems();

  return (
    <Menu anchorEl={anchorElement} open={Boolean(anchorElement)} onClose={onClose}>
      {items?.map(({ label, onClick, IconComponent, color = text.secondary }, i) => (
        <MenuItem
          key={i}
          sx={{
            display: 'flex',
            gap: '12px',
          }}
          onClick={(e) => {
            onClick(e);
            onClose?.(e, 'backdropClick');
          }}
        >
          {IconComponent && <IconComponent sx={{ color }} fontSize={'small'} />}
          <Typography variant={'body2'} sx={{ color }}>
            {label}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default RowMenu;
