import { SvgIconComponent } from '@mui/icons-material';
import { Button, ButtonProps, Tooltip } from '@mui/material';

interface WorkspaceMenuIconButtonProps extends Omit<ButtonProps, 'children'> {
  IconComponent: SvgIconComponent;
}

function WorkspaceMenuIconButton(props: WorkspaceMenuIconButtonProps) {
  const { title, sx, IconComponent, ...rest } = props;

  return (
    <Tooltip title={title}>
      <Button variant={'outlined'} sx={{ width: '40px', height: '40px', padding: 0, minWidth: 'initial', ...sx }} {...rest}>
        <IconComponent fontSize={'small'} />
      </Button>
    </Tooltip>
  );
}

export default WorkspaceMenuIconButton;
