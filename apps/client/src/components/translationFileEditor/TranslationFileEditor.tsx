import { DataTable } from 'primereact/datatable';
import { ColumnData, RowData } from 'i18n-editor-common';
import { Column } from 'primereact/column';

export interface TranslationFileEditorProps {
  columns?: ColumnData[];
  rows?: RowData[];
}

function TranslationFileEditor(props: TranslationFileEditorProps) {
  const { columns = [], rows = [] } = props;

  return (
    <>
      <DataTable value={rows} editMode={'cell'} responsiveLayout={'scroll'} dataKey={'key'}>
        {columns.map((column) => (
          <Column key={column.header} {...column} field={column.header} filter />
        ))}
      </DataTable>

      <style jsx>{``}</style>
    </>
  );
}

export default TranslationFileEditor;
