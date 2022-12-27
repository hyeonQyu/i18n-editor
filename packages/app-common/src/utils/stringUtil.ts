export namespace StringUtil {
  export function getNormalizedPath(path: string) {
    return path.replace(/\\/g, '/');
  }
}
