import { ColumnData, RowData } from 'i18n-editor-common';
import { ColumnEventParams } from 'primereact/column';
import useTranslationFileEditorBefore from '@components/translationFileEditor/useTranslationFileEditorBefore';
import {
  CustomEventHandler,
  TranslationTableRowAddEvent,
  TranslationTableDeleteRowEvent,
  TranslationTableColumnDeleteEvent,
  TranslationTableColumnAddEvent,
  TranslationTableNewRowAddEvent,
} from '@defines/event';
import { TranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import { TableMoreOptionsRowMenu } from '@components/translationFileEditor/components/tableMoreOptionsMenu/row';
import { TableExtendDialog } from '@components/translationFileEditor/components/tableExtendDialog';
import { TableMoreOptionsColumnMenu } from '@components/translationFileEditor/components/tableMoreOptionsMenu/column';
import { TranslationContentTable } from '@components/translationFileEditor/components/translationContentTable';

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
 * @deprecated TODO 삭제
 * @param props
 * @constructor
 */
export function TranslationFileEditorBefore(props: TranslationFileEditorProps) {
  const { rows, columns } = props;

  return (
    <>
      <TranslationFileEditorContext.Provider value={{ ...useTranslationFileEditorBefore(props), ...props }}>
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