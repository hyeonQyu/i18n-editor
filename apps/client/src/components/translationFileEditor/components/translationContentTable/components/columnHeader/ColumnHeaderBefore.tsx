import { Button } from 'primereact/button';
import { ColumnHeaderKey } from 'i18n-editor-common';
import useColumnHeaderBefore from '@components/translationFileEditor/components/translationContentTable/components/columnHeader/useColumnHeaderBefore';

export interface ColumnHeaderBeforeProps {
  header: ColumnHeaderKey;
}

/**
 * @deprecated TODO 삭제
 * @param props
 * @constructor
 */
export function ColumnHeaderBefore(props: ColumnHeaderBeforeProps) {
  const { header } = props;
  const { isShowColumnOptionButton, handleMouseEnter, handleMouseLeave, handleTableMoreOptionColumnButtonClick } =
    useColumnHeaderBefore(props);

  return (
    <>
      <div className={'column'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className={'header'}>{header}</div>
        {isShowColumnOptionButton && (
          <Button
            icon={'pi pi-angle-down'}
            onClick={handleTableMoreOptionColumnButtonClick}
            className={'p-button-raised p-button-text column-options'}
          />
        )}
      </div>

      <style jsx>{`
        .column {
          position: relative;
          padding: 1rem;
        }

        .header {
        }

        .column :global(button.column-options) {
          position: absolute;
          top: 6px;
          right: 1rem;
          width: 36px !important;
          height: 20px;
          padding: 0;
        }
      `}</style>
    </>
  );
}
