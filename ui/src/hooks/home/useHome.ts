import useInput, { IUseInput } from '@hooks/common/useInput';
import { KeyboardEventHandler, useState } from 'react';
import { LocaleJson, LocaleJsonInfo } from '@defines/locale-json-info';
import useForm, { IUseForm } from '@hooks/common/useForm';

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
}

export interface IUseHomeHandlers {
    handleTextInputKeyPress: KeyboardEventHandler<HTMLInputElement>;
    handleChangeLocaleJsonName: (name: string) => void;
    handleChangeLocaleJson: (data: LocaleJson) => void;
    handleDeleteText: (text: string) => void;
}

export default function useHome(params: IUseHomeParams): IUseHome {
    const {} = params;

    const formProps = useForm({
        onSubmit: () => {},
    });
    const inputLocaleDirectoryPath = useInput({});
    const [localeJsonInfo, setLocaleJsonInfo] = useState<LocaleJsonInfo>({ name: '', textSet: new Set() });
    const inputText = useInput({});

    const handleTextInputKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            setLocaleJsonInfo((prev) => {
                return {
                    ...prev,
                    textSet: new Set<string>([...Array.from(prev.textSet), inputText.value]),
                };
            });
            inputText.changeValue('');
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

    return {
        values: {
            formProps,
            inputLocaleDirectoryPath,
            localeJsonInfo,
            inputText,
        },
        handlers: {
            handleTextInputKeyPress,
            handleChangeLocaleJsonName,
            handleChangeLocaleJson,
            handleDeleteText,
        },
    };
}
