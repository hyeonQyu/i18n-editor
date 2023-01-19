import { MouseEventHandler } from 'react';
import { Button } from 'primereact/button';

interface TableExtendDialogFooterProps {
  onYesClick: MouseEventHandler<HTMLButtonElement>;
  onNoClick: MouseEventHandler<HTMLButtonElement>;
  disabledYes: boolean;
}

export function TableExtendDialogFooter(props: TableExtendDialogFooterProps) {
  const { onYesClick, onNoClick, disabledYes } = props;

  return (
    <>
      <Button label={'아니요'} icon={'pi pi-times'} onClick={onNoClick} className={'p-button-text'} />
      <Button label={'네, 추가할래요'} icon={'pi pi-check'} onClick={onYesClick} disabled={disabledYes} />
    </>
  );
}
