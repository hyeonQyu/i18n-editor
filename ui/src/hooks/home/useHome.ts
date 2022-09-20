import useInput, { IUseInput } from '@hooks/common/useInput';
import { ChangeEvent, KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import { LocaleJson, LocaleJsonInfo } from '@defines/common/locale-json-info';
import useForm, { IUseForm } from '@hooks/common/useForm';
import useAlert from '@hooks/common/useAlert';
import useShortcuts from '@hooks/common/useShortcuts';
import useMutationSave from '@hooks/queries/useMutationSave';
import useQueryGetConfig from '@hooks/queries/useQueryGetConfig';
import { Language, LanguageNameByCode, LANGUAGES } from '@defines/common/translation';
import { SelectValue } from '@components/common/select/defines/selectBoxOption';
import useCheckable from '@hooks/common/useCheckable';
import { Checkable } from '@defines/checkable';
import KeyValueSet from '@utils/keyValueSet';
import { KeyValuePair } from '@defines/common/keyValuePair';

export interface IUseHomeParams {}

export interface IUseHome {
    values: IUseHomeValues;
    handlers: IUseHomeHandlers;
}

export interface IUseHomeValues {
    formProps: IUseForm;
    inputLocaleDirectoryPath: IUseInput;
    localeJsonInfo: LocaleJsonInfo;
    defaultLanguage: Language;
    inputText: IUseInput;
    inputFilterKeyword: IUseInput;
    checkedLanguages: Language[];
    loadingGetConfig: boolean;
    loadingSave: boolean;
}

export interface IUseHomeHandlers {
    handleTextInputKeyPress: KeyboardEventHandler<HTMLInputElement>;
    handleChangeLocaleJsonName: (name: string) => void;
    handleChangeLocaleJson: (data: LocaleJson) => void;
    handleDeleteText: (keyValue: KeyValuePair<string, string>) => void;
    handleSelectDefaultLanguage: (value: SelectValue) => void;
    handleSelectSupportedLanguage: (value: SelectValue) => void;
}

export default function useHome(params: IUseHomeParams): IUseHome {
    const {} = params;

    const formProps = useForm({
        onSubmit: () => {},
    });
    const inputLocaleDirectoryPath = useInput({});
    const { value: localeDirectoryPath, changeValue: setInputLocaleDirectory } = inputLocaleDirectoryPath;
    const [localeJsonInfo, setLocaleJsonInfo] = useState<LocaleJsonInfo>({ name: '', keyValueSet: new KeyValueSet() });
    const [defaultLanguage, setDefaultLanguage] = useState<Language>('ko');
    const inputText = useInput({});
    const inputFilterKeyword = useInput({});
    const [checkableLanguageItems, setCheckableLanguageItems] = useState<Checkable<Language>[]>(
        LANGUAGES.map((language) => {
            return {
                type: language,
                checked: false,
                label: LanguageNameByCode[language],
            };
        }),
    );
    const { checkedItemTypes: checkedLanguages, handleCheck: checkLanguage } = useCheckable<Language>({
        checkableItems: checkableLanguageItems,
    });

    const { showAlert } = useAlert();

    const { data: configData, isLoading: loadingGetConfig } = useQueryGetConfig();
    const { mutate: save, isLoading: loadingSave } = useMutationSave({
        onSuccess: (res) => {
            const { localeJsonInfo } = res;
            const { name, keyValues } = localeJsonInfo;
            setLocaleJsonInfo({
                name,
                keyValueSet: new KeyValueSet(keyValues),
            });
            showAlert('저장했습니다', 'success');
        },
    });

    useShortcuts({
        onCtrlS: () => {
            const { name, keyValueSet } = localeJsonInfo;
            save({
                config: { localeDirectoryPath, languages: checkedLanguages, defaultLanguage },
                localeJsonInfo: {
                    name,
                    keyValues: Array.from(keyValueSet),
                },
            });
        },
    });

    useEffect(() => {
        setInputLocaleDirectory(configData?.config?.localeDirectoryPath || '');
        setCheckableLanguageItems((prev) => {
            return prev.map(({ type, label }) => {
                return {
                    type,
                    label,
                    checked: configData?.config?.languages?.includes(type) ?? false,
                };
            });
        });
        setDefaultLanguage(configData?.config?.defaultLanguage || 'ko');
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
                    keyValueSet: new KeyValueSet([...Array.from(prev.keyValueSet), { key: value, value }]),
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
            const keyValues = Object.entries(data).map(([key, value]) => ({
                key,
                value,
            }));
            const set = new KeyValueSet(keyValues);
            return {
                ...prev,
                keyValueSet: set,
            };
        });
    };

    const handleDeleteText = (keyValue: KeyValuePair<string, string>) => {
        setLocaleJsonInfo((prev) => {
            prev.keyValueSet.delete(keyValue);
            const set = new KeyValueSet(Array.from(prev.keyValueSet));
            return {
                ...prev,
                keyValueSet: set,
            };
        });
    };

    const handleSelectDefaultLanguage = useCallback((value: SelectValue) => {
        setDefaultLanguage(value as Language);
    }, []);

    const handleSelectSupportedLanguage = useCallback((value: SelectValue) => {
        checkLanguage({ target: { value } } as ChangeEvent<HTMLInputElement>);
    }, []);

    return {
        values: {
            formProps,
            inputLocaleDirectoryPath,
            localeJsonInfo,
            defaultLanguage,
            inputText,
            inputFilterKeyword,
            checkedLanguages,
            loadingGetConfig,
            loadingSave,
        },
        handlers: {
            handleTextInputKeyPress,
            handleChangeLocaleJsonName,
            handleChangeLocaleJson,
            handleDeleteText,
            handleSelectDefaultLanguage,
            handleSelectSupportedLanguage,
        },
    };
}
