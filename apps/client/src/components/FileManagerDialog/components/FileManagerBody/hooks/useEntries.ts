import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';
import useDirectoryEntries from '@hooks/file-system/useDirectoryEntries';
import { FileEntry } from 'i18n-editor-common';
import { throttle } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

function useEntries() {
  const path = useFileManagerDialogStore((state) => state.path) ?? '';
  const keyword = useFileManagerDialogStore((state) => state.searchKeyword);
  const directoryOnly = useFileManagerDialogStore((state) => state.directoryOnly);

  const filterDirectories = useCallback(
    (entries: FileEntry[]) => {
      if (!directoryOnly) return entries;
      return entries.filter((entry) => entry.type === 'directory');
    },
    [directoryOnly],
  );

  const allEntries = useDirectoryEntries(path);
  const entries = useMemo(() => filterDirectories(allEntries), [allEntries, filterDirectories]);

  const [filteredEntries, setFilteredEntries] = useState(entries);

  const throttleFilterEntries = useMemo(
    () =>
      throttle((_entries: FileEntry[], _keyword: string) => {
        setFilteredEntries(
          _entries.filter((entry) => {
            return entry.name.toLowerCase().includes(_keyword.toLowerCase());
          }),
        );
      }, 400),
    [],
  );

  useEffect(() => {
    setFilteredEntries(entries);
  }, [entries]);

  useEffect(() => {
    throttleFilterEntries(entries, keyword);
  }, [throttleFilterEntries, entries, keyword]);

  useEffect(() => {
    return () => throttleFilterEntries.cancel();
  }, [throttleFilterEntries]);

  return filteredEntries;
}

export default useEntries;
