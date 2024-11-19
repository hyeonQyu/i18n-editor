import { SxProps, Typography } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography/Typography';

interface EllipsisTextProps {
  label: string;
  variant: TypographyProps['variant'];
  maxLines?: number;
  sx?: SxProps;
}

function EllipsisText(props: EllipsisTextProps) {
  const { label, variant, maxLines = 1, sx } = props;

  return (
    <Typography
      variant={variant}
      sx={{
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: maxLines,
        ...sx,
      }}
    >
      {label}
    </Typography>
  );
}

export default EllipsisText;
