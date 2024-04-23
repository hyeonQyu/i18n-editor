/**
 * "/"로 시작하는 문자열 반환
 * @param str
 */
export const getLeadingSlash = (str: string) => {
  return str.startsWith('/') ? str : `/${str}`;
};
