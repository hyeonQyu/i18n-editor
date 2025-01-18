import { useFileManagerDialogStore } from '@components/FileManagerDialog/stores';
import useCheckMetaKey from '@hooks/useCheckMetaKey';
import useKeyboardEventListener from '@hooks/useKeyboardEventListener';
import { useCallback } from 'react';

function useFileManagerSearchShortcuts() {
  const searchMode = useFileManagerDialogStore(({ searchMode }) => searchMode);
  const startSearch = useFileManagerDialogStore(({ startSearch }) => startSearch);
  const finishSearch = useFileManagerDialogStore(({ finishSearch }) => finishSearch);

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
