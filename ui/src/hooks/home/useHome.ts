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
    localeJsonInfo: LocaleJsonInfo | undefined;
    inputMessage: IUseInput;
}

export interface IUseHomeHandlers {
    handleMessageInputKeyPress: KeyboardEventHandler<HTMLInputElement>;
    handleChangeLocaleJsonName: (name: string) => void;
    handleChangeLocaleJson: (data: LocaleJson) => void;
}

export default function useHome(params: IUseHomeParams): IUseHome {
    const {} = params;

    const formProps = useForm({
        onSubmit: () => {},
    });
    const inputLocaleDirectoryPath = useInput({});
    const [localeJsonInfo, setLocaleJsonInfo] = useState<LocaleJsonInfo>();
    const inputMessage = useInput({});

    const handleMessageInputKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            setLocaleJsonInfo((prev) => {
                if (!prev) {
                    return undefined;
                }

                return {
                    ...prev,
                    messageSet: new Set<string>([...Array.from(prev.messageSet), inputMessage.value]),
                };
            });
            inputMessage.changeValue('');
        }
    };

    const handleChangeLocaleJsonName = (name: string) => {
        setLocaleJsonInfo((prev) => {
            if (!prev) {
                return {
                    name,
                    messageSet: new Set(),
                };
            }
            return {
                ...prev,
                name,
            };
        });
    };

    const handleChangeLocaleJson = (data: LocaleJson) => {
        setLocaleJsonInfo((prev) => {
            const messages = Object.keys(data).map((key) => key);
            const set = new Set(messages);

            if (!prev) {
                return {
                    name: '',
                    messageSet: set,
                };
            }
            return {
                ...prev,
                messageSet: set,
            };
        });
    };

    return {
        values: {
            formProps,
            inputLocaleDirectoryPath,
            localeJsonInfo,
            inputMessage,
        },
        handlers: {
            handleMessageInputKeyPress,
            handleChangeLocaleJsonName,
            handleChangeLocaleJson,
        },
    };
}
