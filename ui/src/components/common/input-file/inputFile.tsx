import React from 'react';
import useInputFile from './useInputFile';

export interface InputFileProps<T> {
    acceptableExtensionList: string[];
    isFileJson?: boolean;
    onChangeFileName?: (name: string) => void;
    onChangeFileContent?: (fileContent: T) => void;
    onMouseEnterText?: () => void;
    onMouseLeaveText?: () => void;
    label?: string;
}

function InputFile<T>(props: InputFileProps<T>) {
    const { acceptableExtensionList, label, onMouseEnterText = () => {}, onMouseLeaveText = () => {} } = props;

    const { inputRef } = useInputFile<T>({
        ...props,
    });

    return (
        <>
            <div>
                <label htmlFor={'input-file'}>파일 선택</label>
                <span onMouseEnter={onMouseEnterText} onMouseLeave={onMouseLeaveText}>
                    {label}
                </span>
                <input id={'input-file'} type={'file'} ref={inputRef} accept={acceptableExtensionList.join()} />
            </div>

            <style jsx>{`
                label {
                    background-color: white;
                    border: 1px solid #a1a1a1;
                    border-radius: 20px;
                    cursor: pointer;
                    color: #5f5f5f;
                    padding: 5px 10px;
                    transition: 0.3s;
                }

                label:hover {
                    background-color: #f3f7f8;
                    border: 1px solid #cecece;
                }

                span {
                    margin-left: 10px;
                    color: #5f5f5f;
                }

                input {
                    position: absolute;
                    display: none;
                }
            `}</style>
        </>
    );
}

export default InputFile;
