import { FileExplorerProps } from '@components/directorySelector/components/fileExplorer';
import { MenuItem } from 'primereact/menuitem';

export interface IUseFileExplorerParams extends FileExplorerProps {}

export interface IUseFileExplorer {
  breadcrumbItems: MenuItem[];
}

function useFileExplorer(params: IUseFileExplorerParams): IUseFileExplorer {
  const { path = '' } = params;

  const breadcrumbItems: MenuItem[] = path.split('/').map((label, i) => ({
    id: i.toString(),
    label,
  }));

  return {
    breadcrumbItems,
  };
}

export default useFileExplorer;
