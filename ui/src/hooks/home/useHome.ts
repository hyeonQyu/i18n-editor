import useInput, { IUseInput } from '@hooks/common/useInput';
import { KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import { LocaleJson, LocaleJsonInfo } from '@defines/common/locale-json-info';
import useForm, { IUseForm } from '@hooks/common/useForm';
import useAlert from '@hooks/common/useAlert';
import useShortcuts from '@hooks/common/useShortcuts';
import useMutationSave from '@hooks/queries/useMutationSave';
import useQueryGetConfig from '@hooks/queries/useQueryGetConfig';
import { Language } from '@defines/common/translation';
import { SelectValue } from '@components/common/select/defines/selectBoxOption';

export interface IUseHomeParams {}

export interface IUseHome {
    values: IUseHomeValues;
    handlers: IUseHomeHandlers;
}

export interface IUseHomeValues {
    formProps: IUseForm;
    inputLocaleDirectoryPath: IUseInput;
    localeJsonInfo: LocaleJsonInfo;
    inputText: IUseInput;
    inputFilterKeyword: IUseInput;
}

export interface IUseHomeHandlers {
    handleTextInputKeyPress: KeyboardEventHandler<HTMLInputElement>;
    handleChangeLocaleJsonName: (name: string) => void;
    handleChangeLocaleJson: (data: LocaleJson) => void;
    handleDeleteText: (text: string) => void;
    handleSelectSupportedLanguage: (value: SelectValue, selected?: boolean, index?: number) => void;
}

export default function useHome(params: IUseHomeParams): IUseHome {
    const {} = params;

    const formProps = useForm({
        onSubmit: () => {},
    });
    const inputLocaleDirectoryPath = useInput({});
    const { value: localeDirectoryPath, changeValue: setInputLocaleDirectory } = inputLocaleDirectoryPath;
    const [localeJsonInfo, setLocaleJsonInfo] = useState<LocaleJsonInfo>({ name: '', textSet: new Set() });
    const inputText = useInput({});
    const inputFilterKeyword = useInput({});
    const [supportedLanguages, setSupportedLanguages] = useState<Language[]>([]);

    const { showAlert } = useAlert();

    const { data: configData } = useQueryGetConfig();
    const { mutate: save } = useMutationSave({
        onSuccess: (res) => {
            const { localeJsonInfo } = res;
            const { name, texts } = localeJsonInfo;
            setLocaleJsonInfo({
                name,
                textSet: new Set(texts),
            });
            showAlert('저장했습니다', 'success');
        },
    });

    useShortcuts({
        onCtrlS: () => {
            const { name, textSet } = localeJsonInfo;
            save({
                config: { localeDirectoryPath, languages: supportedLanguages },
                localeJsonInfo: {
                    name,
                    texts: Array.from(textSet),
                },
            });
        },
    });

    useEffect(() => {
        setInputLocaleDirectory(configData?.config?.localeDirectoryPath || '');
    }, [configData]);

    const handleTextInputKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            if (!localeJsonInfo.name) {
                showAlert('다국어 JSON 파일을 먼저 추가하세요', 'warning');
                return;
            }

            const { value, changeValue } = inputText;

            if (!value) {
                return;
            }

            setLocaleJsonInfo((prev) => {
                return {
                    ...prev,
                    textSet: new Set<string>([...Array.from(prev.textSet), value]),
                };
            });
            changeValue('');
        }
    };

    const handleChangeLocaleJsonName = (name: string) => {
        setLocaleJsonInfo((prev) => {
            return {
                ...prev,
                name,
            };
        });
    };

    const handleChangeLocaleJson = (data: LocaleJson) => {
        setLocaleJsonInfo((prev) => {
            const texts = Object.keys(data).map((key) => key);
            const set = new Set(texts);
            return {
                ...prev,
                textSet: set,
            };
        });
    };

    const handleDeleteText = (text: string) => {
        setLocaleJsonInfo((prev) => {
            prev.textSet.delete(text);
            const set = new Set(prev.textSet);
            return {
                ...prev,
                textSet: set,
            };
        });
    };

    const handleSelectSupportedLanguage = useCallback((value: SelectValue, selected?: boolean, _?: number) => {
        setSupportedLanguages((prev) => {
            return selected ? [...prev, value as Language] : prev.filter((language) => language !== value);
        });
    }, []);

    return {
        values: {
            formProps,
            inputLocaleDirectoryPath,
            localeJsonInfo,
            inputText,
            inputFilterKeyword,
        },
        handlers: {
            handleTextInputKeyPress,
            handleChangeLocaleJsonName,
            handleChangeLocaleJson,
            handleDeleteText,
            handleSelectSupportedLanguage,
        },
    };
}
