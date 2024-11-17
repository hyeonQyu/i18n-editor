import { TableExtendDialog } from './components/tableExtendDialog';
import { TableMoreOptionsColumnMenu } from './components/tableMoreOptionsMenu/column';
import { TableMoreOptionsRowMenu } from './components/tableMoreOptionsMenu/row';
import { TranslationContentTable } from './components/translationContentTable';
import { TranslationFileEditorContext } from './contexts/translationFileEditorContext';
import useTranslationFileEditor from './useTranslationFileEditor';
import {
  CustomEventHandler,
  TranslationTableColumnAddEvent,
  TranslationTableColumnDeleteEvent,
  TranslationTableDeleteRowEvent,
  TranslationTableNewRowAddEvent,
  TranslationTableRowAddEvent,
} from '../../defines/event';
import { ColumnData, RowData } from 'i18n-editor-common';
import { ColumnEventParams } from 'primereact/column';

/**
 * @deprecated
 */
export interface TranslationFileEditorProps {
  columns?: ColumnData[];
  rows?: RowData[];
  onChange: CustomEventHandler<ColumnEventParams>;
  onAddColumn: CustomEventHandler<TranslationTableColumnAddEvent>;
  onDeleteColumn: CustomEventHandler<TranslationTableColumnDeleteEvent>;
  onAddRowAbove: CustomEventHandler<TranslationTableRowAddEvent>;
  onAddRowBelow: CustomEventHandler<TranslationTableRowAddEvent>;
  onAddRow: CustomEventHandler<TranslationTableNewRowAddEvent>;
  onClearRowContent: CustomEventHandler<TranslationTableDeleteRowEvent>;
  onDeleteRow: CustomEventHandler<TranslationTableDeleteRowEvent>;
}

/**
 * @deprecated
 */
export function TranslationFileEditor(props: TranslationFileEditorProps) {
  const { rows, columns } = props;

  return (
    <>
      <TranslationFileEditorContext.Provider value={{ ...useTranslationFileEditor(props), ...props }}>
        {rows && columns && (
          <>
            <>
              <TableMoreOptionsRowMenu />
              <TableMoreOptionsColumnMenu />
              <TableExtendDialog />
            </>

            <TranslationContentTable />
          </>
        )}
      </TranslationFileEditorContext.Provider>

      <style jsx>{``}</style>
    </>
  );
}
