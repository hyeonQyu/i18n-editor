import { SvgIconComponent } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { MouseEventHandler } from 'react';

export interface ToolbarButtonProps {
  IconComponent: SvgIconComponent;
  label: string;
  onClick: MouseEventHandler;
  color?: string;
}

function ToolbarButton(props: ToolbarButtonProps) {
  const { IconComponent, label, onClick, color = 'primary' } = props;

  return (
    <Tooltip title={label}>
      <IconButton onClick={onClick} sx={{ color }}>
        <IconComponent />
      </IconButton>
    </Tooltip>
  );
}

export default ToolbarButton;
