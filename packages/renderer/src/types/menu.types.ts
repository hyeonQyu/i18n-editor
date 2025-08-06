import { SvgIconComponent } from '@mui/icons-material';
import { MouseEventHandler } from 'react';

export interface MenuItemProps {
  label: string;
  onClick: MouseEventHandler;
  IconComponent?: SvgIconComponent;
  color?: string;
}
