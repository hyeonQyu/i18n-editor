import {
  DuplicatedNamespaceError,
  NamespaceCreateRequest,
  NamespaceCreateResponse,
  NamespaceDeleteRequest,
  NamespaceDeleteResponse,
  NamespaceGetAllRequest,
  NamespaceGetAllResponse,
} from '@i18n-editor/shared';
import { IPCHandler } from '../defines/handler.definitions';
import { deleteFile, writeFile } from '../utils/file.utils';
import { getAllLanguageCodes } from '../utils/langauge.utils';
import { checkNamespaceDuplicated, getAllNamespaces, getNamespacePath } from '../utils/namespace.utils';
import { getWorkspaceById, updateWorkspace } from '../utils/workspace.utils';

export const handleGetAllNamespaces: IPCHandler<NamespaceGetAllResponse, NamespaceGetAllRequest> = async (_, { workspaceId }) => {
  const workspace = getWorkspaceById(workspaceId);
  const languageCodes = await getAllLanguageCodes(workspace);
  const namespaces = await getAllNamespaces(workspace.path, languageCodes);

  await updateWorkspace(workspace);

  return {
    namespaces,
  };
};

export const handleCreateNamespace: IPCHandler<NamespaceCreateResponse, NamespaceCreateRequest> = async (_, { workspaceId, namespace }) => {
  const workspace = getWorkspaceById(workspaceId);
  const languageCodes = await getAllLanguageCodes(workspace);

  if (await checkNamespaceDuplicated(workspace.path, namespace, languageCodes)) {
    throw new DuplicatedNamespaceError('Namespace already exists');
  }

  await Promise.all(
    languageCodes.map((languageCode) => {
      const namespacePath = getNamespacePath(workspace.path, namespace, languageCode);
      return writeFile(namespacePath, {});
    }),
  );

  await updateWorkspace(workspace);
};

export const handleDeleteNamespace: IPCHandler<NamespaceDeleteResponse, NamespaceDeleteRequest> = async (_, { workspaceId, namespace }) => {
  const workspace = getWorkspaceById(workspaceId);
  const languageCodes = await getAllLanguageCodes(workspace);

  await Promise.all(
    languageCodes.map((languageCode) => {
      const namespacePath = getNamespacePath(workspace.path, namespace, languageCode);
      return deleteFile(namespacePath);
    }),
  );

  await updateWorkspace(workspace);
};
