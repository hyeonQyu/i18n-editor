import { SvgIconComponent } from '@mui/icons-material';
import { Button, IconButton, Tooltip } from '@mui/material';
import { MouseEventHandler } from 'react';

export type ToolbarButtonProps = {
  IconComponent: SvgIconComponent;
  onClick: MouseEventHandler;
  color?: string;
} & (
  | {
      label: string;
      tooltip?: never;
    }
  | {
      label?: never;
      tooltip: string;
    }
);

function ToolbarButton(props: ToolbarButtonProps) {
  const { IconComponent, label, tooltip, onClick, color = 'primary' } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <IconButton onClick={onClick} sx={{ color }}>
          <IconComponent />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button startIcon={<IconComponent />} onClick={onClick} sx={{ color }}>
      {label}
    </Button>
  );
}

export default ToolbarButton;
