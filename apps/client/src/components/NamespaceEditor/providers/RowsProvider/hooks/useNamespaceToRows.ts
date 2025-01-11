import { RowData } from '@components/NamespaceEditor/defines/table';
import { GetNamespaceResponse } from 'i18n-editor-common';
import { useMemo } from 'react';

function useNamespaceToRows(namespace: GetNamespaceResponse): RowData[] {
  const { translations, languageCodes } = namespace;

  return useMemo(() => {
    return translations.map((translation) => ({
      key: translation.key,
      ...languageCodes.reduce((acc, code) => {
        acc[code] = translation.value[code] || '';
        return acc;
      }, {} as Partial<Record<string, string>>),
    }));
  }, [translations, languageCodes]);
}

export default useNamespaceToRows;
