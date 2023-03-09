import { LanguageCode, RowData } from 'i18n-editor-common';
import useCellViewer from '@components/translationFileEditor/components/translationContentTable/components/cellViewer/useCellViewer';
import { Button } from 'primereact/button';

export interface CellViewerProps {
  rowData: RowData;
  field: 'key' | 'index' | LanguageCode;
}

export function CellViewer(props: CellViewerProps) {
  const { rowData, field } = props;
  const { isKey, isShowTableOptionsButton, handleClick, handleMouseEnter, handleTableMoreOptionRowButtonClick } = useCellViewer(props);

  return (
    <>
      <div className={'cell'} onClick={handleClick} onMouseEnter={handleMouseEnter}>
        <div className={'data'}>{rowData[field]}</div>
        {isShowTableOptionsButton && (
          <Button
            icon={'pi pi-angle-down'}
            onClick={handleTableMoreOptionRowButtonClick}
            className={'p-button-raised p-button-text row-options'}
          />
        )}
      </div>

      <style jsx>{`
        .cell {
          padding: 12px 0;
          width: 100%;
          height: 100%;
          position: relative;
          cursor: ${isKey ? 'initial' : 'pointer'};
          line-height: 1.4;
        }

        .data {
          height: 100%;
          word-break: break-all;
          line-height: 1.4;
          font-weight: ${isKey ? 'bold' : 'normal'};
        }

        .cell :global(button.row-options) {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 36px !important;
          height: 20px;
          padding: 0;
        }
      `}</style>
    </>
  );
}
