import useQueryGetLanguages from '@hooks/language/useQueryGetLanguages';
import useWorkspace from '@hooks/workspace/useWorkspace';
import { LanguageCode, TIME_UNIT } from 'i18n-editor-common';

const DEFAULT_LANGUAGE_CODES: LanguageCode[] = [];

function useLanguageCodes() {
  const workspace = useWorkspace();

  const { data: { data: { languageCodes } = { languageCodes: DEFAULT_LANGUAGE_CODES } } = {} } = useQueryGetLanguages(workspace?.id ?? '', {
    staleTime: TIME_UNIT.unitOfMs.asSecond,
  });

  return languageCodes;
}

export default useLanguageCodes;
