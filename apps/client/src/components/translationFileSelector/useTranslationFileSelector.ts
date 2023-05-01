import { useEffect, useState } from 'react';
import { SelectItem } from 'primereact/selectitem';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { hasDirectorySelectorErrorState, localeDirectoryPathState, translationFileNamesState } from '@stores/store';
import { translationFileSelectorStates } from '@components/translationFileSelector/stores/store';
import { TranslationFileSelectorProps } from '@components/translationFileSelector/TranslationFileSelector';
import { CustomEventHandler } from '@defines/event';
import { DropdownChangeParams } from 'primereact/dropdown';

export interface UseTranslationFileSelectorParams extends TranslationFileSelectorProps {}

export interface UseTranslationFileSelector {
  options: SelectItem[];
  translationFileName: string | undefined;
  disabled: boolean;
  opened: boolean;
  tooltipMessage: string | undefined;
  handleShow: () => void;
  handleHide: () => void;
  handleTranslationFileNameChange: CustomEventHandler<DropdownChangeParams>;
  handleAddTranslationFileButtonClick: () => void;
}

export default function useTranslationFileSelector(params: UseTranslationFileSelectorParams): UseTranslationFileSelector {
  const {} = params;

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const hasDirectorySelectorError = useRecoilValue(hasDirectorySelectorErrorState);
  const translationFileNames = useRecoilValue(translationFileNamesState);
  const setTranslationFileCreationDialogOpened = useSetRecoilState(translationFileSelectorStates.translationFileCreationDialogOpened);

  const [translationFileName, setTranslationFileName] = useState<string>();
  const [opened, setOpened] = useState(false);

  const handleShow = () => {
    setOpened(true);
  };

  const handleHide = () => {
    setOpened(false);
  };

  const handleTranslationFileNameChange: CustomEventHandler<DropdownChangeParams> = (e) => {
    setTranslationFileName(e?.value);
  };

  const handleAddTranslationFileButtonClick = () => {
    setTranslationFileCreationDialogOpened(true);
  };

  const options: SelectItem[] = translationFileNames?.map((fileName) => ({ label: fileName, value: fileName })) ?? [];
  const disabled = !localeDirectoryPath || hasDirectorySelectorError;
  const tooltipMessage = !localeDirectoryPath
    ? 'Locale 디렉토리를 먼저 선택하세요'
    : hasDirectorySelectorError
    ? '올바른 Locale 디렉토리를 선택하세요'
    : undefined;

  useEffect(() => {
    setTranslationFileName(undefined);
  }, [localeDirectoryPath]);

  return {
    options,
    translationFileName,
    disabled,
    opened,
    tooltipMessage,
    handleShow,
    handleHide,
    handleTranslationFileNameChange,
    handleAddTranslationFileButtonClick,
  };
}
