import { NAMESPACE_TRANSLATION_LIST_WIDTH } from '@/components/NamespaceView/constants';
import { useNamespaceViewTranslationStore } from '@/components/NamespaceView/stores';
import { useNamespace } from '@/hooks/domains/namespace';
import { useInvalidateGetAllTranslationsQuery, useUpdateTranslation } from '@/hooks/domains/translation';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { LanguageCode, Translation } from '@i18n-editor/shared';
import { Stack, TextField, Typography } from '@mui/material';
import { FocusEventHandler, useMemo } from 'react';

interface TranslationEditorProps {
  translations: Translation[];
}

function TranslationEditor({ translations }: TranslationEditorProps) {
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  const selectedTranslationKey = useNamespaceViewTranslationStore((store) => store.selectedTranslationKey);

  const translationValueByLanguageCode = useMemo(() => {
    return translations.find((translation) => translation.key === selectedTranslationKey);
  }, [translations, selectedTranslationKey])?.value;

  const updateTranslation = useUpdateTranslation();
  const invalidateGetAllTranslationsQuery = useInvalidateGetAllTranslationsQuery();

  if (!translationValueByLanguageCode) return null;

  const getEditFinishHandler =
    (languageCode: LanguageCode): FocusEventHandler<HTMLTextAreaElement> =>
    async (e) => {
      if (!selectedTranslationKey) {
        throw new Error('Selected translation key is not found');
      }

      await updateTranslation({
        workspaceId: workspaceId,
        namespace,
        languageCode,
        translationKey: selectedTranslationKey,
        value: e.target.value,
      });

      await invalidateGetAllTranslationsQuery({ workspaceId, namespace });
    };

  return (
    <Stack
      sx={{
        width: `calc(100% - ${NAMESPACE_TRANSLATION_LIST_WIDTH}px)`,
        padding: '48px 0',
        gap: '48px',
      }}
    >
      <Typography
        variant="h5"
        color="textSecondary"
        sx={{
          wordBreak: 'break-word',
          padding: '0 32px',
        }}
      >
        {selectedTranslationKey}
      </Typography>
      <Stack
        key={selectedTranslationKey}
        sx={{
          gap: '32px',
          width: '100%',
          padding: '12px 32px',
          overflowY: 'auto',
        }}
      >
        {Object.entries(translationValueByLanguageCode).map(([languageCode, translationValue]) => (
          <TextField
            key={languageCode}
            label={languageCode}
            defaultValue={translationValue}
            multiline
            fullWidth
            onBlur={getEditFinishHandler(languageCode as LanguageCode)}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default TranslationEditor;
