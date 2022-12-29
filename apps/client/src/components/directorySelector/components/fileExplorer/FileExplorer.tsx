import { OverlayPanel } from 'primereact/overlaypanel';
import { forwardRef } from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';
import { PrimeIcons } from 'primereact/api';
import useFileExplorer from '@components/directorySelector/components/fileExplorer/useFileExplorer';
import { Entry } from '@components/directorySelector/components/fileExplorer/components/entry';
import useViewOption from '@components/directorySelector/components/fileExplorer/hooks/useViewOption';
import { ViewOptionSelector } from '@components/directorySelector/components/fileExplorer/components/viewOptionSelector';
import classNames from 'classnames';

export interface FileExplorerProps {}

export const FileExplorer = forwardRef<OverlayPanel, FileExplorerProps>((props, ref) => {
  const {} = props;

  const home: MenuItem = {
    icon: PrimeIcons.USER,
  };

  const { breadcrumbItems, entries } = useFileExplorer(props);
  const { viewType, handleViewTypeChange } = useViewOption({});

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
          <div className={classNames('entries', viewType)}>
            {entries.map((entry) => (
              <Entry key={entry.name} entry={entry} viewType={viewType} />
            ))}
          </div>
        </div>

        <div className={'view-option-selector-container'}>
          <ViewOptionSelector value={viewType} onChange={handleViewTypeChange} />
        </div>
      </OverlayPanel>

      <style jsx>{`
        :global(.file-explorer) {
          width: 845px;
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
          height: 332px;
          overflow-y: scroll;
          margin: 28px 0;
        }
        .entries-container::-webkit-scrollbar {
          width: 8px;
        }
        .entries-container::-webkit-scrollbar-thumb {
          background-color: var(--surface-400);
          border-radius: 10px;
        }
        .entries-container::-webkit-scrollbar-track {
          background: none;
        }

        .entries.list {
          display: grid;
          grid-template-columns: 50% 50%;
          gap: 10px 8px;
        }

        .entries.table {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .view-option-selector-container {
          display: flex;
          justify-content: end;
        }
      `}</style>
    </>
  );
});
