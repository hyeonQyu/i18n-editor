import { Button } from '@mui/material';
import { ReactNode } from 'react';

interface HistoryButtonContainerProps {
  children: ReactNode;
}

function HistoryButtonContainer(props: HistoryButtonContainerProps) {
  const { children } = props;

  return <Button sx={{ padding: '8px 6px' }}>{children}</Button>;
}

export default HistoryButtonContainer;
