import { Button } from 'primereact/button';
import { MouseEventHandler } from 'react';

export interface CustomConfirmDialogFooterProps {
  yesLabel: string;
  noLabel: string;
  yesDisabled: boolean;
  yesIcon?: string;
  noIcon?: string;
  yesClassName?: string;
  noClassName?: string;
  onYesClick: MouseEventHandler<HTMLButtonElement>;
  onNoClick: MouseEventHandler<HTMLButtonElement>;
}

export function CustomConfirmDialogFooter(props: CustomConfirmDialogFooterProps) {
  const {
    yesLabel,
    noLabel,
    yesDisabled,
    yesIcon = 'pi pi-check',
    noIcon = 'pi pi-times',
    yesClassName,
    noClassName = 'p-button-text',
    onYesClick,
    onNoClick,
  } = props;

  return (
    <>
      <Button label={noLabel} icon={noIcon} onClick={onNoClick} className={noClassName} />
      <Button label={yesLabel} icon={yesIcon} onClick={onYesClick} disabled={yesDisabled} className={yesClassName} />
    </>
  );
}
