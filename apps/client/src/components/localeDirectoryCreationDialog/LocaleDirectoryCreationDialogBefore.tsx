import { Dialog } from 'primereact/dialog';
import useLocaleDirectoryCreationDialogBefore from '@components/localeDirectoryCreationDialog/useLocaleDirectoryCreationDialogBefore';
import { LanguageCodeMultiSelect } from '@components/languageCodeMultiSelect';
import { CustomConfirmDialogFooter } from '@components/customConfirmDialogFooter';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { CreateDirectoryEvent, CustomEventHandler } from '@defines/event';

export interface LocaleDirectoryCreationDialogBeforeProps {
  visible: boolean;
  onCreate: CustomEventHandler<CreateDirectoryEvent>;
  onHide: () => void;
}

const inputFileNameId = 'new-file';

/**
 * @deprecated TODO 삭제
 * @param props
 * @constructor
 */
export function LocaleDirectoryCreationDialogBefore(props: LocaleDirectoryCreationDialogBeforeProps) {
  const { visible, onHide } = props;
  const { multiSelectLanguageCode, inputFileName, inputDisabled, creationDisabled, handleCreateButtonClick, handleFormSubmit } =
    useLocaleDirectoryCreationDialogBefore(props);

  return (
    <>
      <Dialog
        visible={visible}
        onHide={onHide}
        draggable={false}
        position={'top'}
        header={'새로운 디렉토리 생성'}
        footer={
          <CustomConfirmDialogFooter
            yesLabel={'생성'}
            noLabel={'취소'}
            yesDisabled={creationDisabled}
            onYesClick={handleCreateButtonClick}
            onNoClick={onHide}
          />
        }
      >
        <form onSubmit={handleFormSubmit} className={'locale-directory-creation'}>
          <span className={'p-float-label'}>
            <LanguageCodeMultiSelect multiSelectLanguageCode={multiSelectLanguageCode} />
            <label>새로 생성할 디렉토리의 이름을 선택하세요</label>
          </span>

          <span className={classNames('p-float-label', 'file-name-container')}>
            <InputText id={inputFileNameId} value={inputFileName.value} onChange={inputFileName.onChange} disabled={inputDisabled} />
            <span className={'json'}>.json</span>
            <label htmlFor={inputFileNameId}>함께 생성할 번역 파일 이름을 입력하세요</label>
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
