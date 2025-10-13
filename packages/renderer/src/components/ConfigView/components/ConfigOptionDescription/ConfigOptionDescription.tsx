import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface ConfigOptionDescriptionProps {
  children: ReactNode;
}

function ConfigOptionDescription({ children }: ConfigOptionDescriptionProps) {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {children}
    </Typography>
  );
}

export default ConfigOptionDescription;
