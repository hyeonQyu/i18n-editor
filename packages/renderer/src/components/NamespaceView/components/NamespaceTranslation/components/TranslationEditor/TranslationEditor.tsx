import { CopyableButton } from '@/components/CopyableButton';
import { TranslationDeleteButton } from '@/components/NamespaceView/components/TranslationDeleteButton';
import { NAMESPACE_TRANSLATION_LIST_WIDTH } from '@/components/NamespaceView/constants';
import { useRenderKey, useSelectedTranslationKey } from '@/components/NamespaceView/hooks';
import { useNamespace } from '@/hooks/domains/namespace';
import { useUpdateTranslation } from '@/hooks/domains/translation';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { LanguageCode, Translation } from '@i18n-editor/shared';
import { Box, Stack, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import { FocusEventHandler, useMemo } from 'react';

interface TranslationEditorProps {
  translations: Translation[];
}

function TranslationEditor({ translations }: TranslationEditorProps) {
  const { palette } = useTheme();

  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  const selectedTranslationKey = useSelectedTranslationKey();

  const renderKey = useRenderKey();

  const translationValueByLanguageCode = useMemo(() => {
    return translations.find((translation) => translation.key === selectedTranslationKey);
  }, [translations, selectedTranslationKey, renderKey])?.value;

  const updateTranslation = useUpdateTranslation();

  if (!translationValueByLanguageCode)
    return (
      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" color="textSecondary" sx={{ padding: '0 32px' }}>
          번역키를 선택하세요.
        </Typography>
      </Box>
    );

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
    };

  return (
    <Stack
      sx={{
        width: `calc(100% - ${NAMESPACE_TRANSLATION_LIST_WIDTH}px)`,
        padding: '64px 0 48px 0',
        gap: '48px',
        position: 'relative',
      }}
    >
      {selectedTranslationKey && (
        <TranslationDeleteButton translationKey={selectedTranslationKey} sx={{ position: 'absolute', top: '14px', right: '14px' }} />
      )}

      <Tooltip title={'복사'}>
        <CopyableButton
          copyText={selectedTranslationKey ?? ''}
          sx={{ color: palette.text.secondary, width: 'fit-content', margin: '0 32px' }}
        >
          <Typography
            variant="h5"
            sx={{
              wordBreak: 'break-word',
            }}
          >
            {selectedTranslationKey}
          </Typography>
        </CopyableButton>
      </Tooltip>
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
            key={languageCode + translationValue}
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
