const getLeading = (str: string, leading: string) => {
  return str.startsWith(leading) ? str : `${leading}${str}`;
};

/**
 * "/"로 시작하는 문자열 반환
 * @param str
 */
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
