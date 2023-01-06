import { DataTable } from 'primereact/datatable';
import { ColumnData, RowData } from 'i18n-editor-common';
import { Column, ColumnEventParams } from 'primereact/column';
import useTranslationFileEditor from '@components/translationFileEditor/useTranslationFileEditor';
import { CellEditor } from '@components/translationFileEditor/components/cellEditor';
import { CustomEventHandler } from '@defines/event';
import classNames from 'classnames';
import { CellViewer } from '@components/translationFileEditor/components/cellViewer';

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
            body={(row) => <CellViewer rowData={row} field={column.header} />}
            className={classNames(column.header === 'key' ? 'key' : 'translation')}
          />
        ))}
      </DataTable>

      <style jsx>{`
        :global(.translation-file-editor .p-datatable-table .p-datatable-tbody > tr > td) {
          font-size: 14px;
          padding: 0 16px;
        }
        :global(.translation-file-editor .p-datatable-table .p-datatable-tbody > tr > td:not(.p-cell-editing).translation:hover) {
          background-color: var(--blue-50);
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

export default TranslationFileEditor;
