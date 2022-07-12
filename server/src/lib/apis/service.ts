import { ConfigRes, SaveReq, SaveRes } from '../defines/common/models';
import { JsonManager } from '../utils/jsonManager';
import { ConfigManager } from '../utils/configManager';

export namespace Service {
    export function postSave(req: SaveReq): SaveRes {
        const { config, localeJsonInfo } = req;

        try {
            ConfigManager.save(config);
            JsonManager.generate(config, localeJsonInfo);
            return {
                status: 200,
                localeJsonInfo,
            };
        } catch (e) {
            console.error('/save', e);
            return {
                status: 500,
            };
        }
    }

    export function getConfig(): ConfigRes {
        try {
            return {
                config: ConfigManager.read(),
                status: 200,
            };
        } catch (e) {
            console.error('/config', e);
            return {
                status: 500,
            };
        }
    }
}
