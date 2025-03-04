import { FileManagerViewType, useFileManagerDialogStore } from '@components/FileManagerDialog/stores';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import WindowIcon from '@mui/icons-material/Window';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { ReactNode } from 'react';

const SELECTORS: Array<{ icon: ReactNode; viewType: FileManagerViewType; tooltipMessage: string }> = [
  {
    icon: <FormatListBulletedIcon />,
    viewType: 'list',
    tooltipMessage: '리스트 형식으로 보기',
  },
  {
    icon: <WindowIcon />,
    viewType: 'table',
    tooltipMessage: '아이콘 형식으로 보기',
  },
];

function ViewTypeSelector() {
  const { viewType: currentViewType, setViewType } = useFileManagerDialogStore();

  return (
    <ButtonGroup aria-label={'change file manager view type'}>
      {SELECTORS.map(({ icon, viewType, tooltipMessage }, index) => {
        const active = viewType === currentViewType;

        return (
          <Tooltip key={index} title={active ? undefined : tooltipMessage}>
            <Button variant={active ? 'contained' : 'outlined'} onClick={() => setViewType(viewType)} sx={{ padding: '8px 14px' }}>
              {icon}
            </Button>
          </Tooltip>
        );
      })}
    </ButtonGroup>
  );
}

export default ViewTypeSelector;
