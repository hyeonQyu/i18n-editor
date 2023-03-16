import { CreateTranslationFileEvent, CustomEventHandler } from '@defines/event';
import { Dialog } from 'primereact/dialog';
import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import useTranslationFileCreationDialog from '@components/translationFileCreationDialog/useTranslationFileCreationDialog';
import { CustomConfirmDialogFooter } from '@components/customConfirmDialogFooter';
import { COLOR } from '@defines/css';
import { IUseInput } from '@hooks/common/useInput';

export interface TranslationFileCreationDialogProps {
  visible: boolean;
  isDuplicate: boolean;
  inputTranslationFileName: IUseInput;
  onCreate: CustomEventHandler<CreateTranslationFileEvent>;
  onHide: () => void;
}

const inputFileNameId = 'new-translation-file';

export function TranslationFileCreationDialog(props: TranslationFileCreationDialogProps) {
  const { visible, isDuplicate, inputTranslationFileName, onHide } = props;
  const { creationDisabled, labelMessage, handleCreateButtonClick, handleFormSubmit } = useTranslationFileCreationDialog(props);

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
            <InputText
              id={inputFileNameId}
              value={inputTranslationFileName.value}
              onChange={inputTranslationFileName.onChange}
              className={classNames(isDuplicate && 'p-invalid')}
              autoFocus
            />
            <span className={'json'}>.json</span>
            <label htmlFor={inputFileNameId} className={classNames(isDuplicate && 'invalid')}>
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
