import EllipsisText from '@/components/EllipsisText';
import HighlightedTranslationText from '@/components/NamespaceView/components/NamespaceTranslation/components/HighlightedTranslationText';
import { NAMESPACE_TRANSLATION_LIST_WIDTH } from '@/components/NamespaceView/constants';
import { useSelectTranslationKey } from '@/components/NamespaceView/hooks';
import { Translation } from '@i18n-editor/shared/defines/translation.definitions.js';
import { Box, ListItemButton, Stack, Typography, useTheme } from '@mui/material';
import { memo } from 'react';
import { FixedSizeList } from 'react-window';

interface TranslationListProps {
  height: number;
  translations: Translation[];
  keyword: string;
}

const displayLanguageSize = 2;

function TranslationList({ height, translations, keyword }: TranslationListProps) {
  const { palette } = useTheme();

  const setSelectedTranslationKey = useSelectTranslationKey();

  return (
    <FixedSizeList
      width={NAMESPACE_TRANSLATION_LIST_WIDTH}
      height={height}
      itemCount={translations.length}
      itemSize={120}
      style={{
        borderRight: `1px solid ${palette.divider}`,
      }}
    >
      {({ index, style }) => {
        const { key, value: translationValue } = translations[index];
        const languageValues = Object.entries(translationValue);

        const keywordMatchedLanguageValues = languageValues.filter(([_, value]) => value.toLowerCase().includes(keyword.toLowerCase()));
        const nonMatchedLanguageValues = languageValues.filter(([_, value]) => !value.toLowerCase().includes(keyword.toLowerCase()));

        const displayLanguageValues = [
          ...keywordMatchedLanguageValues.slice(0, displayLanguageSize),
          ...nonMatchedLanguageValues.slice(0, Math.max(0, displayLanguageSize - keywordMatchedLanguageValues.length)),
        ];
        const restLanguageValues = languageValues.filter(
          ([language]) => !displayLanguageValues.some(([displayLanguage]) => displayLanguage === language),
        );

        const handleClick = () => setSelectedTranslationKey(key);

        return (
          <ListItemButton
            style={style}
            sx={{
              padding: '16px',
            }}
            onClick={handleClick}
          >
            <Stack sx={{ width: '100%' }}>
              <HighlightedTranslationText text={key} keyword={keyword} variant="body1" sx={{ color: palette.text.primary }} />

              <Box sx={{ marginTop: '8px', marginBottom: '4px' }}>
                {displayLanguageValues.map(([language, value]) => (
                  <Box key={language} sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Typography variant="body2" sx={{ color: palette.text.secondary, fontWeight: 600 }}>
                      ({language})
                    </Typography>
                    <HighlightedTranslationText
                      text={value}
                      keyword={keyword}
                      variant="body2"
                      sx={{ color: palette.text.secondary }}
                      hideTooltip
                    />
                  </Box>
                ))}
              </Box>
              {restLanguageValues.length > 0 && (
                <EllipsisText
                  label={`+${restLanguageValues.length}개 언어`}
                  variant="caption"
                  sx={{ color: palette.text.secondary }}
                  hideTooltip
                />
              )}
            </Stack>
          </ListItemButton>
        );
      }}
    </FixedSizeList>
  );
}

export default memo(TranslationList);
