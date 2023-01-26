import { CreateTranslationFileEvent, CustomEventHandler } from '@defines/event';
import { Dialog } from 'primereact/dialog';
import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import useTranslationFileCreationDialog from '@components/translationFileCreationDialog/useTranslationFileCreationDialog';
import { CustomConfirmDialogFooter } from '@components/customConfirmDialogFooter';

export interface TranslationFileCreationDialogProps {
  visible: boolean;
  onCreate: CustomEventHandler<CreateTranslationFileEvent>;
  onHide: () => void;
}

const inputFileNameId = 'new-translation-file';

export function TranslationFileCreationDialog(props: TranslationFileCreationDialogProps) {
  const { visible, onHide } = props;
  const { inputFileName, creationDisabled, handleCreateButtonClick, handleFormSubmit } = useTranslationFileCreationDialog(props);

  return (
    <>
      <Dialog
        visible={visible}
        onHide={onHide}
        draggable={false}
        position={'top'}
        header={'새로운 번역 파일 생성'}
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
        <form onSubmit={handleFormSubmit} className={'translation-file-creation'}>
          <span className={classNames('p-float-label', 'file-name-container')}>
            <InputText id={inputFileNameId} value={inputFileName.value} onChange={inputFileName.onChange} />
            <span className={'json'}>.json</span>
            <label htmlFor={inputFileNameId}>새로 생성할 번역 파일 이름을 입력하세요</label>
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
      `}</style>
    </>
  );
}
