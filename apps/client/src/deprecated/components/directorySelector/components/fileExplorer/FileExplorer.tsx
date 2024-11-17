import { DirectorySelectorProps } from '../../index';
import { Entry } from './components/entry';
import { InputFilter } from './components/inputFilter';
import { MovePathButton } from './components/movePathButton';
import { ViewOptionSelector } from './components/viewOptionSelector';
import useViewOption from './hooks/useViewOption';
import useFileExplorer from './useFileExplorer';
import { CustomEventHandler } from '../../../../defines/event';
import classNames from 'classnames';
import { PrimeIcons } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/menuitem';
import { OverlayPanel } from 'primereact/overlaypanel';
import { forwardRef, RefObject } from 'react';

/**
 * @deprecated
 */
export interface FileExplorerProps extends Pick<DirectorySelectorProps, 'path' | 'onChange'> {
  onShow: CustomEventHandler;
  onHide: CustomEventHandler;
  opened: boolean;
}

/**
 * @deprecated
 */
export const FileExplorer = forwardRef<OverlayPanel, FileExplorerProps>((props, ref) => {
  const { onShow, onHide } = props;

  const home: MenuItem = {
    icon: PrimeIcons.USER,
  };

  const {
    breadcrumbItems,
    entries,
    backwardStack,
    forwardStack,
    filterKeyword,
    filterPlaceholder,
    handleMovePathButtonClick,
    handleSelectButtonClick,
    handleFilterKeywordChange,
    onEntryClick,
  } = useFileExplorer({ ...props, ref: ref as RefObject<OverlayPanel> });
  const { viewType, handleViewTypeChange } = useViewOption({});

  return (
    <>
      <OverlayPanel ref={ref} onShow={onShow} onHide={onHide} className={'file-explorer'} dismissable={false} showCloseIcon>
        <div className={'header'}>
          <MovePathButton onChange={handleMovePathButtonClick} backwardStack={backwardStack} forwardStack={forwardStack} />
          <BreadCrumb home={home} model={breadcrumbItems} />
          <InputFilter keyword={filterKeyword} placeholder={filterPlaceholder} onChange={handleFilterKeywordChange} />
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

FileExplorer.displayName = 'FileExplorer';
