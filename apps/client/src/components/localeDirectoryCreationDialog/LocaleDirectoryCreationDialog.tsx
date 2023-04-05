import useLocaleDirectoryCreationDialog from '@components/localeDirectoryCreationDialog/useLocaleDirectoryCreationDialog';
import { Dialog } from 'primereact/dialog';
import { LanguageCodeMultiSelect } from '@components/languageCodeMultiSelect';
import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import { CustomConfirmDialogFooter } from '@components/customConfirmDialogFooter';

export interface LocaleDirectoryCreationDialogProps {}

const INPUT_FILE_NAME_ID = 'new-file';

function LocaleDirectoryCreationDialog(props: LocaleDirectoryCreationDialogProps) {
  const {} = props;
  const {
    visible,
    multiSelectLanguageCode,
    inputFileName,
    inputDisabled,
    creationDisabled,
    handleCreateButtonClick,
    handleCloseButtonClick,
    handleFormSubmit,
  } = useLocaleDirectoryCreationDialog(props);

  return (
    <>
      <Dialog
        visible={visible}
        onHide={handleCloseButtonClick}
        draggable={false}
        position={'top'}
        header={'새로운 디렉토리 생성'}
        footer={
          <CustomConfirmDialogFooter
            yesLabel={'생성'}
            noLabel={'취소'}
            yesDisabled={creationDisabled}
            onYesClick={handleCreateButtonClick}
            onNoClick={handleCloseButtonClick}
          />
        }
      >
        <form onSubmit={handleFormSubmit} className={'locale-directory-creation'}>
          <span className={'p-float-label'}>
            <LanguageCodeMultiSelect multiSelectLanguageCode={multiSelectLanguageCode} />
            <label>새로 생성할 디렉토리의 이름을 선택하세요</label>
          </span>

          <span className={classNames('p-float-label', 'file-name-container')}>
            <InputText id={INPUT_FILE_NAME_ID} value={inputFileName.value} onChange={inputFileName.onChange} disabled={inputDisabled} />
            <span className={'json'}>.json</span>
            <label htmlFor={INPUT_FILE_NAME_ID}>함께 생성할 번역 파일 이름을 입력하세요</label>
          </span>
        </form>
      </Dialog>

      <style jsx>{`
        .locale-directory-creation {
          width: 400px;
          padding-top: 20px;
        }

        .file-name-container {
          margin-top: 40px;
        }

        .file-name-container :global(input) {
          width: calc(100% - 39px);
        }

        .json {
          padding-left: 6px;
        }
      `}</style>
    </>
  );
}

export default LocaleDirectoryCreationDialog;
