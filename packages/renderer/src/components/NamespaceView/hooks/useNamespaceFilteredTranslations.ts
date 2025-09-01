import { useTranslationSearchKeyword } from '@/components/NamespaceView/hooks/useTranslationSearchKeyword';
import { useNamespace } from '@/hooks/domains/namespace';
import { useTranslations } from '@/hooks/domains/translation';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { TIME_UNIT, Translation } from '@i18n-editor/shared';
import { throttle } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

interface TranslationFilterResult {
  translations: Translation[];
  keyword: string;
}

export const useNamespaceFilteredTranslations = () => {
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  const allTranslations = useTranslations(workspaceId, namespace);
  const keyword = useTranslationSearchKeyword();

  const [translationFilterResult, setTranslationFilterResult] = useState<TranslationFilterResult>({
    translations: allTranslations,
    keyword,
  });

  const throttledSetFilteredTranslations = useMemo(
    () =>
      throttle((translations: Translation[], keyword: string) => {
        const keywordLowerCase = keyword.toLowerCase();

        setTranslationFilterResult({
          translations: translations.filter((translation) => {
            const keyMatch = translation.key.toLowerCase().includes(keywordLowerCase);
            const valueMatch = Object.values(translation.value).some((value) => value.toLowerCase().includes(keywordLowerCase));

            return keyMatch || valueMatch;
          }),
          keyword,
        });
      }, TIME_UNIT.unitOfMs.asSecond * 0.5),
    [],
  );

  useEffect(() => {
    throttledSetFilteredTranslations(allTranslations, keyword);
  }, [keyword, allTranslations]);

  useEffect(() => {
    return () => {
      throttledSetFilteredTranslations.cancel();
    };
  }, [throttledSetFilteredTranslations]);

  return translationFilterResult;
};
