import { SaveReq } from '../defines/models';

export namespace Service {
    export async function postSave(req: SaveReq): Promise<number> {
        try {
            return 200;
        } catch (e) {
            console.error('/save', e);
            return 500;
        }
    }
}
