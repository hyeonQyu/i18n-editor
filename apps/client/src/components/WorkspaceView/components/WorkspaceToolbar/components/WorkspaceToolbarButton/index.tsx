import { SvgIconComponent } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { MouseEventHandler } from 'react';

export interface WorkspaceToolbarButtonProps {
  IconComponent: SvgIconComponent;
  label: string;
  onClick: MouseEventHandler;
}

function WorkspaceToolbarButton(props: WorkspaceToolbarButtonProps) {
  const { IconComponent, label, onClick } = props;

  return (
    <Tooltip title={label}>
      <IconButton onClick={onClick}>
        <IconComponent />
      </IconButton>
    </Tooltip>
  );
}

export default WorkspaceToolbarButton;
