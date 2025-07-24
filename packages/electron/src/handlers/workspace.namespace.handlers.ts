import {
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

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  const languageCodes = await getAllLanguageCodes(workspace);

  if (languageCodes.length === 0) {
    throw new Error('Invalid workspace');
  }

  const namespaces = await getAllNamespaces(workspace.path, languageCodes);
  await updateWorkspace(workspace);

  return {
    namespaces,
  };
};

export const handleCreateNamespace: IPCHandler<NamespaceCreateResponse, NamespaceCreateRequest> = async (_, { workspaceId, namespace }) => {
  const workspace = getWorkspaceById(workspaceId);

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  const languageCodes = await getAllLanguageCodes(workspace);

  if (languageCodes.length === 0) {
    throw new Error('Invalid workspace');
  }

  if (await checkNamespaceDuplicated(workspace.path, namespace, languageCodes)) {
    throw new Error('Namespace already exists');
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

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  const languageCodes = await getAllLanguageCodes(workspace);

  if (languageCodes.length === 0) {
    throw new Error('Invalid workspace');
  }

  await Promise.all(
    languageCodes.map((languageCode) => {
      const namespacePath = getNamespacePath(workspace.path, namespace, languageCode);
      return deleteFile(namespacePath);
    }),
  );

  await updateWorkspace(workspace);
};
