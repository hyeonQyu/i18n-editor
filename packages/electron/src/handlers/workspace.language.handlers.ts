import { LanguageDeleteRequest, LanguageDeleteResponse } from '@i18n-editor/shared';

import {
  LanguageCreateMultipleRequest,
  LanguageCreateMultipleResponse,
  LanguageGetAllRequest,
  LanguageGetAllResponse,
} from '@i18n-editor/shared';
import { IPCHandler } from '../defines/handler.definitions';
import { deleteFile } from '../utils/file.utils';
import { getAllLanguageCodes } from '../utils/langauge.utils';
import { getAllNamespaces } from '../utils/namespace.utils';
import { completeTranslation, getAllTranslations, writeTranslation } from '../utils/translation.utils';
import { getWorkspaceById, updateWorkspace } from '../utils/workspace.utils';

export const handleGetAllLanguages: IPCHandler<LanguageGetAllResponse, LanguageGetAllRequest> = async (_, { workspaceId }) => {
  const workspace = getWorkspaceById(workspaceId);
  const languageCodes = await getAllLanguageCodes(workspace);

  return {
    languageCodes,
  };
};

export const handleCreateMultipleLanguages: IPCHandler<LanguageCreateMultipleResponse, LanguageCreateMultipleRequest> = async (
  _,
  { workspaceId, languageCodes },
) => {
  const workspace = getWorkspaceById(workspaceId);
  const existingLanguageCodes = await getAllLanguageCodes(workspace);
  const namespaces = await getAllNamespaces(workspace.path, existingLanguageCodes);
  const mergedLanguageCodes = [...new Set([...existingLanguageCodes, ...languageCodes])];

  await Promise.all(
    namespaces.map(async (namespace) => {
      const prevTranslations = await getAllTranslations(workspace.path, namespace, existingLanguageCodes);
      const translations = prevTranslations.map((translation) => completeTranslation(mergedLanguageCodes, translation));
      await writeTranslation(workspace, namespace, translations);
    }),
  );

  await updateWorkspace(workspace);
};

export const handleDeleteLanguage: IPCHandler<LanguageDeleteResponse, LanguageDeleteRequest> = async (_, { workspaceId, languageCode }) => {
  const workspace = getWorkspaceById(workspaceId);

  const languagePath = `${workspace.path}/${languageCode}`;
  await deleteFile(languagePath);

  await updateWorkspace(workspace);
};
