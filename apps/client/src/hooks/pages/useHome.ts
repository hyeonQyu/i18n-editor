import { useState } from 'react';
import { DirectorySelectorEventHandler, PathChangeEvent } from '@components/directorySelector/defines';
import useQueryGetTranslationFile from '@hooks/queries/useQueryGetTranslationFile';
import { DropdownChangeParams } from 'primereact/dropdown';

export interface IUseHomeParams {}

export interface IUseHome {
  directoryPath: string;
  translationFiles: string[];
  translationFile: string | undefined;
  hasDirectorySelectorError: boolean;
  handleDirectoryPathChange: DirectorySelectorEventHandler<PathChangeEvent>;
  handleTranslationFileChange: DirectorySelectorEventHandler<DropdownChangeParams>;
}

function useHome(params: IUseHomeParams): IUseHome {
  const {} = params;

  const [directoryPath, setDirectoryPath] = useState('');
  const [translationFile, setTranslationFile] = useState<string>();

  const { data, error: errorGetTranslationFile } = useQueryGetTranslationFile({
    req: { path: directoryPath },
    queryOption: {
      enabled: Boolean(directoryPath),
      retry: false,
    },
  });

  const translationFiles: string[] = data?.data?.files ?? [];
  const hasDirectorySelectorError = Boolean(errorGetTranslationFile);

  const handleDirectoryPathChange: DirectorySelectorEventHandler<PathChangeEvent> = (e) => {
    if (!e) return;
    setDirectoryPath(e.path);
  };

  const handleTranslationFileChange: DirectorySelectorEventHandler<DropdownChangeParams> = (e) => {
    setTranslationFile(e?.value);
  };

  return {
    directoryPath,
    translationFiles,
    translationFile,
    hasDirectorySelectorError,
    handleDirectoryPathChange,
    handleTranslationFileChange,
  };
}

export default useHome;
