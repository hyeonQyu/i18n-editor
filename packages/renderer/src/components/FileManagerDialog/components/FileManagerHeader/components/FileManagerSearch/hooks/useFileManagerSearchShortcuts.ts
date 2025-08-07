import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';
import { useKeyboardEventListener } from '@/hooks/common';
import { useCallback } from 'react';

export const useFileManagerSearchShortcuts = () => {
  const searchMode = useFileManagerDialogStore((state) => state.searchMode);
  const startSearch = useFileManagerDialogStore((state) => state.startSearch);
  const finishSearch = useFileManagerDialogStore((state) => state.finishSearch);

  const handleStartByShortcut = useCallback(
    (e: KeyboardEvent) => {
      if (searchMode) return;

      if (e.key.length === 1) {
        e.preventDefault();
        e.stopPropagation();
        startSearch(e.key);
      }
    },
    [searchMode, startSearch],
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
};
