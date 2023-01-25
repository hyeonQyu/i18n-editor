import { Dialog } from 'primereact/dialog';
import { LanguageCode } from 'i18n-editor-common';
import useLocaleDirectoryCreationDialog from '@components/localeDirectoryCreationDialog/useLocaleDirectoryCreationDialog';
import { LanguageCodeDropdown } from '@components/languageCodeDropdown';
import { CustomConfirmDialogFooter } from '@components/customConfirmDialogFooter';

export interface LocaleDirectoryCreationDialogProps {
  visible: boolean;
  onCreate: (code: LanguageCode) => void;
  onHide: () => void;
}

export function LocaleDirectoryCreationDialog(props: LocaleDirectoryCreationDialogProps) {
  const { visible, onHide } = props;
  const { dropdownLanguageCode, handleCreateButtonClick, handleFormSubmit } = useLocaleDirectoryCreationDialog(props);

  return (
    <>
      <Dialog
        visible={visible}
        onHide={onHide}
        draggable={false}
        position={'top'}
        header={'새로운 디렉토리를 생성합니다'}
        footer={
          <CustomConfirmDialogFooter
            yesLabel={'생성'}
            noLabel={'취소'}
            yesDisabled={false}
            onYesClick={handleCreateButtonClick}
            onNoClick={onHide}
          />
        }
      >
        <form onSubmit={handleFormSubmit} className={'locale-directory-creation'}>
          <span className={'p-float-label'}>
            <LanguageCodeDropdown dropdownLanguageCode={dropdownLanguageCode} />
            <label>새로 생성할 디렉토리의 이름을 선택하세요</label>
          </span>
        </form>
      </Dialog>

      <style jsx>{`
        .locale-directory-creation {
          width: 400px;
          padding-top: 20px;
        }
      `}</style>
    </>
  );
}
