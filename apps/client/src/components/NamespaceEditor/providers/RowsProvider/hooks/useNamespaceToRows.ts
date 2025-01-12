import { Cell, RowData } from '@components/NamespaceEditor/defines/table';
import { createCell } from '@components/NamespaceEditor/utils/cell';
import { GetNamespaceResponse } from 'i18n-editor-common';
import { useMemo } from 'react';

function useNamespaceToRows(namespace: GetNamespaceResponse): RowData[] {
  const { translations, languageCodes } = namespace;

  return useMemo(() => {
    return translations.map((translation) => ({
      key: createCell(translation.key),
      ...languageCodes.reduce((acc, code) => {
        acc[code] = createCell(translation.value[code] || '');
        return acc;
      }, {} as Partial<Record<string, Cell>>),
    }));
  }, [translations, languageCodes]);
}

export default useNamespaceToRows;
