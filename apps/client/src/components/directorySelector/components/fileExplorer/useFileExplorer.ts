import { FileExplorerProps } from '@components/directorySelector/components/fileExplorer';
import { MenuItem } from 'primereact/menuitem';

export interface IUseFileExplorerParams extends FileExplorerProps {}

export interface IUseFileExplorer {
  breadcrumbItems: MenuItem[];
}

function useFileExplorer(params: IUseFileExplorerParams): IUseFileExplorer {
  const { path = '', onPathChange } = params;

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
  };
}

export default useFileExplorer;
