import Head from 'next/head';
import TableRow from '@components/home/components/table-row/tableRow';
import Input from '@components/common/input/Input';
import InputFile from '@components/common/input-file/inputFile';
import useHome from '@hooks/home/useHome';
import JsonPreview from '@components/home/components/json-preview/jsonPreview';

function Index() {
    const {
        values: { formProps, inputLocaleDirectoryPath, localeJsonInfo, inputText },
        handlers: { handleTextInputKeyPress, handleChangeLocaleJsonName, handleChangeLocaleJson, handleDeleteText },
    } = useHome({});

    return (
        <>
            <Head>
                <title>locale json 만들기</title>
            </Head>

            <div className={'wrapper'}>
                <div>
                    <form {...formProps}>
                        <TableRow title={'locale 폴더'}>
                            <Input {...inputLocaleDirectoryPath} placeholder={'locale 폴더 경로를 입력하세요'} />
                        </TableRow>
                        <TableRow title={'다국어 json 파일'}>
                            <InputFile
                                label={localeJsonInfo?.name}
                                acceptableExtensionList={['.json']}
                                onChangeFileName={handleChangeLocaleJsonName}
                                onChangeFileContent={handleChangeLocaleJson}
                                isFileJson
                            />
                        </TableRow>
                        <TableRow>
                            <Input {...inputText} onKeyPress={handleTextInputKeyPress} />
                        </TableRow>
                    </form>

                    <div className={'preview-wrapper'}>
                        <JsonPreview localeJsonInfo={localeJsonInfo} isKorean onDeleteText={handleDeleteText} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                .wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }

                .wrapper > div {
                    width: 600px;
                }

                form {
                }

                .preview-wrapper {
                    margin-top: 30px;
                }
            `}</style>
        </>
    );
}

export default Index;
