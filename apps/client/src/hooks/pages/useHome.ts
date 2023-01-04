import { useState } from 'react';
import { DirectorySelectorEventHandler, PathChangeEvent } from '@components/directorySelector/defines';
import useQueryGetTranslationFile from '@hooks/queries/useQueryGetTranslationFile';

export interface IUseHomeParams {}

export interface IUseHome {
  directoryPath: string;
  translationFiles: string[];
  handleDirectoryPathChange: DirectorySelectorEventHandler<PathChangeEvent>;
}

function useHome(params: IUseHomeParams): IUseHome {
  const {} = params;

  const [directoryPath, setDirectoryPath] = useState('');

  const { data } = useQueryGetTranslationFile({
    req: { path: directoryPath },
    queryOption: {
      enabled: Boolean(directoryPath),
    },
  });

  const translationFiles: string[] = data?.data?.files ?? [];

  const handleDirectoryPathChange: DirectorySelectorEventHandler<PathChangeEvent> = (e) => {
    if (!e) return;
    setDirectoryPath(e.path);
  };

  return {
    directoryPath,
    translationFiles,
    handleDirectoryPathChange,
  };
}

export default useHome;
