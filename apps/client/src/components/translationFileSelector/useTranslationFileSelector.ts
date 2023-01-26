import { TranslationFileSelectorProps } from '@components/translationFileSelector/TranslationFileSelector';
import { SelectItem } from 'primereact/selectitem';
import { useState } from 'react';
import { CustomEventHandler } from '@defines/event';

export interface IUseTranslationFileSelectorParams extends TranslationFileSelectorProps {}

export interface IUseTranslationFileSelector {
  options: SelectItem[];
  disabled: boolean;
  opened: boolean;
  tooltipMessage: string | undefined;
  handleShow: CustomEventHandler;
  handleHide: CustomEventHandler;
}

function useTranslationFileSelector(params: IUseTranslationFileSelectorParams): IUseTranslationFileSelector {
  const { directoryPath, files, hasDirectorySelectorError } = params;

  const [opened, setOpened] = useState(false);

  const handleShow = () => {
    setOpened(true);
  };

  const handleHide = () => {
    setOpened(false);
  };

  const options: SelectItem[] = files.map((file) => ({ label: file, value: file }));
  const disabled = !directoryPath || hasDirectorySelectorError;
  const tooltipMessage = !directoryPath
    ? 'Locale 디렉토리를 먼저 선택하세요'
    : hasDirectorySelectorError
    ? '올바른 Locale 디렉토리를 선택하세요'
    : undefined;

  return {
    options,
    disabled,
    opened,
    tooltipMessage,
    handleShow,
    handleHide,
  };
}

export default useTranslationFileSelector;
