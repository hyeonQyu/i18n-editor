import { ColumnEditorOptions } from 'primereact/column';
import { InputTextarea } from 'primereact/inputtextarea';
import useCellEditorBefore from '@components/translationFileEditor/components/translationContentTable/components/cellEditor/useCellEditorBefore';
import { CellViewerBefore } from '@components/translationFileEditor/components/translationContentTable/components/cellViewer';

export interface CellEditorBeforeProps extends ColumnEditorOptions {}

/**
 * @deprecated TODO 삭제
 * @param props
 * @constructor
 */
export function CellEditorBefore(props: CellEditorBeforeProps) {
  const { value, field, rowData } = props;
  const { handleClick, handleFocus, handleChange, handleMouseEnter, handleKeyDown } = useCellEditorBefore(props);

  if (field === 'key') {
    return <CellViewerBefore rowData={rowData} field={field} />;
  }

  return (
    <>
      <InputTextarea
        className={'cell-editor'}
        value={value}
        onClick={handleClick}
        onFocus={handleFocus}
        onChange={handleChange}
        onMouseEnter={handleMouseEnter}
        onKeyDown={handleKeyDown}
        placeholder={'번역 값을 입력하세요'}
        autoResize
      />

      <style jsx>{`
        :global(.cell-editor) {
          width: 100%;
          height: 42px;
          line-height: 1.4;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
