import { SxProps, Tooltip, Typography, TypographyProps } from '@mui/material';
import classNames from 'classnames';

interface EllipsisTextProps {
  label: string;
  variant: TypographyProps['variant'];
  maxLines?: number;
  className?: string;
  sx?: SxProps;
  reverse?: boolean;
}

const CLASSNAME = {
  single: 'ellipsis',
  multi: 'multiline-ellipsis',
};

function EllipsisText(props: EllipsisTextProps) {
  const { label, variant, maxLines = 1, className, sx, reverse } = props;

  const lineClassName = maxLines === 1 ? CLASSNAME.single : CLASSNAME.multi;

  return (
    <Tooltip title={label}>
      <Typography
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
        {label}
      </Typography>
    </Tooltip>
  );
}

export default EllipsisText;
