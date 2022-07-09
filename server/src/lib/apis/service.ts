import { SaveReq } from '../defines/models';
import { JsonManager } from '../utils/jsonManager';

export namespace Service {
    export async function postSave(req: SaveReq): Promise<number> {
        const { localeDirectoryPath, localeJsonInfo } = req;

        try {
            JsonManager.generate(localeDirectoryPath, localeJsonInfo);
            return 200;
        } catch (e) {
            console.error('/save', e);
            return 500;
        }
    }
}
