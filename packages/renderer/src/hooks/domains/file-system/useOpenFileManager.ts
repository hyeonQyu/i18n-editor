import { useElectronAPI } from '@/hooks/common';

export const useOpenFileManager = () => {
  const electronAPI = useElectronAPI();

  return (path: string) => electronAPI.fileSystem.fileManager.open({ path });
};
