import { MouseEventHandler } from 'react';

export interface IconCommonProps {
  width?: number;
  height?: number;
  opacity?: number;
  backgroundColor?: string;
  color?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
