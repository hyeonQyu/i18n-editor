import { LanguageCode, RowData } from 'i18n-editor-common';
import useCellViewer from '@components/translationFileEditor/components/cellViewer/useCellViewer';
import { Button } from 'primereact/button';

export interface CellViewerProps {
  rowData: RowData;
  field: 'key' | 'index' | LanguageCode;
}

export function CellViewer(props: CellViewerProps) {
  const { rowData, field } = props;
  const { isShowTableOptionsButton, handleMouseEnter } = useCellViewer(props);

  return (
    <>
      <div className={'cell'} onMouseEnter={handleMouseEnter}>
        <div className={'data'}>{rowData[field]}</div>
        {isShowTableOptionsButton && <Button icon={'pi pi-angle-down'} className={'p-button-raised p-button-text table-options'} />}
      </div>

      <style jsx>{`
        .cell {
          padding: 16px 0;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .data {
          height: 100%;
        }

        .cell :global(button.table-options) {
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
