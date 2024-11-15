import { Button, Tooltip } from '@mui/material';
import { ReactNode } from 'react';

interface HistoryButtonContainerProps {
  children: ReactNode;
  tooltipMessage: string;
}

function HistoryButtonContainer(props: HistoryButtonContainerProps) {
  const { children, tooltipMessage } = props;

  return (
    <Tooltip title={tooltipMessage}>
      <Button sx={{ padding: '8px 6px' }}>{children}</Button>
    </Tooltip>
  );
}

export default HistoryButtonContainer;
