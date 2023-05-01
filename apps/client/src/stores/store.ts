import { atom, selector } from 'recoil';
import { ColumnData, RowData } from 'i18n-editor-common';
import { TranslationContentSelector } from '@stores/defines/types';

export const axiosInstanceCreatedState = atom<boolean>({
  key: 'axiosInstanceCreated',
  default: false,
});

export const localeDirectoryPathState = atom<string | undefined>({
  key: 'localeDirectoryPath',
  default: undefined,
});

export const localeDirectoryCreationDialogOpenedState = atom<boolean>({
  key: 'localeDirectoryCreationDialogOpened',
  default: false,
});

export const translationFileNamesState = atom<string[] | undefined>({
  key: 'translationFileNames',
  default: undefined,
});

export const translationFileNameState = atom<string | undefined>({
  key: 'translationFileName',
  default: undefined,
});

export const hasDirectorySelectorErrorState = atom<boolean>({
  key: 'hasDirectorySelectorError',
  default: false,
});

export const translationContentRowsState = atom<RowData[] | undefined>({
  key: 'translationContentRows',
  default: undefined,
});

export const translationContentColumnsState = atom<ColumnData[] | undefined>({
  key: 'translationContentColumns',
  default: undefined,
});

export const translationContentSelector = selector<TranslationContentSelector>({
  key: 'translationContent',
  get({ get }) {
    return {
      rows: get(translationContentRowsState),
      columns: get(translationContentColumnsState),
    };
  },
  set({ set }, newValue) {
    const { rows, columns } = newValue as TranslationContentSelector;
    set(translationContentRowsState, rows);
    set(translationContentColumnsState, columns);
  },
});
