import { EXTENSIONS_SUFFIX, removeExtension, Workspace } from 'i18n-editor-common';
import { createTimestamp } from 'i18n-editor-common/lib/utils/time';
import { BadRequestError, NotFoundError } from '../../../defines/errors';
import { getFileNames } from '../../../utils/file';
import { getLanguageCodes } from '../../../utils/locale';
import configService from '../ConfigService';

const getWorkspaces = () => {
  const { workspaces } = configService.getConfig();
  return [...workspaces];
};

const createWorkspace = async ({ name, path }: Pick<Workspace, 'name' | 'path'>) => {
  const workspaces = getWorkspaces();

  const existingWorkspaceIndex = workspaces.findIndex((workspace) => workspace.path === path);

  if (existingWorkspaceIndex !== -1) {
    workspaces.splice(existingWorkspaceIndex, 1);
  }

  workspaces.push({ name, path, lastOpenedAt: createTimestamp() });

  await configService.setWorkspaces(workspaces);
};

const updateWorkspace = async (path: string, name: string) => {
  const workspaces = getWorkspaces();

  const existingWorkspaceIndex = workspaces.findIndex((workspace) => workspace.path === path);

  if (existingWorkspaceIndex === -1) {
    throw new NotFoundError('Workspace not found');
  }

  workspaces[existingWorkspaceIndex].name = name;
  await configService.setWorkspaces(workspaces);
};

const getAllNamespaces = async (rootPath: string, languages: string[]) => {
  const jsonFileNames: string[] = [];

  const jsonFileNamesList = await Promise.all(
    languages.map((language) => {
      const directoryPath = `${rootPath}/${language}`;
      return getFileNames(directoryPath, [EXTENSIONS_SUFFIX.json]);
    }),
  );

  jsonFileNamesList.forEach((fileNames) => {
    jsonFileNames.push(...fileNames);
  });

  return Array.from(new Set(jsonFileNames)).map(removeExtension);
};

const getWorkspace = async (path: string) => {
  const languages = await getLanguageCodes(path);

  if (languages.length === 0) {
    throw new BadRequestError('올바른 workspace가 아닙니다.');
  }

  return await getAllNamespaces(path, languages);
};

const workspaceService = {
  getWorkspaces,
  createWorkspace,
  updateWorkspace,
  getWorkspace,
};

export default workspaceService;
