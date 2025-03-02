import useNamespace from '@hooks/namespace/useNamespace';
import useQueryGetTranslations from '@hooks/translation/useQueryGetTranslations';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { Translation } from 'i18n-editor-common';

const DEFAULT_TRANSLATIONS: Translation[] = [];

function useTranslations() {
  const workspace = useWorkspace();
  const namespace = useNamespace();

  const { data: { data: { translations } = { translations: DEFAULT_TRANSLATIONS } } = {} } = useQueryGetTranslations(
    workspace?.id ?? '',
    namespace ?? '',
  );

  return translations;
}

export default useTranslations;
