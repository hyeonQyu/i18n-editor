import fs from 'fs';

export const readFile = async (filePath: string) => {
  return JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
};
