import { useElectronAPI } from '@/hooks/common/useElectronAPI';

export const useOpenFileManager = () => {
  const electronAPI = useElectronAPI();

  return (path: string) => electronAPI.fileSystem.fileManager.open({ path });
};
