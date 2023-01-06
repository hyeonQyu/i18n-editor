import { ColumnEditorOptions } from 'primereact/column';
import { InputTextarea } from 'primereact/inputtextarea';
import useCellEditor from '@components/translationFileEditor/components/cellEditor/useCellEditor';
import { CellViewer } from '@components/translationFileEditor/components/cellViewer';

export interface CellEditorProps extends ColumnEditorOptions {}

export function CellEditor(props: CellEditorProps) {
  const { value, field, rowData } = props;
  const { handleFocus, handleChange } = useCellEditor(props);

  if (field === 'key') {
    return <CellViewer rowData={rowData} field={field} />;
  }

  return (
    <>
      <InputTextarea className={'cell-editor'} value={value} onFocus={handleFocus} onChange={handleChange} autoResize />

      <style jsx>{`
        :global(.cell-editor) {
          width: 100%;
          height: 42px;
          line-height: 1.2;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
