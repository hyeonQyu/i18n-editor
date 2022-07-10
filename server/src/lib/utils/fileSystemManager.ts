export namespace FileSystemManager {
    const fs = require('fs');

    export function createDirectoryWhenNotExist(directoryPath: string) {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }
    }
}
