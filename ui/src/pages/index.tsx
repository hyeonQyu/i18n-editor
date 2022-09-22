import Head from 'next/head';
import TableRow from '@components/home/components/table-row/tableRow';
import Input from '@components/common/input/Input';
import InputFile from '@components/common/input-file/inputFile';
import useHome from '@hooks/home/useHome';
import JsonPreview from '@components/home/components/json-preview/jsonPreview';
import SearchInput from '@components/common/input/searchInput';
import Select, { Option } from '@components/common/select/select';
import { LanguageNameByCode, LANGUAGES } from '@defines/common/translation';
import Lottie from 'lottie-react';
import { assetLottie } from '@public/assets/lotties';

function Index() {
    const {
        values: {
            formProps,
            inputLocaleDirectoryPath,
            localeJsonInfo,
            defaultLanguage,
            inputText,
            inputFilterKeyword,
            checkedLanguages,
            loadingGetConfig,
        },
        handlers: {
            handleTextInputKeyPress,
            handleChangeLocaleJsonName,
            handleChangeLocaleJson,
            handleDeleteText,
            handleSelectDefaultLanguage,
            handleSelectSupportedLanguage,
        },
    } = useHome({});

    return (
        <>
            <Head>
                <title>locale JSON 만들기</title>
            </Head>

            <div className={'wrapper'}>
                {loadingGetConfig ? (
                    <Lottie animationData={assetLottie.getConfig} />
                ) : (
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
                            <TableRow title={'기본 언어 설정'}>
                                <Select value={defaultLanguage} boxTitle={'기본 언어를 선택하세요'} onChange={handleSelectDefaultLanguage}>
                                    {LANGUAGES.map((language) => (
                                        <Option value={language} key={language}>
                                            {LanguageNameByCode[language]}
                                        </Option>
                                    ))}
                                </Select>
                            </TableRow>
                            <TableRow title={'지원 언어 설정'}>
                                <Select
                                    value={checkedLanguages}
                                    boxTitle={'지원하는 언어를 선택하세요'}
                                    onChange={handleSelectSupportedLanguage}
                                >
                                    {LANGUAGES.map((language) => (
                                        <Option value={language} key={language}>
                                            {LanguageNameByCode[language]}
                                        </Option>
                                    ))}
                                </Select>
                            </TableRow>
                        </form>

                        <div className={'preview'}>
                            <div className={'preview-menu'}>
                                <Input
                                    width={'58%'}
                                    {...inputText}
                                    onKeyPress={handleTextInputKeyPress}
                                    placeholder={'추가할 문구를 입력하세요'}
                                />

                                <SearchInput {...inputFilterKeyword} placeholder={'문구 찾기'} width={'40%'} />
                            </div>

                            <div className={'preview-wrapper'}>
                                <JsonPreview
                                    filterKeyword={inputFilterKeyword.value}
                                    localeJsonInfo={localeJsonInfo}
                                    onDeleteText={handleDeleteText}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100%;
                }

                .wrapper > div {
                    width: 600px;
                    padding: 40px 0;
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
