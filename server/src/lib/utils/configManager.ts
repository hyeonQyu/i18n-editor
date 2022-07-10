import { Env } from '../defines/appOption';
import { Config } from '../defines/common/config';

const fs = require('fs');

export namespace ConfigManager {
    let configFilePath: string;
    const defaultConfig: Config = {
        localeDirectoryPath: `${process.cwd()}/public/locales`,
    };

    export function init(env: Env) {
        configFilePath =
            env === 'production' ? `${process.cwd()}/node_modules/locale-json-manager/ljm-config.json` : `${process.cwd()}/ljm-config.json`;
    }

    export function read(): Config {
        try {
            const jsonFile = fs.readFileSync(configFilePath, 'utf-8');
            return JSON.parse(jsonFile) as Config;
        } catch (e) {
            console.log(configFilePath, '이 존재하지 않습니다. 새로운 ljm-config.json 파일을 생성합니다.');
            save(defaultConfig);
            return defaultConfig;
        }
    }

    export function save(config: Config) {
        try {
            fs.writeFileSync(configFilePath, config);
            console.log(configFilePath, '을 성공적으로 저장했습니다.');
        } catch (e) {
            throw new Error(`${configFilePath} 생성 중 오류가 발생했습니다.\n${e}`);
        }
    }
}
