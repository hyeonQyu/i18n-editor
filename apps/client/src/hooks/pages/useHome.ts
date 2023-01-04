import { useState } from 'react';
import { DirectorySelectorEventHandler, PathChangeEvent } from '@components/directorySelector/defines';

export interface IUseHomeParams {}

export interface IUseHome {
  directoryPath: string;
  handleDirectoryPathChange: DirectorySelectorEventHandler<PathChangeEvent>;
}

function useHome(params: IUseHomeParams): IUseHome {
  const {} = params;

  const [directoryPath, setDirectoryPath] = useState('');

  const handleDirectoryPathChange: DirectorySelectorEventHandler<PathChangeEvent> = (e) => {
    if (!e) return;
    setDirectoryPath(e.path);
  };

  return {
    directoryPath,
    handleDirectoryPathChange,
  };
}

export default useHome;
