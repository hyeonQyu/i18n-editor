import { TranslationFileSelectorProps } from '@components/translationFileSelector/TranslationFileSelector';
import { SelectItem } from 'primereact/selectitem';
import { useState } from 'react';
import { DirectorySelectorEventHandler } from '@components/directorySelector/defines';
import { DropdownChangeParams } from 'primereact/dropdown';

export interface IUseTranslationFileSelectorParams extends TranslationFileSelectorProps {}

export interface IUseTranslationFileSelector {
  options: SelectItem[];
  disabled: boolean;
  opened: boolean;
  selectedFile: string | undefined;
  handleShow: DirectorySelectorEventHandler;
  handleHide: DirectorySelectorEventHandler;
  handleChange: DirectorySelectorEventHandler<DropdownChangeParams>;
}

function useTranslationFileSelector(params: IUseTranslationFileSelectorParams): IUseTranslationFileSelector {
  const { directoryPath, files } = params;

  const [opened, setOpened] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>();

  const handleShow = () => {
    setOpened(true);
  };

  const handleHide = () => {
    setOpened(false);
  };

  const handleChange: DirectorySelectorEventHandler<DropdownChangeParams> = (e) => {
    setSelectedFile(e?.value);
  };

  const options: SelectItem[] = files.map((file) => ({ label: file, value: file }));
  const disabled = !directoryPath;

  return {
    options,
    disabled,
    opened,
    selectedFile,
    handleShow,
    handleHide,
    handleChange,
  };
}

export default useTranslationFileSelector;
