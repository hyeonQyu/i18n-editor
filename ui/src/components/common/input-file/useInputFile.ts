import { DragEventHandler, MutableRefObject, useEffect, useRef, useState } from 'react';
import { InputFileProps } from '@components/common/input-file/inputFile';
import useAlert from '@hooks/common/useAlert';

export interface IUseInputFileParams<T> extends InputFileProps<T> {}

export interface IUseInputFile<T> {
    inputRef: MutableRefObject<HTMLInputElement | null>;
    isDragging: boolean;
    handleDragEnter: DragEventHandler<HTMLDivElement>;
    handleDragLeave: DragEventHandler<HTMLDivElement>;
    handleDragOver: DragEventHandler<HTMLDivElement>;
    handleDrop: DragEventHandler<HTMLDivElement>;
}

export default function useInputFile<T>(params: IUseInputFileParams<T>): IUseInputFile<T> {
    const { acceptableExtensionList, isFileJson = false, onChangeFileName = () => {}, onChangeFileContent = () => {} } = params;
    const inputRef = useRef<HTMLInputElement>(null);
    const { showAlert } = useAlert();
    const [isDragging, setIsDragging] = useState(false);

    const changeFile = async (files: FileList) => {
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

            await changeFile(files);
        };

        current.addEventListener('change', handleChangeFile);
        return () => current.removeEventListener('change', handleChangeFile);
    }, [changeFile, inputRef, acceptableExtensionList, isFileJson, onChangeFileContent, onChangeFileName, showAlert]);

    const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
    };

    const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer!.files) {
            setIsDragging(true);
        }
    };

    const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
        changeFile(e.dataTransfer.files);
    };

    return {
        inputRef,
        isDragging,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
    };
}
