import { OverlayPanel } from 'primereact/overlaypanel';
import { forwardRef } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';
import { PrimeIcons } from 'primereact/api';
import useFileExplorer from '@components/directorySelector/components/fileExplorer/useFileExplorer';
import { Tree } from 'primereact/tree';

export interface FileExplorerProps {}

export const FileExplorer = forwardRef<OverlayPanel, FileExplorerProps>((props, ref) => {
  const {} = props;

  const home: MenuItem = {
    icon: PrimeIcons.USER,
  };

  const { breadcrumbItems, tree, handleTreeExpand, handleTreeCollapse, handleTreeSelect, handleTreeUnselect } = useFileExplorer(props);

  return (
    <>
      <OverlayPanel ref={ref}>
        <BreadCrumb home={home} model={breadcrumbItems} />

        <div className={'tree-container'}>
          <Tree
            className={'tree'}
            selectionMode={'single'}
            onExpand={handleTreeExpand}
            onCollapse={handleTreeCollapse}
            onSelect={handleTreeSelect}
            onUnselect={handleTreeUnselect}
            value={tree.children}
          />
        </div>
      </OverlayPanel>

      <style jsx>{`
        .tree-container {
          max-height: 500px;
          overflow: auto;
        }

        :global(.tree) {
          border: none;
        }
      `}</style>
    </>
  );
});
