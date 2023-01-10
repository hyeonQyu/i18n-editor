import { DataTable } from 'primereact/datatable';
import { ColumnData, RowData } from 'i18n-editor-common';
import { Column, ColumnEventParams } from 'primereact/column';
import useTranslationFileEditor from '@components/translationFileEditor/useTranslationFileEditor';
import { CellEditor } from '@components/translationFileEditor/components/cellEditor';
import { CustomEventHandler } from '@defines/event';
import classNames from 'classnames';
import { CellViewer } from '@components/translationFileEditor/components/cellViewer';
import { TranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import { TableMoreOptionsRowMenu } from '@components/translationFileEditor/components/tableMoreOptionsMenu/row';

export interface TranslationFileEditorProps {
  columns?: ColumnData[];
  rows?: RowData[];
  onChange: CustomEventHandler<ColumnEventParams>;
}

function TranslationFileEditor(props: TranslationFileEditorProps) {
  const { columns = [], rows = [], onChange } = props;
  const translationFileEditor = useTranslationFileEditor(props);
  const { selectedRow, globalFilterFields, handleTableMouseLeave } = translationFileEditor;

  return (
    <>
      <TranslationFileEditorContext.Provider value={translationFileEditor}>
        <TableMoreOptionsRowMenu />

        <DataTable
          value={rows}
          editMode={'cell'}
          selectionMode={'single'}
          responsiveLayout={'scroll'}
          dataKey={'key'}
          filterDisplay={'row'}
          globalFilterFields={globalFilterFields}
          scrollable
          scrollHeight={'flex'}
          onMouseLeave={handleTableMouseLeave}
          selection={selectedRow}
          className={'translation-file-editor'}
        >
          {columns.map((column) => (
            <Column
              key={column.header}
              {...column}
              field={column.header}
              filter
              sortable
              editor={(option) => <CellEditor {...option} />}
              onCellEditComplete={onChange}
              body={(row) => <CellViewer rowData={row} field={column.header} />}
              className={classNames(column.header === 'key' ? 'key' : 'translation')}
            />
          ))}
        </DataTable>
      </TranslationFileEditorContext.Provider>

      <style jsx>{`
        :global(
            .p-datatable.p-datatable-selectable
              .p-datatable-tbody
              > tr.p-selectable-row:not(.p-highlight):not(.p-datatable-emptymessage):hover
          ) {
          background: var(--surface-0);
        }
        :global(.p-datatable.p-datatable-selectable .p-datatable-tbody > tr.p-selectable-row:focus) {
          outline: none;
        }

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
