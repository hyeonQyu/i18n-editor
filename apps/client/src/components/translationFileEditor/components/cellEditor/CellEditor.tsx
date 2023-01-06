import { ColumnEditorOptions } from 'primereact/column';
import { InputTextarea } from 'primereact/inputtextarea';
import useCellEditor from '@components/translationFileEditor/components/cellEditor/useCellEditor';

export interface CellEditorProps extends ColumnEditorOptions {}

export function CellEditor(props: CellEditorProps) {
  const { value } = props;
  const { handleFocus, handleChange } = useCellEditor(props);

  return (
    <>
      <InputTextarea className={'cell-editor'} value={value} onFocus={handleFocus} onChange={handleChange} autoResize />

      <style jsx>{`
        :global(.cell-editor) {
          height: 42px;
          line-height: 1.2;
        }
      `}</style>
    </>
  );
}
