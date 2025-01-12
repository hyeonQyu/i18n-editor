import { Translation } from 'i18n-editor-common';

const key: {
  workspaceId: string;
  namespace: string;
} = {
  workspaceId: '',
  namespace: '',
};

let translations: Translation[] | undefined = undefined;

const checkKeyValid = (workspaceId: string, namespace: string) => {
  return key.workspaceId !== workspaceId || key.namespace !== namespace;
};

const setKey = (workspaceId: string, namespace: string) => {
  key.workspaceId = workspaceId;
  key.namespace = namespace;
};

const getTranslations = (workspaceId: string, namespace: string) => {
  if (!checkKeyValid(workspaceId, namespace)) {
    return undefined;
  }

  return translations ? [...translations] : translations;
};

const setTranslations = (workspaceId: string, namespace: string, newTranslations: Translation[]) => {
  setKey(workspaceId, namespace);
  translations = newTranslations;
};

export const namespaceContainer = {
  getTranslations,
  setTranslations,
} as const;
