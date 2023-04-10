import { Dialog } from 'primereact/dialog';
import { CustomConfirmDialogFooter } from '@components/customConfirmDialogFooter';
import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import { COLOR } from '@defines/css';
import useTranslationFileCreationDialog from '@components/translationFileCreationDialog/useTranslationFileCreationDialog';

export interface TranslationFileCreationDialogProps {}

const INPUT_FILE_NAME_ID = 'new-translation-file';

function TranslationFileCreationDialog(props: TranslationFileCreationDialogProps) {
  const {
    visible,
    creationDisabled,
    inputTranslationFileName,
    duplicated,
    labelMessage,
    handleCreateButtonClick,
    handleHide,
    handleFormSubmit,
  } = useTranslationFileCreationDialog(props);

  return (
    <>
      <Dialog
        visible={visible}
        onHide={handleHide}
        draggable={false}
        position={'top'}
        header={'새로운 번역 파일 생성'}
        footer={
          <CustomConfirmDialogFooter
            yesLabel={'생성'}
            noLabel={'취소'}
            yesDisabled={creationDisabled}
            onYesClick={handleCreateButtonClick}
            onNoClick={handleHide}
          />
        }
      >
        <form onSubmit={handleFormSubmit} className={'translation-file-creation'}>
          <span className={classNames('p-float-label', 'file-name-container')}>
            <InputText
              id={INPUT_FILE_NAME_ID}
              value={inputTranslationFileName.value}
              onChange={inputTranslationFileName.onChange}
              className={classNames(duplicated && 'p-invalid')}
              autoFocus
            />
            <span className={'json'}>.json</span>
            <label htmlFor={INPUT_FILE_NAME_ID} className={classNames(duplicated && 'invalid')}>
              {labelMessage}
            </label>
          </span>
        </form>
      </Dialog>

      <style jsx>{`
        .translation-file-creation {
          width: 400px;
          padding-top: 20px;
        }

        .file-name-container :global(input) {
          width: calc(100% - 39px);
        }

        .json {
          padding-left: 6px;
        }

        label.invalid {
          color: ${COLOR.invalid};
          animation: shake 0.2s ease;
        }
      `}</style>
    </>
  );
}

export default TranslationFileCreationDialog;
