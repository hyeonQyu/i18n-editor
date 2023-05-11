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
import { TranslationFileEditorContextBefore } from '@components/translationFileEditor/contexts/translationFileEditorContextBefore';
import { TableMoreOptionsRowMenuBefore } from '@components/translationFileEditor/components/tableMoreOptionsMenu/row/TableMoreOptionsRowMenuBefore';
import { TableExtendDialogBefore } from '@components/translationFileEditor/components/tableExtendDialog/TableExtendDialogBefore';
import { TableMoreOptionsColumnMenuBefore } from '@components/translationFileEditor/components/tableMoreOptionsMenu/column/TableMoreOptionsColumnMenuBefore';
import { TranslationContentTableBefore } from '@components/translationFileEditor/components/translationContentTable/TranslationContentTableBefore';

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
      <TranslationFileEditorContextBefore.Provider value={{ ...useTranslationFileEditorBefore(props), ...props }}>
        {rows && columns && (
          <>
            <>
              <TableMoreOptionsRowMenuBefore />
              <TableMoreOptionsColumnMenuBefore />
              <TableExtendDialogBefore />
            </>

            <TranslationContentTableBefore />
          </>
        )}
      </TranslationFileEditorContextBefore.Provider>

      <style jsx>{``}</style>
    </>
  );
}
