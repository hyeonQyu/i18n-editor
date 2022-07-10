import { ConfigRes, SaveReq } from '../defines/common/models';
import { JsonManager } from '../utils/jsonManager';
import { ConfigManager } from '../utils/configManager';

export namespace Service {
    export function postSave(req: SaveReq): number {
        const { config, localeJsonInfo } = req;

        try {
            ConfigManager.save(config);
            JsonManager.generate(config, localeJsonInfo);
            return 200;
        } catch (e) {
            console.error('/save', e);
            return 500;
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
