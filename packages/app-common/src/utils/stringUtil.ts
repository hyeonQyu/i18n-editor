export namespace StringUtil {
  export function getNormalizedPath(path: string) {
    return path.replace(/\\/g, '/');
  }

  export function getExtensionName(fileName: string) {
    return fileName.slice(fileName.lastIndexOf('.') + 1);
  }

  export function getLastEntryFromPath<T extends string>(path: string): T {
    return path.slice(path.lastIndexOf('/') + 1) as T;
  }
}
