export namespace StringUtil {
  export function getNormalizedPath(path: string) {
    return path.replace(/\\/g, '/');
  }

  export function getExtensionName(fileName: string) {
    return fileName.slice(fileName.lastIndexOf('.') + 1);
  }
}
