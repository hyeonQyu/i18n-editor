import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import classNames from 'classnames';
import { COLOR } from '@defines/css';
import { Dropdown } from 'primereact/dropdown';
import { LANGUAGE_SELECT_OPTIONS } from '@components/translationFileEditor/defines';
import { TableExtendDialogFooter } from '@components/translationFileEditor/components/tableExtendDialog/components/tableExtendDialogFooter';
import { DropdownLanguageOptionTemplate } from '@components/translationFileEditor/components/tableExtendDialog/components/dropdownLanguageOptionTemplate';
import useTableExtendDialog from '@components/translationFileEditor/components/tableExtendDialog/components/useTableExtendDialog';
import { DropdownLanguageHeaderTemplate } from '@components/translationFileEditor/components/tableExtendDialog/components/dropdownLanguageHeaderTemplate';

const inputId = 'table-extend';

export function TableExtendDialog() {
  const {
    tableExtendDialogData: { type, visible, inputLabel, invalid, onAdd, onHide, ...rest },
    dropdownAddingLanguageCode,
    inputAddingKey,
  } = useTranslationFileEditorContext();

  const { handleClickAdd, handleFormSubmit, disabledYes } = useTableExtendDialog({});

  return (
    <>
      <Dialog
        {...rest}
        visible={visible}
        onHide={onHide}
        draggable={false}
        footer={() => <TableExtendDialogFooter onYesClick={handleClickAdd} onNoClick={onHide} disabledYes={disabledYes} />}
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
                value={dropdownAddingLanguageCode.value}
                onChange={dropdownAddingLanguageCode.onChange}
                options={LANGUAGE_SELECT_OPTIONS}
                optionLabel={'label'}
                filter
                filterBy={'title'}
                autoFocus
                scrollHeight={'300px'}
                emptyFilterMessage={'일치하는 언어 코드가 없어요'}
                itemTemplate={DropdownLanguageOptionTemplate}
                valueTemplate={DropdownLanguageHeaderTemplate}
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
