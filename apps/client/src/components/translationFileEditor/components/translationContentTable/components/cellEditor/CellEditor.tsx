import { ColumnEditorOptions } from 'primereact/column';
import { InputTextarea } from 'primereact/inputtextarea';
import useCellEditor from '@components/translationFileEditor/components/translationContentTable/components/cellEditor/useCellEditor';
import { CellViewer } from '@components/translationFileEditor/components/translationContentTable/components/cellViewer';

export interface CellEditorProps extends ColumnEditorOptions {}

export function CellEditor(props: CellEditorProps) {
  const { value, field, rowData } = props;
  const { handleClick, handleFocus, handleChange, handleMouseEnter, handleKeyDown } = useCellEditor(props);

  if (field === 'key') {
    return <CellViewer rowData={rowData} field={field} />;
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
