import { MutableRefObject, useEffect, useRef } from 'react';
import { InputFileProps } from '@components/common/input-file/inputFile';
import useAlert from '@hooks/common/useAlert';

export interface IUseInputFileParams<T> extends InputFileProps<T> {}

export interface IUseInputFile<T> {
    inputRef: MutableRefObject<HTMLInputElement | null>;
}

export default function useInputFile<T>(params: IUseInputFileParams<T>): IUseInputFile<T> {
    const { acceptableExtensionList, isFileJson = false, onChangeFileName = () => {}, onChangeFileContent = () => {} } = params;
    const inputRef = useRef<HTMLInputElement>(null);
    const { showAlert } = useAlert();

    useEffect(() => {
        const { current } = inputRef;
        if (!current) {
            return;
        }

        const handleChangeFile = async () => {
            const { files } = current;
            if (!files || !files[0]) {
                return;
            }

            const { name } = files[0];
            const arr = name.split('.');
            const extension = `.${arr[arr.length - 1]}`;

            if (acceptableExtensionList.indexOf(extension) === -1) {
                showAlert('유효하지 않은 파일 형식입니다.', 'warning');
                return;
            }

            const content = await files[0].text();
            onChangeFileName(name);
            onChangeFileContent(isFileJson ? JSON.parse(content) : content);
        };

        current.addEventListener('change', handleChangeFile);
        return () => current.removeEventListener('change', handleChangeFile);
    }, [inputRef, acceptableExtensionList, isFileJson, onChangeFileContent, onChangeFileName, showAlert]);

    return {
        inputRef,
    };
}
