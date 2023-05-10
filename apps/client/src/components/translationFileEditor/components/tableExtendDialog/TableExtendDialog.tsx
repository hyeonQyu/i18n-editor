import { useRecoilValue } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import useTableExtendDialog from '@components/translationFileEditor/components/tableExtendDialog/useTableExtendDialog';
import { Dialog } from 'primereact/dialog';
import { CustomConfirmDialogFooter } from '@components/customConfirmDialogFooter';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { LanguageCodeMultiSelect } from '@components/languageCodeMultiSelect';
import { COLOR } from '@defines/css';

export interface TableExtendDialogProps {}

const INPUT_ID = 'table-extend';

function TableExtendDialog(props: TableExtendDialogProps) {
  const {} = props;

  const { type, visible, inputLabel, invalid, onAddKey, onHide, ...rest } = useRecoilValue(
    translationFileEditorStates.tableExtendDialogData,
  );

  const { disabledYes, languageSelectOptions, inputAddingKey, multiSelectAddingLanguageCode, handleClickAdd, handleFormSubmit } =
    useTableExtendDialog(props);

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
                id={INPUT_ID}
                value={inputAddingKey.value}
                onChange={inputAddingKey.onChange}
                autoFocus
                className={classNames('table-extend-input', invalid && 'p-invalid')}
              />
            )}
            {type === 'column' && (
              <LanguageCodeMultiSelect multiSelectLanguageCode={multiSelectAddingLanguageCode} options={languageSelectOptions} />
            )}
            <label htmlFor={INPUT_ID} className={classNames(invalid && 'invalid')}>
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

export default TableExtendDialog;
