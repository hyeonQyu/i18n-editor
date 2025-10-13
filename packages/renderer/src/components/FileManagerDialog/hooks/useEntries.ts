import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';
import { useDirectoryEntries } from '@/hooks/domains/file-system';
import { FileEntry, TIME_UNIT } from '@i18n-editor/shared';
import { throttle } from 'lodash-es';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useEntries = () => {
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
      }, TIME_UNIT.unitOfMs.asSecond * 0.4),
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
};
