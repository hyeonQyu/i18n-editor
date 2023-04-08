import { useRecoilState, useSetRecoilState } from 'recoil';
import { fileExplorerStates } from '@components/directorySelector/components/fileExplorer/stores/store';
import { useCallback } from 'react';

export interface UseFileExplorerPathChange {
  changePathForward: (path: string | ((prevPath: string) => string), clearForwardStack?: boolean) => void;
  changePathBackward: (path: string | ((prevPath: string) => string)) => void;
}

export default function useFileExplorerPathChange(): UseFileExplorerPathChange {
  const [prevPath, setPath] = useRecoilState(fileExplorerStates.path);

  const setForwardStack = useSetRecoilState(fileExplorerStates.forwardStack);
  const setBackwardStack = useSetRecoilState(fileExplorerStates.backwardStack);

  /**
   * 앞으로 이동
   * @param path 새 경로 혹은 새 경로를 반환하는 함수
   * @param clearForwardStack forwardStack clear 여부
   */
  const changePathForward = useCallback(
    (path: string | ((prevPath: string) => string), clearForwardStack?: boolean) => {
      setPath(typeof path === 'function' ? path(prevPath) : path);
      setBackwardStack((stack) => [...stack, prevPath]);
      if (clearForwardStack) {
        setForwardStack([]);
      } else {
        setForwardStack((stack) => stack.slice(0, stack.length - 1));
      }
    },
    [prevPath],
  );

  /**
   * 뒤로 이동
   * @param path
   */
  const changePathBackward = useCallback(
    (path: string | ((prevPath: string) => string)) => {
      setPath(typeof path === 'function' ? path(prevPath) : path);
      setForwardStack((stack) => [...stack, prevPath]);
      setBackwardStack((stack) => stack.slice(0, stack.length - 1));
    },
    [prevPath],
  );

  return {
    changePathForward,
    changePathBackward,
  };
}
