import React from 'react';
import useInputFile from './useInputFile';
import classNames from 'classnames';

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

    const { inputRef, isDragging, handleDragEnter, handleDragLeave, handleDragOver, handleDrop } = useInputFile<T>({
        ...props,
    });

    return (
        <>
            <div
                className={classNames('wrapper', isDragging && 'dragging')}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className={'button-wrapper'}>
                    <label htmlFor={'input-file'}>파일 선택</label>
                </div>
                <div className={'content'}>
                    <div className={'label'} onMouseEnter={onMouseEnterText} onMouseLeave={onMouseLeaveText}>
                        {label ?? '파일을 여기로 끌어오기'}
                    </div>
                </div>
                <input id={'input-file'} type={'file'} ref={inputRef} accept={acceptableExtensionList.join()} />
            </div>

            <style jsx>{`
                .wrapper {
                    height: 120px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 4px dotted #eaecee;
                    border-radius: 20px;
                    position: relative;
                }
                .wrapper.dragging {
                    border: 4px dotted #0070f3;
                }

                .content {
                }

                .button-wrapper {
                    position: absolute;
                    top: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

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

                .label {
                    color: ${label ? '#424242' : '#b1b1b1'};
                    margin-top: 10px;
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
