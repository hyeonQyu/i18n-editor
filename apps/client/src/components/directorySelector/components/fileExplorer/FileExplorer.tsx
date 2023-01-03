import { OverlayPanel } from 'primereact/overlaypanel';
import { forwardRef, RefObject } from 'react';
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
import { MovePathButton } from '@components/directorySelector/components/fileExplorer/components/movePathButton';
import { Button } from 'primereact/button';
import { DirectorySelectorProps } from '@components/directorySelector';

export interface FileExplorerProps extends Pick<DirectorySelectorProps, 'path' | 'onChange'> {}

export const FileExplorer = forwardRef<OverlayPanel, FileExplorerProps>((props, ref) => {
  const {} = props;

  const home: MenuItem = {
    icon: PrimeIcons.USER,
  };

  const {
    breadcrumbItems,
    entries,
    backwardStack,
    forwardStack,
    handleShow,
    handleHide,
    handleMovePathButtonClick,
    handleSelectButtonClick,
    onEntryClick,
  } = useFileExplorer({ ...props, ref: ref as RefObject<OverlayPanel> });
  const { viewType, handleViewTypeChange } = useViewOption({});

  return (
    <>
      <OverlayPanel ref={ref} onShow={handleShow} onHide={handleHide} className={'file-explorer'} dismissable={false} showCloseIcon>
        <div className={'header'}>
          <MovePathButton onChange={handleMovePathButtonClick} backwardStack={backwardStack} forwardStack={forwardStack} />
          <BreadCrumb home={home} model={breadcrumbItems} />
        </div>

        <div className={'body'}>
          <div className={classNames('entries', viewType)}>
            {entries.map((entry) => (
              <Entry key={entry.name} entry={entry} viewType={viewType} onClick={onEntryClick} />
            ))}
          </div>
        </div>

        <div className={'footer'}>
          <ViewOptionSelector value={viewType} onChange={handleViewTypeChange} />
          <Button label={'현재 디렉토리 선택'} onClick={handleSelectButtonClick} className={'select'} />
        </div>
      </OverlayPanel>

      <style jsx>{`
        :global(.file-explorer) {
          width: 845px;
        }

        .header {
          display: grid;
          grid-template-columns: 115px calc(100% - 125px);
          justify-content: space-between;
        }

        .body {
          height: 332px;
          overflow-y: scroll;
          margin: 28px 0;
        }
        .body::-webkit-scrollbar {
          width: 8px;
        }
        .body::-webkit-scrollbar-thumb {
          background-color: var(--surface-400);
          border-radius: 10px;
        }
        .body::-webkit-scrollbar-thumb:hover {
          background-color: var(--surface-500);
        }
        .body::-webkit-scrollbar-thumb:active {
          background-color: var(--surface-600);
        }
        .body::-webkit-scrollbar-track {
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

        .footer {
          display: flex;
          justify-content: space-between;
        }

        .footer > :global(.select) {
          height: 42px;
        }
      `}</style>
    </>
  );
});
