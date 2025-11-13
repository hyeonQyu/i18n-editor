import { useCopyClipboard } from '@/hooks/common';
import { ContentCopy } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

interface CopyableButtonProps extends Omit<ButtonProps, 'onClick' | 'variant'> {
  children: ReactNode;
  copyText: string;
}

function CopyableButton({ children, copyText, sx, ...props }: CopyableButtonProps) {
  const copyClipboard = useCopyClipboard();
  const handleClick = () => copyClipboard(copyText);

  return (
    <Button variant={'text'} sx={{ display: 'flex', gap: '8px', ...sx }} onClick={handleClick} {...props}>
      {children}
      <ContentCopy fontSize={'small'} color={'inherit'} />
    </Button>
  );
}

export default CopyableButton;
