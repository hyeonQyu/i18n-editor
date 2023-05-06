import { DataTable } from 'primereact/datatable';
import useTranslationContentTable from '@components/translationFileEditor/components/translationContentTable/useTranslationContentTable';
import { useRecoilValue } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import TableHeader from '@components/translationFileEditor/components/translationContentTable/components/tableHeader/TableHeader';
import { NewTranslationAdder } from '@components/translationFileEditor/components/translationContentTable/components/newTranslationAdder';
import { Column } from 'primereact/column';
import { ColumnHeader } from '@components/translationFileEditor/components/translationContentTable/components/columnHeader';
import { CellEditor } from '@components/translationFileEditor/components/translationContentTable/components/cellEditor';
import { CellViewer } from '@components/translationFileEditor/components/translationContentTable/components/cellViewer';
import classNames from 'classnames';

export interface TranslationContentTableProps {}

function TranslationContentTable(props: TranslationContentTableProps) {
  const {} = props;
  const rows = useRecoilValue(translationFileEditorStates.rows);
  const columns = useRecoilValue(translationFileEditorStates.columns);
  const filter = useRecoilValue(translationFileEditorStates.filter);
  const { dataTableRef, globalFilterFields, selectedRow, handleTableMouseLeave, handleCellEditComplete } = useTranslationContentTable({});

  return (
    <>
      <DataTable
        ref={dataTableRef}
        value={rows}
        header={TableHeader}
        editMode={'cell'}
        selectionMode={'single'}
        responsiveLayout={'scroll'}
        dataKey={'key'}
        globalFilterFields={globalFilterFields}
        scrollable
        scrollHeight={'flex'}
        onMouseLeave={handleTableMouseLeave}
        selection={selectedRow}
        filters={filter}
        emptyMessage={<NewTranslationAdder />}
      >
        {columns.map(({ header }) => (
          <Column
            key={header}
            field={header}
            header={() => <ColumnHeader header={header} />}
            editor={(option) => <CellEditor {...option} />}
            body={(row) => <CellViewer rowData={row} field={header} />}
            onCellEditComplete={handleCellEditComplete}
            className={classNames(header === 'key' ? 'key' : 'translation')}
          />
        ))}
      </DataTable>

      <style jsx>{`
        :global(.translation-file-editor) {
          margin-top: 20px;
        }

        :global(.p-datatable .p-datatable-thead > tr > th[role='columnheader']) {
          padding: 0;
        }

        :global(.p-column-header-content),
        :global(.p-column-title) {
          width: 100%;
        }

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
          cursor: initial;
        }
        :global(.translation-file-editor .p-datatable-table .p-datatable-tbody > tr > td:not(.p-cell-editing).translation:hover) {
          background-color: var(--blue-50);
        }

        :global(.p-dialog.p-confirm-dialog.delete-dialog) {
          margin: 5rem 3rem !important;
        }
        :global(.p-dialog.p-confirm-dialog.delete-dialog .p-confirm-dialog-message) {
          line-height: 1.4;
          white-space: pre-line;
        }
      `}</style>
    </>
  );
}

export default TranslationContentTable;
