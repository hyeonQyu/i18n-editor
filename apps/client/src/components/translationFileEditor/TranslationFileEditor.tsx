import { DataTable } from 'primereact/datatable';
import { ColumnData, RowData } from 'i18n-editor-common';
import { Column } from 'primereact/column';
import useTranslationFileEditor from '@components/translationFileEditor/useTranslationFileEditor';

export interface TranslationFileEditorProps {
  columns?: ColumnData[];
  rows?: RowData[];
}

function TranslationFileEditor(props: TranslationFileEditorProps) {
  const { columns = [], rows = [] } = props;
  const { globalFilterFields } = useTranslationFileEditor(props);

  return (
    <>
      <DataTable
        value={rows}
        editMode={'cell'}
        responsiveLayout={'scroll'}
        dataKey={'key'}
        filterDisplay={'row'}
        globalFilterFields={globalFilterFields}
        scrollable
        scrollHeight={'flex'}
      >
        {columns.map((column) => (
          <Column key={column.header} {...column} field={column.header} filter sortable />
        ))}
      </DataTable>

      <style jsx>{``}</style>
    </>
  );
}

export default TranslationFileEditor;
