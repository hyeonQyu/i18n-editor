import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { MouseEventHandler, ReactNode } from 'react';

function HistoryButtonGroup() {
  const pathHistory = useFileManagerStore(({ pathHistory }) => pathHistory);
  const moveForward = useFileManagerStore(({ moveForward }) => moveForward);
  const moveBackward = useFileManagerStore(({ moveBackward }) => moveBackward);

  const buttons: Array<{ label: string; icon: ReactNode; disabled: boolean; onClick: MouseEventHandler }> = [
    {
      label: '뒤로 가기',
      icon: <ArrowLeftIcon />,
      disabled: !pathHistory.backward.length,
      onClick: moveBackward,
    },
    {
      label: '앞으로 가기',
      icon: <ArrowRightIcon />,
      disabled: !pathHistory.forward.length,
      onClick: moveForward,
    },
  ];

  return (
    <ButtonGroup variant={'outlined'} aria-label={'navigation history button group'}>
      {buttons.map(({ label, icon, disabled, onClick }) => (
        <Tooltip key={label} title={label}>
          <Button disabled={disabled} onClick={onClick} sx={{ padding: '8px 6px' }}>
            {icon}
          </Button>
        </Tooltip>
      ))}
    </ButtonGroup>
  );
}

export default HistoryButtonGroup;
