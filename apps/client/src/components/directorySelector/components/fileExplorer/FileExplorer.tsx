import { OverlayPanel } from 'primereact/overlaypanel';
import { forwardRef } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';
import { PrimeIcons } from 'primereact/api';
import useFileExplorer from '@components/directorySelector/components/fileExplorer/useFileExplorer';

export interface FileExplorerProps {
  path?: string;
}

export const FileExplorer = forwardRef<OverlayPanel, FileExplorerProps>((props, ref) => {
  const {} = props;

  const home: MenuItem = {
    icon: PrimeIcons.USER,
  };

  const { breadcrumbItems } = useFileExplorer(props);

  return (
    <>
      <OverlayPanel ref={ref}>
        <BreadCrumb home={home} model={breadcrumbItems} />
      </OverlayPanel>

      <style jsx>{``}</style>
    </>
  );
});
