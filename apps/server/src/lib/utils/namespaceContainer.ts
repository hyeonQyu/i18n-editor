import { Translation } from 'i18n-editor-common';

export interface NamespaceContainer {
  getTranslations: (workspaceId: string, namespace: string) => Translation[] | undefined;
  setTranslations: (workspaceId: string, namespace: string, translations: Translation[]) => void;
}

const key: {
  workspaceId: string;
  namespace: string;
} = {
  workspaceId: '',
  namespace: '',
};

let translations: Translation[] = [];

const getTranslations = (workspaceId: string, namespace: string) => {
  if (key.workspaceId !== workspaceId || key.namespace !== namespace) {
    return undefined;
  }

  return [...translations];
};

const setTranslations = (workspaceId: string, namespace: string, newTranslations: Translation[]) => {
  key.workspaceId = workspaceId;
  key.namespace = namespace;

  translations = newTranslations;
};

export const namespaceContainer: NamespaceContainer = {
  getTranslations,
  setTranslations,
} as const;
