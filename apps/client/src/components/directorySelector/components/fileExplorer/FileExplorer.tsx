import { OverlayPanel } from 'primereact/overlaypanel';
import { forwardRef } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';
import { PrimeIcons } from 'primereact/api';
import useFileExplorer from '@components/directorySelector/components/fileExplorer/useFileExplorer';
import { DirectorySelectorEventHandler } from '@components/directorySelector/defines';
import { Tree, TreeEventNodeParams } from 'primereact/tree';

export interface FileExplorerProps {}

export const FileExplorer = forwardRef<OverlayPanel, FileExplorerProps>((props, ref) => {
  const {} = props;

  const home: MenuItem = {
    icon: PrimeIcons.USER,
  };

  const { breadcrumbItems, tree } = useFileExplorer(props);

  const handleTreeExpand: DirectorySelectorEventHandler<TreeEventNodeParams> = (e) => {
    if (!e) return;
  };

  return (
    <>
      <OverlayPanel ref={ref}>
        <BreadCrumb home={home} model={breadcrumbItems} />
        <Tree onExpand={handleTreeExpand} value={tree.children} />
      </OverlayPanel>

      <style jsx>{``}</style>
    </>
  );
});
