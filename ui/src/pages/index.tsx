import Head from 'next/head';
import TableRow from '@components/home/components/table-row/tableRow';
import Input from '@components/common/input/Input';
import InputFile from '@components/common/input-file/inputFile';
import useHome from '@hooks/home/useHome';
import JsonPreview from '@components/home/components/json-preview/jsonPreview';
import SearchInput from '@components/common/input/searchInput';
import Select, { Option } from '@components/common/select/select';
import { LanguageNameByCode, LANGUAGES } from '@defines/common/translation';

function Index() {
    const {
        values: { formProps, inputLocaleDirectoryPath, localeJsonInfo, inputText, inputFilterKeyword, checkedLanguages },
        handlers: {
            handleTextInputKeyPress,
            handleChangeLocaleJsonName,
            handleChangeLocaleJson,
            handleDeleteText,
            handleSelectSupportedLanguage,
        },
    } = useHome({});

    return (
        <>
            <Head>
                <title>locale JSON 만들기</title>
            </Head>

            <div className={'wrapper'}>
                <div>
                    <form {...formProps}>
                        <TableRow title={'locale 폴더'}>
                            <Input {...inputLocaleDirectoryPath} placeholder={'locale 폴더 경로를 입력하세요'} />
                        </TableRow>
                        <TableRow title={'다국어 JSON 파일'}>
                            <InputFile
                                label={localeJsonInfo?.name}
                                acceptableExtensionList={['.json']}
                                onChangeFileName={handleChangeLocaleJsonName}
                                onChangeFileContent={handleChangeLocaleJson}
                                isFileJson
                            />
                        </TableRow>
                    </form>

                    <div className={'preview'}>
                        <div className={'preview-menu'}>
                            <Select
                                width={'55%'}
                                value={checkedLanguages}
                                boxTitle={'지원하는 언어를 선택하세요'}
                                optionSize={5}
                                onChange={handleSelectSupportedLanguage}
                            >
                                {LANGUAGES.map((language) => (
                                    <Option value={language} key={language}>
                                        {LanguageNameByCode[language]}
                                    </Option>
                                ))}
                            </Select>
                            <SearchInput {...inputFilterKeyword} placeholder={'문구 찾기'} width={'40%'} />
                        </div>

                        <div className={'preview-wrapper'}>
                            <JsonPreview
                                filterKeyword={inputFilterKeyword.value}
                                localeJsonInfo={localeJsonInfo}
                                isKorean
                                onDeleteText={handleDeleteText}
                            />
                        </div>

                        <div className={'add-text'}>
                            <Input {...inputText} onKeyPress={handleTextInputKeyPress} placeholder={'추가할 문구를 입력하세요'} />
                        </div>
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

                .preview {
                    margin-top: 20px;
                }

                .preview > :global(*:not(:first-child)) {
                    margin-top: 10px;
                }

                .preview-menu {
                    display: flex;
                    justify-content: space-between;
                }
            `}</style>
        </>
    );
}

export default Index;
