export interface InvalidLocaleDirectoryConfirmMessageTemplateProps {}

export function InvalidLocaleDirectoryConfirmMessageTemplate(props: InvalidLocaleDirectoryConfirmMessageTemplateProps) {
  const {} = props;

  return (
    <>
      <div className={'template'}>
        <p>현재 선택한 디렉토리에는</p>
        <p>
          <strong>언어 코드 이름</strong>을 가진 디렉토리가 없어요
        </p>
        <p>
          <strong>언어 코드 이름</strong>을 가진 디렉토리를 생성하시겠어요?
        </p>
      </div>

      <style jsx>{`
        .template {
          line-height: 1.4;
        }

        strong {
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
