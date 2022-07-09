import { LocaleJson, LocaleJsonInfo } from '../defines/common/locale-json-info';
import { LANGUAGES } from '../defines/translation';

const fs = require('fs');

export namespace JsonManager {
    export function generate(localeDirectoryPath: string, localeJsonInfo: LocaleJsonInfo) {
        const { name, textSet } = localeJsonInfo;

        if (!fs.existsSync(localeDirectoryPath)) {
            fs.mkdirSync(localeDirectoryPath);
        }

        LANGUAGES.forEach((language) => {
            const texts = Array.from(textSet);
            const languageDirectoryPath = `${localeDirectoryPath}/${language}/${name}`;
            const json = language === 'ko' ? getKoreanJson(texts) : getNotKoreanJson(texts, languageDirectoryPath);

            console.log('언어: ', language);
            console.log(json);

            fs.writeFileSync(languageDirectoryPath, json);
        });
    }

    function getKoreanJson(texts: string[]) {
        return getPrettyJson(
            texts.reduce(
                (acc, text) => ({
                    ...acc,
                    [text]: text,
                }),
                {},
            ),
        );
    }

    function getNotKoreanJson(texts: string[], languageDirectoryPath: string) {
        const textMap: LocaleJson = getTextMap(languageDirectoryPath);

        return getPrettyJson(
            texts.reduce(
                (acc, text) => ({
                    ...acc,
                    [text]: textMap[text] ?? '',
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
        return JSON.parse(jsonFile);
    }

    function getPrettyJson(obj: object) {
        return JSON.stringify(obj, null, 4);
    }
}
