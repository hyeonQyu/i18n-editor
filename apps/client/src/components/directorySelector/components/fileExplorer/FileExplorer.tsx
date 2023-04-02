import { OverlayPanel } from 'primereact/overlaypanel';
import { forwardRef, RefObject } from 'react';
import { MovePathButton } from '@components/directorySelector/components/fileExplorer/components/movePathButton';
import { BreadCrumb } from 'primereact/breadcrumb';
import { InputFilter } from '@components/directorySelector/components/fileExplorer/components/inputFilter';
import { CustomEventHandler } from '@defines/event';
import useFileExplorerBreadcrumb from '@components/directorySelector/components/fileExplorer/hooks/useFileExplorerBreadcrumb';
import classNames from 'classnames';
import useFileExplorerEntries from '@components/directorySelector/components/fileExplorer/hooks/useFileExplorerEntries';
import { Entry } from '@components/directorySelector/components/fileExplorer/components/entry';
import { ViewOptionSelector } from '@components/directorySelector/components/fileExplorer/components/viewOptionSelector';
import { Button } from 'primereact/button';
import useFileExplorerSelectDirectory from '@components/directorySelector/components/fileExplorer/hooks/useFileExplorerSelectDirectory';

export interface FileExplorerProps {
  onShow: CustomEventHandler;
  onHide: CustomEventHandler;
}

// eslint-disable-next-line react/display-name
const FileExplorer = forwardRef<OverlayPanel, FileExplorerProps>((props, ref) => {
  const { onShow, onHide } = props;
  const { home, breadcrumbItems } = useFileExplorerBreadcrumb();
  const { entries } = useFileExplorerEntries();
  const { handleSelectButtonClick } = useFileExplorerSelectDirectory({ ref: ref as RefObject<OverlayPanel> });

  return (
    <>
      <OverlayPanel ref={ref} onShow={onShow} onHide={onHide} className={'file-explorer'} dismissable={false} showCloseIcon>
        <div className={'header'}>
          <MovePathButton />
          <BreadCrumb home={home} model={breadcrumbItems} />
          <InputFilter />
        </div>

        <div className={'body'}>
          <div className={classNames('entries')}>
            {entries.map((entry) => (
              <Entry key={entry.name} entry={entry} />
            ))}
          </div>
        </div>

        <div className={'footer'}>
          <ViewOptionSelector />
          <Button label={'현재 디렉토리 선택'} onClick={handleSelectButtonClick} className={'select'} />
        </div>
      </OverlayPanel>

      <style jsx>{`
        :global(.file-explorer) {
          width: 845px;
        }

        .header {
          display: grid;
          grid-template-columns: 75px calc(100% - 237px) 140px;
          justify-content: space-between;
        }

        .header :global(.p-breadcrumb),
        .header :global(.p-breadcrumb-chevron),
        :global(.p-menuitem-icon) {
          font-size: 13px;
        }
        .header :global(.p-breadcrumb) {
          display: flex;
          height: 42px;
        }
        .header :global(.p-breadcrumb ul li.p-breadcrumb-chevron) {
          margin: 0 0.3rem;
        }
        .header :global(.p-breadcrumb ul li:not(.p-breadcrumb-chevron):hover .p-menuitem-link .p-menuitem-text) {
          color: var(--primary-color);
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

export default FileExplorer;
