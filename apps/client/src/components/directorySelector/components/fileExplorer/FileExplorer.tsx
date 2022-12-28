import { OverlayPanel } from 'primereact/overlaypanel';
import { forwardRef } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';
import { PrimeIcons } from 'primereact/api';
import useFileExplorer from '@components/directorySelector/components/fileExplorer/useFileExplorer';
import { Entry } from '@components/directorySelector/components/fileExplorer/components/entry';

export interface FileExplorerProps {}

export const FileExplorer = forwardRef<OverlayPanel, FileExplorerProps>((props, ref) => {
  const {} = props;

  const home: MenuItem = {
    icon: PrimeIcons.USER,
  };

  const { breadcrumbItems, entries } = useFileExplorer(props);

  return (
    <>
      <OverlayPanel ref={ref} className={'file-explorer'}>
        <BreadCrumb home={home} model={breadcrumbItems} />

        {/*<div className={'tree-container'}>*/}
        {/*  <Tree*/}
        {/*    className={'tree'}*/}
        {/*    selectionMode={'single'}*/}
        {/*    onExpand={handleTreeExpand}*/}
        {/*    onCollapse={handleTreeCollapse}*/}
        {/*    onSelect={handleTreeSelect}*/}
        {/*    onUnselect={handleTreeUnselect}*/}
        {/*    value={tree.children}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className={'entries-container'}>
          {entries.map((entry) => (
            <Entry key={entry.name} entry={entry} />
          ))}
        </div>
      </OverlayPanel>

      <style jsx>{`
        :global(.file-explorer) {
          width: 952px;
        }
        //.tree-container {
        //  max-height: 500px;
        //  overflow: auto;
        //}
        //
        //:global(.tree) {
        //  border: none;
        //}
        .entries-container {
          display: flex;
          flex-wrap: wrap;
          margin-top: 28px;
          padding: 28px 0;
          gap: 16px;
        }
      `}</style>
    </>
  );
});
