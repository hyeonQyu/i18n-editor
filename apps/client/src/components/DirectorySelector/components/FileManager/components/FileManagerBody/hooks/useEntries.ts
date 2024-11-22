import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import useDirectoryEntries from '@hooks/file-system/useDirectoryEntries';
import { FileEntry } from 'i18n-editor-common';
import { throttle } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

function useEntries() {
  const path = useFileManagerStore(({ path }) => path) ?? '';
  const keyword = useFileManagerStore(({ searchKeyword }) => searchKeyword);

  const entries = useDirectoryEntries(path);

  const [filteredEntries, setFilteredEntries] = useState(entries);

  const throttleFilterEntries = useMemo(
    () =>
      throttle((entries: FileEntry[], keyword: string) => {
        setFilteredEntries(entries.filter((entry) => entry.name.toLowerCase().includes(keyword.toLowerCase())));
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
