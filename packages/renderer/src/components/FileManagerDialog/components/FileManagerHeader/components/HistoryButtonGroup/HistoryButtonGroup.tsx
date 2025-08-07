import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { SxProps } from '@mui/system';
import { MouseEventHandler, ReactNode } from 'react';

function HistoryButtonGroup() {
  const pathHistory = useFileManagerDialogStore(({ pathHistory }) => pathHistory);
  const moveForward = useFileManagerDialogStore(({ moveForward }) => moveForward);
  const moveBackward = useFileManagerDialogStore(({ moveBackward }) => moveBackward);

  const backwardDisabled = !pathHistory.backward.length;
  const forwardDisabled = !pathHistory.forward.length;

  const buttons: Array<{ label: string; icon: ReactNode; disabled: boolean; onClick: MouseEventHandler; sx?: SxProps }> = [
    {
      label: '뒤로 가기',
      icon: <ArrowLeftIcon />,
      disabled: backwardDisabled,
      onClick: moveBackward,
      sx: {
        borderRightColor: forwardDisabled ? 'rgba(25, 118, 210, 0.5) !important' : 'transparent',
      },
    },
    {
      label: '앞으로 가기',
      icon: <ArrowRightIcon />,
      disabled: forwardDisabled,
      onClick: moveForward,
    },
  ];

  return (
    <ButtonGroup variant={'outlined'} aria-label={'navigation history button group'}>
      {buttons.map(({ label, icon, disabled, onClick, sx }) => (
        <Tooltip key={label} title={label}>
          <Button disabled={disabled} onClick={onClick} sx={{ padding: '8px 6px', ...sx }}>
            {icon}
          </Button>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
}

export default HistoryButtonGroup;
