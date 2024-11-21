import { QUERY_KEY } from '@defines/reactQuery';
import { useAPI } from '@providers/APIProvider';
import { useQuery } from '@tanstack/react-query';
import { FileEntry, GetFileSystemDirectoryRequest } from 'i18n-editor-common';

const DEFAULT_ENTRIES: FileEntry[] = [];

function useDirectoryEntries(path: string): FileEntry[] {
  const api = useAPI();

  const req: GetFileSystemDirectoryRequest = { path };

  const { data: { data: { entries } = { entries: DEFAULT_ENTRIES } } = {} } = useQuery({
    queryKey: QUERY_KEY.fileSystem.getDirectory(req),
    queryFn: async () => (await api.fileSystem.getFileSystemDirectory(req)).data,
    enabled: Boolean(path),
  });

  return entries;
}

export default useDirectoryEntries;
