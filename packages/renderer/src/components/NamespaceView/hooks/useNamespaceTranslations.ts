import { useNamespaceViewSearchStore } from '@/components/NamespaceView/stores/namespaceView.search.store';
import { useNamespace } from '@/hooks/domains/namespace';
import { useTranslations } from '@/hooks/domains/translation';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { TIME_UNIT, Translation } from '@i18n-editor/shared';
import { throttle } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

export const useNamespaceTranslations = () => {
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  const allTranslations = useTranslations(workspaceId, namespace);
  const [filteredTranslations, setFilteredTranslations] = useState<Translation[]>(allTranslations);

  const keyword = useNamespaceViewSearchStore((store) => store.keyword);

  const throttledSetFilteredTranslations = useMemo(
    () =>
      throttle((translations: Translation[], keyword: string) => {
        const keywordLowerCase = keyword.toLowerCase();

        setFilteredTranslations(
          translations.filter((translation) => {
            const keyMatch = translation.key.toLowerCase().includes(keywordLowerCase);
            const valueMatch = Object.values(translation.value).some((value) => value.toLowerCase().includes(keywordLowerCase));

            return keyMatch || valueMatch;
          }),
        );
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

  return filteredTranslations;
};
