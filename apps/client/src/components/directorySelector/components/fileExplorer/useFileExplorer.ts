import { FileExplorerProps } from '@components/directorySelector/components/fileExplorer';
import { MenuItem } from 'primereact/menuitem';
import { DirectorySelectorEventHandler, PathChangeEvent } from '@components/directorySelector/defines';
import { TreeEventNodeParams } from 'primereact/tree';
import { useEffect, useState } from 'react';
import TreeNode from 'primereact/treenode';
import useQueryGetDirectory from '@hooks/queries/useQueryGetDirectory';
import { ICON_BY_DIRECTORY_ENTRY_TYPE } from '@components/directorySelector/defines/constants';

export interface IUseFileExplorerParams extends FileExplorerProps {}

export interface IUseFileExplorer {
  breadcrumbItems: MenuItem[];
  tree: TreeNode;
}

function useFileExplorer(params: IUseFileExplorerParams): IUseFileExplorer {
  const [tree, setTree] = useState<TreeNode>({});
  const [path, setPath] = useState('');
  const [flagFetchGetDirectory, setFlagFetchGetDirectory] = useState(false);

  // 좌측 트리
  const { data: rootData } = useQueryGetDirectory({
    req: { path: '/' },
    queryOption: { refetchOnWindowFocus: false },
  });
  const { entries: rootEntries } = rootData?.data || { path: '', entries: [] };

  // 현재 폴더
  const { data, refetch: refetchGetDirectory } = useQueryGetDirectory({ req: { path } });
  const { path: currentPath, entries } = data?.data || { path: '', entries: [] };

  useEffect(() => {
    if (rootEntries.length === 0) return;

    setTree({
      children: rootEntries.map(({ name, type }) => {
        return {
          key: name,
          label: name,
          icon: ICON_BY_DIRECTORY_ENTRY_TYPE[type],
          children: type === 'directory' ? [{ key: `${name}_temp` }] : undefined,
        };
      }),
    });
  }, [rootEntries]);

  useEffect(() => {
    setPath(currentPath);
  }, [currentPath]);

  useEffect(() => {
    refetchGetDirectory();
  }, [flagFetchGetDirectory]);

  const onPathChange: DirectorySelectorEventHandler<PathChangeEvent> = (e) => {
    if (!e) return;

    setFlagFetchGetDirectory((prev) => {
      setPath(() => e.path);
      return !prev;
    });
  };

  const handleTreeExpand: DirectorySelectorEventHandler<TreeEventNodeParams> = (e) => {
    if (!e) return;
    const path = e.node.key;
  };

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
    tree,
  };
}

export default useFileExplorer;
