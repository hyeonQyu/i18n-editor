import { Cell, RowData } from '@components/NamespaceView/components/NamespaceEditor/defines/table';
import { createCell } from '@components/NamespaceView/components/NamespaceEditor/utils/cell';
import { LanguageCode, Translation } from 'i18n-editor-common';

export const translationsToRows = (translations: Translation[], languageCodes: LanguageCode[]): RowData[] => {
  return translations.map((translation) => ({
    key: createCell(translation.key),
    ...languageCodes.reduce((acc, code) => {
      acc[code] = createCell(translation.value[code] || '');
      return acc;
    }, {} as Partial<Record<string, Cell>>),
  }));
};
