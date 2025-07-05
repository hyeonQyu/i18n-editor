import { useElectronAPI } from '@/hooks/common/useElectronAPI';
import { DirectoryReadRequest } from '@i18n-editor/shared';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../constants/reactQuery.query.constants';

export const useDirectoryEntries = (path: string) => {
  const electronAPI = useElectronAPI();

  const request: DirectoryReadRequest = { path };

  return useQuery({
    queryKey: QUERY_KEY.fileSystem.directory.read(request),
    queryFn: () => electronAPI.fileSystem.directory.read(request),
    enabled: Boolean(path),
    placeholderData: keepPreviousData,
  });
};
