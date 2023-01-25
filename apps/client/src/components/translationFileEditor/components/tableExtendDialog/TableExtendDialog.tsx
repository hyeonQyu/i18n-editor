import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import classNames from 'classnames';
import { COLOR } from '@defines/css';
import useTableExtendDialog from '@components/translationFileEditor/components/tableExtendDialog/useTableExtendDialog';
import { LanguageCodeDropdown } from '@components/languageCodeDropdown';
import { CustomConfirmDialogFooter } from '@components/customConfirmDialogFooter';

const inputId = 'table-extend';

export function TableExtendDialog() {
  const {
    tableExtendDialogData: { type, visible, inputLabel, invalid, onAdd, onHide, ...rest },
    dropdownAddingLanguageCode,
    inputAddingKey,
  } = useTranslationFileEditorContext();

  const { disabledYes, languageSelectOptions, handleClickAdd, handleFormSubmit } = useTableExtendDialog({});

  return (
    <>
      <Dialog
        {...rest}
        visible={visible}
        onHide={onHide}
        draggable={false}
        footer={
          <CustomConfirmDialogFooter
            yesLabel={'네, 추가할래요'}
            noLabel={'아니요'}
            yesDisabled={disabledYes}
            onYesClick={handleClickAdd}
            onNoClick={onHide}
          />
        }
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
              <LanguageCodeDropdown dropdownLanguageCode={dropdownAddingLanguageCode} options={languageSelectOptions} />
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

        .table-extend-dialog :global(.table-extend-input) {
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
