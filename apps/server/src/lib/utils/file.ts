import { spawn } from 'child_process';
import fs from 'fs';
import { getExtensionName, getLeadingSlash } from 'i18n-editor-common';
import { normalize } from 'path';
import { CMD_BY_OS } from '../defines/env';
import { getOS } from './env';

const getNormalizedPath = (path: string) => {
  const os = getOS();

  const normalizedPath = normalize(path);

  if (os === 'win') {
    return normalizedPath;
  }

  return getLeadingSlash(normalizedPath);
};

export const getCurrentWorkingDirectory = () => {
  return getNormalizedPath(process.cwd()).replace(/\\/g, '/');
};

export const readFile = async (filePath: string) => {
  return JSON.parse(await fs.promises.readFile(getNormalizedPath(filePath), 'utf-8'));
};

export const writeFile = async (filePath: string, content: object) => {
  await fs.promises.writeFile(getNormalizedPath(filePath), JSON.stringify(content));
};

export const readDirectory: typeof fs.promises.readdir = async (path, options) => {
  // @ts-ignore
  return fs.promises.readdir(getNormalizedPath(path), options);
};

export const getFileNames = async (directoryPath: string, validFileExtensions: string[]) => {
  const validFileExtensionSet = new Set<string>(validFileExtensions.map((ext) => ext.replace('.', '')));

  const getIsValidFile = (entry: fs.Dirent) => entry.isFile() && validFileExtensionSet.has(getExtensionName(entry.name));

  const files = await readDirectory(directoryPath, { withFileTypes: true });

  return files.filter(getIsValidFile).map((entry) => entry.name);
};

export const createFileWhenNotExist = async (filePath: string, content: object) => {
  const path = getNormalizedPath(filePath);

  if (!fs.existsSync(path)) {
    await writeFile(path, content);
  }
};

export const getIsExistFile = (filePath: string) => {
  const path = getNormalizedPath(filePath);
  return fs.existsSync(path);
};

export const openFileManager = (path: string) => {
  const { openFileManager } = CMD_BY_OS[getOS()];
  spawn(openFileManager, [getNormalizedPath(path)]);
};
