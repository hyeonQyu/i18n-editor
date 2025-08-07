import { QUERY_KEY } from '@/constants/reactQuery.query.constants';
import { useElectronAPI } from '@/hooks/common';
import { DirectoryReadRequest, FileEntry } from '@i18n-editor/shared';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const DEFAULT_ENTRIES: FileEntry[] = [];

export const useDirectoryEntries = (path: string) => {
  const electronAPI = useElectronAPI();

  const request: DirectoryReadRequest = { path };

  const { data: { entries = DEFAULT_ENTRIES } = {} } = useQuery({
    queryKey: QUERY_KEY.fileSystem.directory.read(request),
    queryFn: () => electronAPI.fileSystem.directory.read(request),
    enabled: Boolean(path),
    placeholderData: keepPreviousData,
  });

  return entries;
};
