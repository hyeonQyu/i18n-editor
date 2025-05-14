import ToolbarButton, { ToolbarButtonProps } from '@components/Toolbar/components/ToolbarButton';
import { SxProps, Theme, Toolbar as MuiToolbar } from '@mui/material';

interface ToolbarProps {
  buttons: ToolbarButtonProps[];
  sx?: SxProps<Theme>;
}

function Toolbar(props: ToolbarProps) {
  const { buttons, sx } = props;

  return (
    <MuiToolbar
      sx={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        ...sx,
      }}
    >
      {buttons.map((button, i) => (
        <ToolbarButton key={i} {...button} />
      ))}
    </MuiToolbar>
  );
}

export default Toolbar;
