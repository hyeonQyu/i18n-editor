import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { MouseEventHandler } from 'react';
import { InputText } from 'primereact/inputtext';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

const inputId = 'table-extend';

export function TableExtendDialog() {
  const {
    tableExtendDialogData: { inputLabel, onAdd, onHide, ...rest },
    inputAddingKey,
  } = useTranslationFileEditorContext();

  const handleAddRow = () => {
    onAdd(inputAddingKey.value);
  };

  return (
    <>
      <Dialog
        {...rest}
        onHide={onHide}
        footer={() => <TableExtendDialogFooter onYesClick={handleAddRow} onNoClick={onHide} disabledYes={!inputAddingKey.value} />}
        className={'table-extend-dialog-container'}
      >
        <div className={'table-extend-dialog'}>
          <span className={'p-float-label'}>
            <InputText
              id={inputId}
              value={inputAddingKey.value}
              onChange={inputAddingKey.onChange}
              autoFocus
              className={'table-extend-input'}
            />
            <label htmlFor={inputId}>{inputLabel}</label>
          </span>
        </div>
      </Dialog>

      <style jsx>{`
        :global(.table-extend-dialog-container) {
          margin: 5rem 3rem !important;
        }

        .table-extend-dialog {
          width: 400px;
          padding-top: 20px;
        }

        .table-extend-dialog :global(.table-extend-input) {
          width: 100%;
        }
      `}</style>
    </>
  );
}

interface TableExtendDialogFooterProps {
  onYesClick: MouseEventHandler<HTMLButtonElement>;
  onNoClick: MouseEventHandler<HTMLButtonElement>;
  disabledYes: boolean;
}

function TableExtendDialogFooter(props: TableExtendDialogFooterProps) {
  const { onYesClick, onNoClick, disabledYes } = props;

  return (
    <>
      <Button label={'아니요'} icon={'pi pi-times'} onClick={onNoClick} className={'p-button-text'} />
      <Button label={'네, 추가할래요'} icon={'pi pi-check'} onClick={onYesClick} disabled={disabledYes} />
    </>
  );
}
