import { Translation } from 'i18n-editor-common';

export interface NamespaceContainer {
  translations: readonly Translation[];
  setTranslations: (translations: Translation[]) => void;
}

let translations: Translation[] = [];

const setTranslations = (newTranslations: Translation[]) => {
  translations = newTranslations;
};

export const namespaceContainer: NamespaceContainer = {
  translations,
  setTranslations,
} as const;
