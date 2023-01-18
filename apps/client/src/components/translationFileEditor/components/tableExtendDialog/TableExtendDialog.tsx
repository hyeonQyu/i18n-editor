import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { FormEventHandler, MouseEventHandler, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import classNames from 'classnames';
import { COLOR } from '@defines/css';
import { Dropdown } from 'primereact/dropdown';
import { LANGUAGE_SELECT_OPTIONS } from '@components/translationFileEditor/defines';

const inputId = 'table-extend';

export function TableExtendDialog() {
  const {
    tableExtendDialogData: { type, visible, inputLabel, invalid, onAdd, onHide, ...rest },
    inputAddingKey,
  } = useTranslationFileEditorContext();

  const handleAddRow = () => {
    onAdd(inputAddingKey.value);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onAdd(inputAddingKey.value);
  };

  useEffect(() => {
    document.body.style.overflowY = visible ? 'hidden' : 'initial';
  }, [visible]);

  return (
    <>
      <Dialog
        {...rest}
        visible={visible}
        onHide={onHide}
        footer={() => <TableExtendDialogFooter onYesClick={handleAddRow} onNoClick={onHide} disabledYes={!inputAddingKey.value} />}
        className={'table-extend-dialog-container'}
      >
        <form className={'table-extend-dialog'} onSubmit={handleFormSubmit}>
          <span className={'p-float-label'}>
            {type === 'row' && (
              <InputText
                id={inputId}
                value={inputAddingKey.value}
                onChange={inputAddingKey.onChange}
                autoFocus
                className={classNames('table-extend-input', invalid && 'p-invalid')}
              />
            )}
            {type === 'column' && (
              <Dropdown
                options={LANGUAGE_SELECT_OPTIONS}
                optionLabel={'label'}
                filter
                filterBy={'title'}
                autoFocus
                className={'table-extend-select'}
              />
            )}
            <label className={classNames(invalid && 'invalid')} htmlFor={inputId}>
              {inputLabel}
            </label>
          </span>
        </form>
      </Dialog>

      <style jsx>{`
        :global(.table-extend-dialog-container) {
          margin: 5rem 3rem !important;
        }

        .table-extend-dialog {
          width: 400px;
          padding-top: 20px;
        }

        .table-extend-dialog :global(.table-extend-input),
        .table-extend-dialog :global(.table-extend-select) {
          width: 100%;
        }

        label.invalid {
          color: ${COLOR.invalid};
          animation: shake 0.2s ease;
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
