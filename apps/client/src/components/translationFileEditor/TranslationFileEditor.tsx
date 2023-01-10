import { DataTable } from 'primereact/datatable';
import { ColumnData, RowData } from 'i18n-editor-common';
import { Column, ColumnEventParams } from 'primereact/column';
import useTranslationFileEditor from '@components/translationFileEditor/useTranslationFileEditor';
import { CellEditor } from '@components/translationFileEditor/components/cellEditor';
import { CustomEventHandler } from '@defines/event';
import classNames from 'classnames';
import { CellViewer } from '@components/translationFileEditor/components/cellViewer';
import { TranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface TranslationFileEditorProps {
  columns?: ColumnData[];
  rows?: RowData[];
  onChange: CustomEventHandler<ColumnEventParams>;
}

function TranslationFileEditor(props: TranslationFileEditorProps) {
  const { columns = [], rows = [], onChange } = props;
  const { mouseHoveredIndex, globalFilterFields, handleTableMouseLeave, handleCellMouseEnter } = useTranslationFileEditor(props);

  return (
    <>
      <TranslationFileEditorContext.Provider value={{ mouseHoveredIndex, onCellMouseEnter: handleCellMouseEnter }}>
        <DataTable
          value={rows}
          editMode={'cell'}
          responsiveLayout={'scroll'}
          dataKey={'key'}
          filterDisplay={'row'}
          globalFilterFields={globalFilterFields}
          scrollable
          scrollHeight={'flex'}
          onMouseLeave={handleTableMouseLeave}
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
