import { TranslationFileSelectorProps } from '@components/translationFileSelector/TranslationFileSelector';
import { SelectItem } from 'primereact/selectitem';
import { useState } from 'react';
import { CustomEventHandler } from '@defines/event';

export interface IUseTranslationFileSelectorParams extends TranslationFileSelectorProps {}

export interface IUseTranslationFileSelector {
  options: SelectItem[];
  disabled: boolean;
  opened: boolean;
  handleShow: CustomEventHandler;
  handleHide: CustomEventHandler;
}

function useTranslationFileSelector(params: IUseTranslationFileSelectorParams): IUseTranslationFileSelector {
  const { directoryPath, files } = params;

  const [opened, setOpened] = useState(false);

  const handleShow = () => {
    setOpened(true);
  };

  const handleHide = () => {
    setOpened(false);
  };

  const options: SelectItem[] = files.map((file) => ({ label: file, value: file }));
  const disabled = !directoryPath;

  return {
    options,
    disabled,
    opened,
    handleShow,
    handleHide,
  };
}

export default useTranslationFileSelector;
