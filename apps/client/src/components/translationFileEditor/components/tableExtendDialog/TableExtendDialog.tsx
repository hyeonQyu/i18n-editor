import { Dialog } from 'primereact/dialog';
import { FormEventHandler, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import classNames from 'classnames';
import { COLOR } from '@defines/css';
import { Dropdown } from 'primereact/dropdown';
import { LANGUAGE_SELECT_OPTIONS } from '@components/translationFileEditor/defines';
import { TableExtendDialogFooter } from '@components/translationFileEditor/components/tableExtendDialog/components/tableExtendDialogFooter';
import { DropdownLanguageOptionTemplate } from '@components/translationFileEditor/components/tableExtendDialog/components/dropdownLanguageOptionTemplate';

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

  const disabledYes = {
    row: !inputAddingKey.value,
    column: true,
  }[type];

  return (
    <>
      <Dialog
        {...rest}
        visible={visible}
        onHide={onHide}
        draggable={false}
        footer={() => <TableExtendDialogFooter onYesClick={handleAddRow} onNoClick={onHide} disabledYes={disabledYes} />}
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
                scrollHeight={'300px'}
                emptyFilterMessage={'일치하는 언어 코드가 없어요'}
                itemTemplate={DropdownLanguageOptionTemplate}
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
