import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import useCheckMetaKey from '@hooks/useCheckMetaKey';
import useKeyboardEventListener from '@hooks/useKeyboardEventListener';
import { useCallback } from 'react';

function useFileManagerSearchShortcuts() {
  const searchMode = useFileManagerStore(({ searchMode }) => searchMode);
  const startSearch = useFileManagerStore(({ startSearch }) => startSearch);
  const finishSearch = useFileManagerStore(({ finishSearch }) => finishSearch);

  const checkMetaKey = useCheckMetaKey();

  const handleStartByShortcut = useCallback(
    (e: KeyboardEvent) => {
      if (searchMode) return;

      const openSearch = () => {
        e.preventDefault();
        e.stopPropagation();
        startSearch();
      };

      if (checkMetaKey(e) && e.key === 'f') {
        openSearch();
      }
    },
    [searchMode, startSearch, checkMetaKey],
  );

  const handleFinishByShortcut = useCallback(
    (e: KeyboardEvent) => {
      if (!searchMode) return;

      if (e.key === 'Escape') {
        finishSearch();
        e.stopPropagation();
      }
    },
    [searchMode, finishSearch],
  );

  useKeyboardEventListener(
    useCallback(
      (e) => {
        handleFinishByShortcut(e);
        handleStartByShortcut(e);
      },
      [handleFinishByShortcut, handleStartByShortcut],
    ),
  );
}

export default useFileManagerSearchShortcuts;
