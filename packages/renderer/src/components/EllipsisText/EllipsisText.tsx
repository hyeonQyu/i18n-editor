import { SxProps, Tooltip, Typography, TypographyProps } from '@mui/material';
import classNames from 'classnames';
import { forwardRef, ReactNode } from 'react';

export interface EllipsisTextProps {
  label: string;
  variant: TypographyProps['variant'];
  maxLines?: number;
  className?: string;
  sx?: SxProps;
  reverse?: boolean;
  hideTooltip?: boolean;
  children?: ReactNode;
}

const CLASSNAME = {
  single: 'ellipsis',
  multi: 'multiline-ellipsis',
};

const EllipsisText = forwardRef<HTMLParagraphElement, EllipsisTextProps>(function EllipsisText(props, ref) {
  const { label, variant, maxLines = 1, className, sx, reverse, hideTooltip = false, children } = props;

  const lineClassName = maxLines === 1 ? CLASSNAME.single : CLASSNAME.multi;

  return (
    <Tooltip title={label} disableHoverListener={hideTooltip}>
      <Typography
        ref={ref}
        variant={variant}
        className={classNames(lineClassName, className)}
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          width: '100%',

          [`&.${CLASSNAME.single}`]: {
            whiteSpace: 'nowrap',
            direction: reverse ? 'rtl' : 'ltr',
            textAlign: reverse ? 'left' : 'inherit',
          },

          [`&.${CLASSNAME.multi}`]: {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: maxLines,
          },

          ...sx,
        }}
      >
        {children || label}
      </Typography>
    </Tooltip>
  );
});

export default EllipsisText;
