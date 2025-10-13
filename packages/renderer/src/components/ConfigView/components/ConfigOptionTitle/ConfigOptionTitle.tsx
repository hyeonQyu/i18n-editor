import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ConfigOptionTitleProps {
  children: ReactNode;
}

function ConfigOptionTitle({ children }: ConfigOptionTitleProps) {
  return (
    <Typography variant="h6" sx={{ fontSize: '1.125rem' }}>
      {children}
    </Typography>
  );
}

export default ConfigOptionTitle;
