import { Paper, PaperProps, SxProps, Theme, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface PaperSectionProps {
  titleProps: {
    children: ReactNode;
    sx?: SxProps<Theme>;
  };
  children: ReactNode;
  sx?: SxProps<Theme>;
  variant?: PaperProps['variant'];
}

function PaperSection({ titleProps, children, sx, variant = 'outlined' }: PaperSectionProps) {
  return (
    <Paper sx={sx} variant={variant}>
      <Typography
        variant="h5"
        sx={{
          fontSize: '1.25rem',
          ...titleProps.sx,
        }}
      >
        {titleProps.children}
      </Typography>

      {children}
    </Paper>
  );
}

export default PaperSection;
