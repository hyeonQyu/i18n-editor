import { SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { localeDirectoryPathState, translationContentSelector, translationFileNameState } from '@stores/store';
import { useEffect } from 'react';
import useQueryGetContent from '@hooks/queries/useQueryGetContent';

export interface UseTranslationFileNameParams {}

export interface UseTranslationFileName {
  translationFileName: string | undefined;
  setTranslationFileName: SetterOrUpdater<string | undefined>;
}

export default function useTranslationFileName(params: UseTranslationFileNameParams): UseTranslationFileName {
  const {} = params;

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const [translationFileName, setTranslationFileName] = useRecoilState(translationFileNameState);
  const setTranslationContent = useSetRecoilState(translationContentSelector);

  useEffect(() => {
    setTranslationFileName(undefined);
  }, [localeDirectoryPath]);

  useQueryGetContent({
    req: {
      path: localeDirectoryPath!,
      fileName: translationFileName!,
    },
    queryOption: {
      enabled: Boolean(localeDirectoryPath && translationFileName),
      retry: false,
      onSuccess({ data }) {
        if (!data) return;
        const { rows, columns } = data;
        setTranslationContent({ rows, columns });
      },
      onError() {
        setTranslationContent({ rows: undefined, columns: undefined });
      },
    },
  });

  return {
    translationFileName,
    setTranslationFileName,
  };
}
