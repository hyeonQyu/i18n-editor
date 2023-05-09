import { LanguageCode } from 'i18n-editor-common';

export interface DeleteColumnConfirmMessageTemplateProps {
  languageCode: LanguageCode;
  translationFileName: string;
}

function DeleteColumnConfirmMessageTemplate(props: DeleteColumnConfirmMessageTemplateProps) {
  const { languageCode, translationFileName } = props;

  return (
    <>
      <>
        <strong>{languageCode}</strong>
        <span>의 모든 번역값을 삭제해요</span>
        <br />
        <br />
        <span>현재 Locale 디렉토리에서 </span>
        <strong className={'warn'}>{languageCode} 디렉토리를 삭제</strong>
        <span>하며</span>
        <br />
        <strong>{translationFileName}을 제외한 모든 번역 파일</strong>
        <span>에서도</span>
        <br />
        <strong className={'warn'}>{languageCode}를 삭제</strong>
        <span>해요</span>
      </>

      <style jsx>{`
        strong {
          font-weight: bold;
        }

        .warn {
          color: var(--red-500);
        }
      `}</style>
    </>
  );
}

export default DeleteColumnConfirmMessageTemplate;
