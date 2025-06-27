import {
  TranslationCreateRequest,
  TranslationCreateResponse,
  TranslationDeleteRequest,
  TranslationDeleteResponse,
  TranslationGetAllRequest,
  TranslationGetAllResponse,
  TranslationPositionDirection,
  TranslationUpdateRequest,
  TranslationUpdateResponse,
} from '@i18n-editor/shared';
import { IPCHandler } from '../defines/handler.definitions';
import { getAllLanguageCodes } from '../utils/langauge.utils';
import {
  checkTranslationDuplicated,
  completeTranslation,
  findTranslationIndex,
  getAllTranslations,
  writeTranslation,
} from '../utils/translation.utils';
import { getWorkspaceById, updateWorkspace } from '../utils/workspace.utils';

export const handleGetAllTranslations: IPCHandler<TranslationGetAllResponse, TranslationGetAllRequest> = async (
  _,
  { workspaceId, namespace },
) => {
  const workspace = getWorkspaceById(workspaceId);

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  const languageCodes = await getAllLanguageCodes(workspace);

  if (languageCodes.length === 0) {
    throw new Error('Invalid workspace');
  }

  const translations = await getAllTranslations(workspace.path, namespace, languageCodes);

  return {
    translations,
  };
};

export const handleCreateTranslation: IPCHandler<TranslationCreateResponse, TranslationCreateRequest> = async (
  _,
  { workspaceId, namespace, translation, position },
) => {
  const getIndexWithDirection = (pivotIndex: number, direction: TranslationPositionDirection) => {
    return (
      pivotIndex +
      (
        {
          prev: 0,
          next: 1,
        } as Record<TranslationPositionDirection, number>
      )[direction]
    );
  };

  const workspace = getWorkspaceById(workspaceId);

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  const languageCodes = await getAllLanguageCodes(workspace);

  if (languageCodes.length === 0) {
    throw new Error('Invalid workspace');
  }

  const translations = await getAllTranslations(workspace.path, namespace, languageCodes);

  if (checkTranslationDuplicated(translations, translation)) {
    throw new Error('Translation already exists');
  }

  const index = position
    ? getIndexWithDirection(findTranslationIndex(translations, position.pivotTranslationKey), position.direction)
    : translations.length;

  translations.splice(index, 0, completeTranslation(languageCodes, translation));

  await writeTranslation(workspace, namespace, translations);
  await updateWorkspace(workspace);
};

export const handleUpdateTranslation: IPCHandler<TranslationUpdateResponse, TranslationUpdateRequest> = async (
  _,
  { workspaceId, namespace, translationKey, languageCode, value },
) => {
  const workspace = getWorkspaceById(workspaceId);

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  const languageCodes = await getAllLanguageCodes(workspace);

  if (languageCodes.length === 0) {
    throw new Error('Invalid workspace');
  }

  const translations = await getAllTranslations(workspace.path, namespace, languageCodes);

  const index = findTranslationIndex(translations, translationKey);

  translations[index].value[languageCode] = value;

  await writeTranslation(workspace, namespace, translations);
  await updateWorkspace(workspace);
};

export const handleDeleteTranslation: IPCHandler<TranslationDeleteResponse, TranslationDeleteRequest> = async (
  _,
  { workspaceId, namespace, translationKey },
) => {
  const workspace = getWorkspaceById(workspaceId);

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  const languageCodes = await getAllLanguageCodes(workspace);

  if (languageCodes.length === 0) {
    throw new Error('Invalid workspace');
  }

  const translations = await getAllTranslations(workspace.path, namespace, languageCodes);

  const index = findTranslationIndex(translations, translationKey);

  translations.splice(index, 1);

  await writeTranslation(workspace, namespace, translations);
  await updateWorkspace(workspace);
};
