import { DataTable } from 'primereact/datatable';
import { ColumnData, RowData } from 'i18n-editor-common';
import { Column } from 'primereact/column';
import useTranslationFileEditor from '@components/translationFileEditor/useTranslationFileEditor';
import { CellEditor } from '@components/translationFileEditor/components/cellEditor';

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
        className={'translation-file-editor'}
      >
        {columns.map((column) => (
          <Column
            key={column.header}
            {...column}
            field={column.header}
            filter
            sortable
            editor={CellEditor}
            onCellEditComplete={(e) => {
              console.log(e);
            }}
          />
        ))}
      </DataTable>

      <style jsx>{`
        :global(.translation-file-editor .p-datatable-table .p-datatable-tbody > tr > td.p-cell-editing) {
          padding-top: 0;
          padding-bottom: 0;
        }
      `}</style>
    </>
  );
}

export default TranslationFileEditor;
