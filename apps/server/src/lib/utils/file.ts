import fs from 'fs';
import { getExtensionName } from 'i18n-editor-common';

export const readFile = async (filePath: string) => {
  return JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
};

export const getFileNames = async (directoryPath: string, validFileExtensions: string[]) => {
  const validFileExtensionSet = new Set<string>(validFileExtensions);

  const getIsValidFile = (entry: fs.Dirent) => entry.isFile() && validFileExtensionSet.has(getExtensionName(entry.name));

  const files = await fs.promises.readdir(directoryPath, { withFileTypes: true });

  return files.filter(getIsValidFile).map((entry) => entry.name);
};

export const createFileWhenNotExist = async (filePath: string, content: string = '') => {
  if (!fs.existsSync(filePath)) {
    await fs.promises.writeFile(filePath, content);
  }
};
