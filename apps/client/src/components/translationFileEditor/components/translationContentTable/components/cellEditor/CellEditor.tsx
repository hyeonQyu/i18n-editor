import { ColumnEditorOptions } from 'primereact/column';
import useCellEditor from '@components/translationFileEditor/components/translationContentTable/components/cellEditor/useCellEditor';
import { CellViewerBefore } from '@components/translationFileEditor/components/translationContentTable/components/cellViewer';
import { InputTextarea } from 'primereact/inputtextarea';

export interface CellEditorProps extends ColumnEditorOptions {}

function CellEditor(props: CellEditorProps) {
  const {} = props;
  const { value, field, rowData } = props;
  const { handleClick, handleFocus, handleChange, handleMouseEnter, handleKeyDown } = useCellEditor(props);

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

export default CellEditor;
