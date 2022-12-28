import { OverlayPanel } from 'primereact/overlaypanel';
import { forwardRef } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';
import { PrimeIcons } from 'primereact/api';
import useFileExplorer from '@components/directorySelector/components/fileExplorer/useFileExplorer';
import { Tree } from 'primereact/tree';
import { Button } from 'primereact/button';
import { ICON_BY_DIRECTORY_ENTRY_TYPE } from '@components/directorySelector/defines/constants';
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
      <OverlayPanel ref={ref}>
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
        {entries.map((entry) => (
          <Entry key={entry.name} entry={entry} />
          // <Button key={name} label={name} className={'p-button-text p-button-secondary'} icon={ICON_BY_DIRECTORY_ENTRY_TYPE[type]} />
        ))}
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
