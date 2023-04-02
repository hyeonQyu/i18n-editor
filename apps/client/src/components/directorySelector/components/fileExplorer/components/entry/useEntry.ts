import { EntryProps } from '@components/directorySelector/components/fileExplorer/components/entry/Entry';
import useFileExplorerPathChange from '@components/directorySelector/components/fileExplorer/hooks/useFileExplorerPathChange';
import { useToastContext } from '@contexts/toastContext';
import { MouseEventHandler } from 'react';

export interface UseEntryParams extends EntryProps {}

export interface UseEntry {
  handleClick: MouseEventHandler;
}

export default function useEntry(params: UseEntryParams): UseEntry {
  const {
    entry: { name, type },
  } = params;

  const { toastRef } = useToastContext();

  const { changePathForward } = useFileExplorerPathChange();

  const handleClick: MouseEventHandler = () => {
    if (type !== 'directory') {
      return toastRef.current?.show({
        severity: 'warn',
        detail: '폴더만 선택할 수 있어요',
        life: 3000,
      });
    }

    changePathForward((path) => `${path}/${name}`, true);
  };

  return {
    handleClick,
  };
}
