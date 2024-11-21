import { useFileManagerStore } from '@components/DirectorySelector/stores/fileManagerStore';
import useKeyboardEventListener from '@hooks/useKeyboardEventListener';
import useOS from '@hooks/useOS';
import { useCallback } from 'react';

function useFileManagerSearchShortcuts() {
  const searchMode = useFileManagerStore(({ searchMode }) => searchMode);
  const startSearch = useFileManagerStore(({ startSearch }) => startSearch);
  const finishSearch = useFileManagerStore(({ finishSearch }) => finishSearch);

  const os = useOS();

  const handleStartByShortcut = useCallback(
    (e: KeyboardEvent) => {
      if (searchMode) return;

      const openSearch = () => {
        e.preventDefault();
        e.stopPropagation();
        startSearch();
      };

      switch (os) {
        case 'macos':
          if (e.metaKey && e.key === 'f') {
            openSearch();
            return;
          }
          return;

        case 'win':
        case 'linux':
          if (e.ctrlKey && e.key === 'f') {
            openSearch();
            return;
          }
          return;

        default:
          return;
      }
    },
    [searchMode, os, startSearch],
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
