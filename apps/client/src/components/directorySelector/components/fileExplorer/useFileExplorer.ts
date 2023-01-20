import { FileExplorerProps } from '@components/directorySelector/components/fileExplorer';
import { MenuItem } from 'primereact/menuitem';
import { MoveDirection, PathChangeEvent } from '@components/directorySelector/defines';
import { ChangeEventHandler, MouseEventHandler, RefObject, useEffect, useState } from 'react';
import useQueryGetDirectory from '@hooks/queries/useQueryGetDirectory';
import { DirectoryEntry } from 'i18n-editor-common';
import { useToastContext } from '@contexts/toastContext';
import { SelectButtonChangeParams } from 'primereact/selectbutton';
import { confirmDialog } from 'primereact/confirmdialog';
import { OverlayPanel } from 'primereact/overlaypanel';
import { CustomEventHandler } from '@defines/event';

export interface IUseFileExplorerParams extends FileExplorerProps {
  ref: RefObject<OverlayPanel>;
}

export interface IUseFileExplorer {
  breadcrumbItems: MenuItem[];
  entries: DirectoryEntry[];
  backwardStack: string[];
  forwardStack: string[];
  filterKeyword: string;
  filterPlaceholder: string;
  handleMovePathButtonClick: CustomEventHandler<SelectButtonChangeParams>;
  handleSelectButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleFilterKeywordChange: ChangeEventHandler<HTMLInputElement>;
  onEntryClick: CustomEventHandler<DirectoryEntry>;
}

function useFileExplorer(params: IUseFileExplorerParams): IUseFileExplorer {
  const { ref, path: initialPath, onChange, onHide, opened } = params;

  const [path, setPath] = useState(initialPath);

  const [backwardStack, setBackwardStack] = useState<string[]>([]);
  const [forwardStack, setForwardStack] = useState<string[]>([]);

  const [filterKeyword, setFilterKeyword] = useState<string>('');
  const filterPlaceholder = `${path.split('/').pop()} 검색`;

  const [entries, setEntries] = useState<DirectoryEntry[]>([]);

  const { toastRef } = useToastContext();

  // 현재 폴더
  const { data, refetch: refetchGetDirectory } = useQueryGetDirectory({ req: { path } });
  const { path: currentPath, entries: allEntries } = data?.data || { path: '', entries: undefined };

  /**
   * 앞으로 이동
   * @param path 새 경로 혹은 새 경로를 반환하는 함수
   * @param clearForwardStack forwardStack clear 여부
   */
  const changePathForward = (path: string | ((prevPath: string) => string), clearForwardStack?: boolean) => {
    setPath((prev) => {
      setBackwardStack((stack) => [...stack, prev]);

      if (clearForwardStack) {
        setForwardStack([]);
      } else {
        setForwardStack((stack) => stack.slice(0, stack.length - 1));
      }

      return typeof path === 'function' ? path(prev) : path;
    });
  };

  /**
   * 뒤로 이동
   * @param path
   */
  const changePathBackward = (path: string | ((prevPath: string) => string)) => {
    setPath((prev) => {
      setForwardStack((stack) => [...stack, prev]);
      setBackwardStack((stack) => stack.slice(0, stack.length - 1));

      return typeof path === 'function' ? path(prev) : path;
    });
  };

  const onPathChange: CustomEventHandler<PathChangeEvent> = (e) => {
    if (!e) return;

    const { path } = e;
    changePathForward(path, true);
  };

  const handleMovePathButtonClick: CustomEventHandler<SelectButtonChangeParams> = (e) => {
    if (!e) return;

    const value = e.value as MoveDirection;
    switch (value) {
      case 'forward':
        changePathForward(forwardStack[forwardStack.length - 1]);
        break;

      case 'backward':
        changePathBackward(backwardStack[backwardStack.length - 1]);
        break;
    }
  };

  const handleSelectButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    ref.current?.hide();
    onChange({ path });
  };

  const handleFilterKeywordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterKeyword(e.target.value);
  };

  const onEntryClick: CustomEventHandler<DirectoryEntry> = (entry) => {
    if (!entry) return;
    const { name, type } = entry;

    if (type !== 'directory') {
      return toastRef.current?.show({
        severity: 'warn',
        detail: '폴더만 선택할 수 있어요',
        life: 3000,
      });
    }

    changePathForward((path) => `${path}/${name}`, true);
  };

  useEffect(() => {
    history.pushState(null, '', '/');
    return () => {
      history.back();
    };
  }, []);

  useEffect(() => {
    if (!path) {
      setPath(currentPath);
    }
  }, [currentPath]);

  useEffect(() => {
    refetchGetDirectory();
    setFilterKeyword('');
  }, [path]);

  useEffect(() => {
    if (!allEntries) return;
    setEntries(allEntries.filter(({ name }) => name.toLowerCase().includes(filterKeyword.toLowerCase())));
  }, [allEntries, filterKeyword]);

  useEffect(() => {
    const preventPopState = () => {
      if (!opened) {
        return history.back();
      }

      history.pushState(null, '', '/');

      confirmDialog({
        header: '페이지에서 나가시겠어요?',
        message: '저장하지 않은 변경사항은 폐기됩니다',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        draggable: false,
        accept() {
          history.go(-2);
          onHide();
        },
      });
    };

    window.addEventListener('popstate', preventPopState);
    return () => {
      window.removeEventListener('popstate', preventPopState);
    };
  }, [opened, onHide]);

  const breadcrumbItemLabels: string[] = path.split('/');
  const breadcrumbItems: MenuItem[] = breadcrumbItemLabels.map((label, i) => ({
    id: i.toString(),
    label,
    command(e) {
      const {
        item: { id },
      } = e;
      onPathChange({ path: breadcrumbItemLabels.slice(0, Number(id) + 1).join('/') });
    },
  }));

  return {
    breadcrumbItems,
    entries,
    backwardStack,
    forwardStack,
    filterKeyword,
    filterPlaceholder,
    handleMovePathButtonClick,
    handleSelectButtonClick,
    handleFilterKeywordChange,
    onEntryClick,
  };
}

export default useFileExplorer;
