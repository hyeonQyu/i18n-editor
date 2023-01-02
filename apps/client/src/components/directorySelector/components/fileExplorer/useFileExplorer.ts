import { FileExplorerProps } from '@components/directorySelector/components/fileExplorer';
import { MenuItem } from 'primereact/menuitem';
import { DirectorySelectorEventHandler, MoveDirection, PathChangeEvent } from '@components/directorySelector/defines';
import { TreeEventNodeParams } from 'primereact/tree';
import { RefObject, useEffect, useRef, useState } from 'react';
import TreeNode from 'primereact/treenode';
import useQueryGetDirectory from '@hooks/queries/useQueryGetDirectory';
import { TreeUtil } from '@utils/treeUtil';
import { DirectoryEntry } from 'i18n-editor-common';
import { useToastContext } from '@contexts/toastContext';
import { SelectButtonChangeParams } from 'primereact/selectbutton';
import { confirmDialog } from 'primereact/confirmdialog';

export interface IUseFileExplorerParams extends FileExplorerProps {}

export interface IUseFileExplorer {
  breadcrumbItems: MenuItem[];
  entries: DirectoryEntry[];
  // tree: TreeNode;
  backwardStack: string[];
  forwardStack: string[];
  handleShow: DirectorySelectorEventHandler<undefined>;
  handleHide: DirectorySelectorEventHandler<undefined>;
  // handleTreeExpand: DirectorySelectorEventHandler<TreeEventNodeParams>;
  // handleTreeCollapse: DirectorySelectorEventHandler<TreeEventNodeParams>;
  // handleTreeSelect: DirectorySelectorEventHandler<TreeEventNodeParams>;
  // handleTreeUnselect: DirectorySelectorEventHandler<TreeEventNodeParams>;
  handleMovePathButtonClick: DirectorySelectorEventHandler<SelectButtonChangeParams>;
  onEntryClick: DirectorySelectorEventHandler<DirectoryEntry>;
}

function useFileExplorer(params: IUseFileExplorerParams): IUseFileExplorer {
  // const [tree, setTree] = useState<TreeNode>({ key: '/' });
  const [path, setPath] = useState('');

  const [backwardStack, setBackwardStack] = useState<string[]>([]);
  const [forwardStack, setForwardStack] = useState<string[]>([]);

  const [opened, setOpened] = useState(false);

  // const [selectedTreeNode, setSelectedTreeNode] = useState<TreeNode>(tree);
  // const rootPathRef = useRef('');

  const { toastRef } = useToastContext();

  // 좌측 트리
  // const { data: treeData } = useQueryGetDirectory({
  //   req: { path: selectedTreeNode.key as string },
  //   queryOption: { refetchOnWindowFocus: false },
  // });
  // const { entries: treeEntries } = treeData?.data || { path: '', entries: [] };

  // 현재 폴더
  const { data, refetch: refetchGetDirectory } = useQueryGetDirectory({ req: { path } });
  const { path: currentPath, entries } = data?.data || { path: '', entries: [] };

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

  const onPathChange: DirectorySelectorEventHandler<PathChangeEvent> = (e) => {
    if (!e) return;

    const { path } = e;
    changePathForward(path, true);
  };

  const handleShow: DirectorySelectorEventHandler<undefined> = () => {
    setOpened(true);
  };

  const handleHide: DirectorySelectorEventHandler<undefined> = () => {
    setOpened(false);
  };

  const handleMovePathButtonClick: DirectorySelectorEventHandler<SelectButtonChangeParams> = (e) => {
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

  const onEntryClick: DirectorySelectorEventHandler<DirectoryEntry> = (entry) => {
    if (!entry) return;
    const { name, type } = entry;

    if (type !== 'directory') {
      return toastRef.current?.show({
        severity: 'warn',
        detail: '폴더만 선택할 수 있어요.',
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
      // rootPathRef.current = currentPath.split('/')[0];
    }
  }, [currentPath]);

  // useEffect(() => {
  //   if (treeEntries.length === 0) return;
  //
  //   setTree((tree) => {
  //     return TreeUtil.searchTreeNodeAndChange(tree, selectedTreeNode.key as string, (node) => {
  //       const subPath = node.key === '/' ? '' : node.key;
  //
  //       return {
  //         ...node,
  //         children: treeEntries.map(({ name, type }) => {
  //           return {
  //             key: `${subPath}/${name}`,
  //             label: name,
  //             icon: `${ICON_BY_DIRECTORY_ENTRY_TYPE[type]} pi-fw`,
  //             children: type === 'directory' ? [{ key: `${name}_temp` }] : undefined,
  //           };
  //         }),
  //       };
  //     });
  //   });
  // }, [selectedTreeNode.key, treeEntries]);

  useEffect(() => {
    refetchGetDirectory();
  }, [path]);

  useEffect(() => {
    const preventPopState = () => {
      if (!opened) {
        history.back();
        return;
      }

      history.pushState(null, '', '/');

      confirmDialog({
        header: '페이지에서 나가시겠어요?',
        message: '저장하지 않은 변경사항은 폐기됩니다',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        accept() {
          history.go(-2);
          setOpened(false);
        },
      });
    };

    window.addEventListener('popstate', preventPopState);
    return () => {
      window.removeEventListener('popstate', preventPopState);
    };
  }, [opened]);

  // const handleTreeExpand: DirectorySelectorEventHandler<TreeEventNodeParams> = (e) => {
  //   if (!e) return;
  //   const { node } = e;
  //   setSelectedTreeNode(node);
  // };
  //
  // const handleTreeCollapse: DirectorySelectorEventHandler<TreeEventNodeParams> = (e) => {};
  //
  // const handleTreeSelect: DirectorySelectorEventHandler<TreeEventNodeParams> = (e) => {
  //   if (!e) return;
  //   const { node } = e;
  //   const path = (node.key as string).replace('/', `${rootPathRef.current}/`);
  //
  //   // 파일 선택
  //   if (!node.children) {
  //     const tmp = path.split('/');
  //     setPath(tmp.slice(0, tmp.length - 1).join('/'));
  //     return;
  //   }
  //
  //   // 폴더 선택
  //   setPath(path);
  //   setSelectedTreeNode(node);
  // };
  //
  // const handleTreeUnselect: DirectorySelectorEventHandler<TreeEventNodeParams> = (e) => {
  //   if (!e) return;
  //   const { node } = e;
  // };

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
    // tree,
    backwardStack,
    forwardStack,
    handleShow,
    handleHide,
    // handleTreeExpand,
    // handleTreeCollapse,
    // handleTreeSelect,
    // handleTreeUnselect,
    handleMovePathButtonClick,
    onEntryClick,
  };
}

export default useFileExplorer;
