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

function PaperSection(props: PaperSectionProps) {
  const { titleProps, children, sx, variant = 'outlined' } = props;

  return (
    <Paper sx={sx} variant={variant}>
      <Typography variant="h6" sx={titleProps.sx}>
        {titleProps.children}
      </Typography>

      {children}
    </Paper>
  );
}

export default PaperSection;
