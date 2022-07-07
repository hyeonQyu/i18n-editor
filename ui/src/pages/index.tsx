import Head from 'next/head';
import TableRow from '@components/home/components/table-row/tableRow';
import Input from '@components/common/input/Input';
import InputFile from '@components/common/input-file/inputFile';
import useHome from '@hooks/home/useHome';
import JsonPreview from '@components/home/components/json-preview/jsonPreview';

export interface IndexProps {}

function Index(props: IndexProps) {
    const {} = props;
    const {
        values: { formProps, inputLocaleDirectoryPath, localeJsonInfo, inputMessage },
        handlers: { handleMessageInputKeyPress, handleChangeLocaleJsonName, handleChangeLocaleJson },
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
                            <Input {...inputMessage} onKeyPress={handleMessageInputKeyPress} />
                        </TableRow>
                    </form>

                    <div className={'preview-wrapper'}>
                        <JsonPreview localeJsonInfo={localeJsonInfo} />
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

                form {
                    width: 600px;
                }

                .preview-wrapper {
                    margin-top: 30px;
                }
            `}</style>
        </>
    );
}

export default Index;
