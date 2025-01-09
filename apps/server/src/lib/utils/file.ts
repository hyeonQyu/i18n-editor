import fs from 'fs';
import { getExtensionName, getLeadingSlash } from 'i18n-editor-common';

export const readFile = async (filePath: string) => {
  return JSON.parse(await fs.promises.readFile(getLeadingSlash(filePath), 'utf-8'));
};

export const writeFile = async (filePath: string, content: object) => {
  await fs.promises.writeFile(getLeadingSlash(filePath), JSON.stringify(content));
};

export const readDirectory: typeof fs.promises.readdir = async (path, options) => {
  // @ts-ignore
  return fs.promises.readdir(getLeadingSlash(path), options);
};

export const getFileNames = async (directoryPath: string, validFileExtensions: string[]) => {
  const validFileExtensionSet = new Set<string>(validFileExtensions.map((ext) => ext.replace('.', '')));

  const getIsValidFile = (entry: fs.Dirent) => entry.isFile() && validFileExtensionSet.has(getExtensionName(entry.name));

  const files = await readDirectory(directoryPath, { withFileTypes: true });

  return files.filter(getIsValidFile).map((entry) => entry.name);
};

export const createFileWhenNotExist = async (filePath: string, content: object) => {
  const path = getLeadingSlash(filePath);

  if (!fs.existsSync(path)) {
    await writeFile(path, content);
  }
};
