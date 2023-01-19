import { ColumnData, RowData } from 'i18n-editor-common';
import { ColumnEventParams } from 'primereact/column';
import useTranslationFileEditor from '@components/translationFileEditor/useTranslationFileEditor';
import { CustomEventHandler, TranslationTableAddEvent, TranslationTableDeleteRowEvent } from '@defines/event';
import { TranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import { TableMoreOptionsRowMenu } from '@components/translationFileEditor/components/tableMoreOptionsMenu/row';
import { TableExtendDialog } from '@components/translationFileEditor/components/tableExtendDialog';
import { TableMoreOptionsColumnMenu } from '@components/translationFileEditor/components/tableMoreOptionsMenu/column';
import { TranslationContentTable } from '@components/translationFileEditor/components/translationContentTable';

export interface TranslationFileEditorProps {
  columns?: ColumnData[];
  rows?: RowData[];
  onChange: CustomEventHandler<ColumnEventParams>;
  onAddRowAbove: CustomEventHandler<TranslationTableAddEvent>;
  onAddRowBelow: CustomEventHandler<TranslationTableAddEvent>;
  onClearRowContent: CustomEventHandler<TranslationTableDeleteRowEvent>;
  onDeleteRow: CustomEventHandler<TranslationTableDeleteRowEvent>;
}

function TranslationFileEditor(props: TranslationFileEditorProps) {
  return (
    <>
      <TranslationFileEditorContext.Provider value={{ ...useTranslationFileEditor(props), ...props }}>
        <>
          <TableMoreOptionsRowMenu />
          <TableMoreOptionsColumnMenu />
          <TableExtendDialog />
        </>

        <TranslationContentTable />
      </TranslationFileEditorContext.Provider>

      <style jsx>{``}</style>
    </>
  );
}

export default TranslationFileEditor;
