import { DataTable } from 'primereact/datatable';
import { ColumnData, RowData } from 'i18n-editor-common';
import { Column, ColumnEventParams } from 'primereact/column';
import useTranslationFileEditor from '@components/translationFileEditor/useTranslationFileEditor';
import { CellEditor } from '@components/translationFileEditor/components/cellEditor';
import { CustomEventHandler } from '@defines/event';
import classNames from 'classnames';

export interface TranslationFileEditorProps {
  columns?: ColumnData[];
  rows?: RowData[];
  onChange: CustomEventHandler<ColumnEventParams>;
}

function TranslationFileEditor(props: TranslationFileEditorProps) {
  const { columns = [], rows = [], onChange } = props;
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
            onCellEditComplete={onChange}
            className={classNames(column.header === 'key' && 'key')}
          />
        ))}
      </DataTable>

      <style jsx>{`
        :global(.translation-file-editor .p-datatable-table .p-datatable-tbody > tr > td.p-cell-editing) {
          padding-top: 0;
          padding-bottom: 0;
        }

        :global(.translation-file-editor .p-datatable-table .p-datatable-tbody > tr > td) {
          font-size: 14px;
        }

        :global(.translation-file-editor .p-datatable-table .p-datatable-tbody > tr > td.key) {
          cursor: default;
        }
      `}</style>
    </>
  );
}

export default TranslationFileEditor;
