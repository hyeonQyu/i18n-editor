import { ColumnData } from '@components/NamespaceEditor/defines/table';
import { LanguageCode } from 'i18n-editor-common';

export const languageCodesToColumns = (languageCodes: LanguageCode[]): ColumnData[] => {
  return [
    {
      label: '',
    },
    {
      label: 'key',
    },
    ...languageCodes.map((code) => ({ label: code })),
  ];
};
