import { LanguageCode, RowData } from 'i18n-editor-common';
import { MouseEventHandler } from 'react';
import { Button } from 'primereact/button';
import classNames from 'classnames';

export interface CellViewerProps {
  rowData: RowData;
  field: 'key' | 'index' | LanguageCode;
}

export function CellViewer(props: CellViewerProps) {
  const { rowData, field } = props;

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    console.log(rowData);
  };

  const isKeyCell = field === 'key';

  return (
    <>
      <div className={'cell'} onMouseEnter={handleMouseEnter}>
        <span>{rowData[field]}</span>
        {isKeyCell && <Button icon={'pi pi-th-large'} className={classNames('row-menu', 'p-button-rounded')} />}
      </div>

      <style jsx>{`
        .cell {
          padding: 16px 0;
          width: 100%;
          position: relative;
        }

        :global(.row-menu) {
          display: none;
          position: absolute;
          //width: 1.5rem !important;
          //height: 1.5rem !important;
          top: 0;
          right: 0;
        }

        :global(.row-menu > .p-button-icon) {
          //font-size: 8px;
        }

        .cell:hover > :global(.row-menu) {
          display: flex;
        }
      `}</style>
    </>
  );
}
