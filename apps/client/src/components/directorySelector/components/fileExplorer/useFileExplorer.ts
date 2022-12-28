import { FileExplorerProps } from '@components/directorySelector/components/fileExplorer';
import { MenuItem } from 'primereact/menuitem';
import { DirectorySelectorEventHandler, PathChangeEvent } from '@components/directorySelector/defines';
import { TreeEventNodeParams } from 'primereact/tree';
import { useEffect, useRef, useState } from 'react';
import TreeNode from 'primereact/treenode';
import useQueryGetDirectory from '@hooks/queries/useQueryGetDirectory';
import { ICON_BY_DIRECTORY_ENTRY_TYPE } from '@components/directorySelector/defines/constants';
import { TreeUtil } from '@utils/treeUtil';
import { DirectoryEntry } from 'i18n-editor-common';

export interface IUseFileExplorerParams extends FileExplorerProps {}

export interface IUseFileExplorer {
  breadcrumbItems: MenuItem[];
  entries: DirectoryEntry[];
  // tree: TreeNode;
  // handleTreeExpand: DirectorySelectorEventHandler<TreeEventNodeParams>;
  // handleTreeCollapse: DirectorySelectorEventHandler<TreeEventNodeParams>;
  // handleTreeSelect: DirectorySelectorEventHandler<TreeEventNodeParams>;
  // handleTreeUnselect: DirectorySelectorEventHandler<TreeEventNodeParams>;
}

function useFileExplorer(params: IUseFileExplorerParams): IUseFileExplorer {
  // const [tree, setTree] = useState<TreeNode>({ key: '/' });
  const [path, setPath] = useState('');
  // const [selectedTreeNode, setSelectedTreeNode] = useState<TreeNode>(tree);
  const rootPathRef = useRef('');

  // 좌측 트리
  // const { data: treeData } = useQueryGetDirectory({
  //   req: { path: selectedTreeNode.key as string },
  //   queryOption: { refetchOnWindowFocus: false },
  // });
  // const { entries: treeEntries } = treeData?.data || { path: '', entries: [] };

  // 현재 폴더
  const { data, refetch: refetchGetDirectory } = useQueryGetDirectory({ req: { path } });
  const { path: currentPath, entries } = data?.data || { path: '', entries: [] };

  useEffect(() => {
    if (!path) {
      setPath(currentPath);
      rootPathRef.current = currentPath.split('/')[0];
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

  const onPathChange: DirectorySelectorEventHandler<PathChangeEvent> = (e) => {
    if (!e) return;
    setPath(() => e.path);
  };

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
    // handleTreeExpand,
    // handleTreeCollapse,
    // handleTreeSelect,
    // handleTreeUnselect,
  };
}

export default useFileExplorer;
