import { SxProps, Typography } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';
import classNames from 'classnames';

interface EllipsisTextProps {
  label: string;
  variant: TypographyProps['variant'];
  maxLines?: number;
  className?: string;
  sx?: SxProps;
}

const CLASSNAME = {
  single: 'ellipsis',
  multi: 'multiline-ellipsis',
};

function EllipsisText(props: EllipsisTextProps) {
  const { label, variant, maxLines = 1, className, sx } = props;

  const lineClassName = maxLines === 1 ? CLASSNAME.single : CLASSNAME.multi;

  return (
    <Typography
      variant={variant}
      title={label}
      className={classNames(lineClassName, className)}
      sx={{
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: '100%',

        [`&.${CLASSNAME.single}`]: {
          whiteSpace: 'nowrap',
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
  );
}

export default EllipsisText;
