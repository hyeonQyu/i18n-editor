export namespace StringFormatter {
    export function getNormalizedPath(path: string) {
        return path.replace(/\\/g, '/');
    }
}
