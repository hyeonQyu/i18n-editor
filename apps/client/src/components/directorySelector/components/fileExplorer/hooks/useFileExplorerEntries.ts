import useQueryGetDirectory from '@hooks/queries/useQueryGetDirectory';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fileExplorerStates } from '@components/directorySelector/components/fileExplorer/stores/store';
import { localeDirectoryPathState } from '@stores/store';
import { useMemo } from 'react';
import { DirectoryEntry } from 'i18n-editor-common';

export interface UseFileExplorerEntries {
  entries: DirectoryEntry[];
}

export default function useFileExplorerEntries(): UseFileExplorerEntries {
  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const [path, setPath] = useRecoilState(fileExplorerStates.path);
  const filterKeyword = useRecoilValue(fileExplorerStates.filterKeyword);

  // 현재 폴더 내 목록 조회
  const { data } = useQueryGetDirectory({
    req: { path },
    queryOption: {
      enabled: localeDirectoryPath !== undefined,
      onSuccess({ data }) {
        if (!data) return;
        if (!path) {
          setPath(data.path);
        }
      },
    },
  });

  const { entries: allEntries } = data?.data || { entries: [] };
  const entries = useMemo(
    () => allEntries.filter(({ name }) => name.toLowerCase().includes(filterKeyword.toLowerCase())) ?? [],
    [allEntries, filterKeyword],
  );

  return {
    entries,
  };
}
