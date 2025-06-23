const getLeading = (str: string, leading: string) => {
  return str.startsWith(leading) ? str : `${leading}${str}`;
};

export const getLeadingSlash = (str: string) => {
  return getLeading(str, '/');
};

export const getExtensionName = (fileName: string) => {
  return fileName.slice(fileName.lastIndexOf('.') + 1);
};

export const removeExtension = (fileName: string) => {
  const lastDotIndex = fileName.lastIndexOf('.');
  return lastDotIndex > 0 ? fileName.slice(0, lastDotIndex) : fileName;
};

export const generateUniqueID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
};
