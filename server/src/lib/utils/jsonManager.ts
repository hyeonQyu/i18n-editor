import { LocaleJson } from '../defines/common/locale-json-info';
import { Config } from '../defines/common/config';
import { FileSystemManager } from './fileSystemManager';
import { LocaleJsonInfoVo } from '../defines/common/models';

const fs = require('fs');

export namespace JsonManager {
    export function generate(config: Config, localeJsonInfo: LocaleJsonInfoVo) {
        const { localeDirectoryPath, languages, defaultLanguage } = config;
        const { name, keyValues } = localeJsonInfo;
        const texts = keyValues.map(({ key }) => key).sort();

        try {
            FileSystemManager.createDirectoryWhenNotExist(localeDirectoryPath);

            languages.forEach((language) => {
                const languageDirectoryPath = `${localeDirectoryPath}/${language}`;
                FileSystemManager.createDirectoryWhenNotExist(languageDirectoryPath);

                const filePath = `${languageDirectoryPath}/${name}`;
                const json = JSON.stringify(JSON.parse(getJson(texts, filePath, language === defaultLanguage)), null, 4);

                fs.writeFileSync(filePath, json.replace(/\\\\/g, '\\'));
                console.log(`${language}/${name}`, '생성 완료');
            });
            console.log('다국어 JSON 파일 생성이 완료되었습니다.');
        } catch (e) {
            throw new Error(`다국어 JSON 파일 생성 중 오류가 발생했습니다.\n${e}`);
        }
    }

    function getJson(texts: string[], languageDirectoryPath: string, isDefaultLanguage: boolean) {
        const textMap: LocaleJson = getTextMap(languageDirectoryPath);

        return getPrettyJson(
            texts.reduce(
                (acc, text) => ({
                    ...acc,
                    [text]: textMap[text] || (isDefaultLanguage ? text : ''),
                }),
                {},
            ),
        );
    }

    function getTextMap(languageDirectoryPath: string): LocaleJson {
        if (!fs.existsSync(languageDirectoryPath)) {
            return {};
        }
        const jsonFile = fs.readFileSync(languageDirectoryPath, 'utf-8');
        return JSON.parse(jsonFile || '{}');
    }

    function getPrettyJson(obj: object) {
        return JSON.stringify(obj, null, 4);
    }
}
