import NamespaceEditorCell from '@components/NamespaceEditor/components/NamespaceEditorCell';
import NamespaceEditorScroller from '@components/NamespaceEditor/components/NamespaceEditorScroller';
import NamespaceEditorTable from '@components/NamespaceEditor/components/NamespaceEditorTable';
import NamespaceEditorTableBody from '@components/NamespaceEditor/components/NamespaceEditorTableBody';
import NamespaceEditorTableHead from '@components/NamespaceEditor/components/NamespaceEditorTableHead';
import useEditorRows from '@components/NamespaceEditor/hooks/useEditorRows';
import RowIndexProvider from '@components/NamespaceEditor/providers/RowIndexProvider';
import { Paper, TableCell, TableRow } from '@mui/material';
import { LanguageCode } from 'i18n-editor-common';
import { TableVirtuoso } from 'react-virtuoso';

type RowData = {
  key: string;
} & Partial<Record<LanguageCode, string>>;

interface ColumnData {
  label: keyof RowData;
}

function NamespaceEditor() {
  const rows = useEditorRows();

  const columns: ColumnData[] = [
    {
      label: 'key',
    },
    {
      label: 'ko',
    },
    {
      label: 'en',
    },
    {
      label: 'ja',
    },
  ];

  // const rows: RowData[] = [
  //   {
  //     key: 'KEY1',
  //     ko: '한국어1',
  //     en: '영어1',
  //     ja: '일본어1',
  //   },
  //   {
  //     key: 'KEY2',
  //     ko: '한국어2',
  //     en: '영어2',
  //     ja: '일본어2',
  //   },
  //   {
  //     key: 'KEY3',
  //     ko: '한국어3',
  //     en: '영어3',
  //     ja: '일본어3',
  //   },
  //   {
  //     key: 'KEY4',
  //     ko: '한국어4',
  //     en: '영어4',
  //     ja: '일본어4',
  //   },
  // ];

  return (
    <Paper style={{ height: '100%', padding: '36px' }}>
      <TableVirtuoso
        data={rows}
        components={{
          Scroller: NamespaceEditorScroller,
          Table: NamespaceEditorTable,
          TableHead: NamespaceEditorTableHead,
          TableRow,
          TableBody: NamespaceEditorTableBody,
        }}
        fixedHeaderContent={() => (
          <TableRow>
            {columns.map(({ label }) => (
              <TableCell key={label} variant={'head'}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        )}
        itemContent={(rowIndex, row) => (
          <RowIndexProvider rowIndex={rowIndex}>
            {columns.map(({ label }) => {
              const value = row[label]!;
              return <NamespaceEditorCell key={value} defaultValue={value} isKey={label === 'key'} />;
            })}
          </RowIndexProvider>
        )}
      />
    </Paper>
  );
}

export default NamespaceEditor;
