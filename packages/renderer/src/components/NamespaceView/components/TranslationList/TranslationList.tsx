import EllipsisText from '@/components/EllipsisText';
import { useNamespaceTranslations } from '@/components/NamespaceView/hooks/useNamespaceTranslations';
import { Box, ListItemButton, Stack, Typography, useTheme } from '@mui/material';
import { FixedSizeList } from 'react-window';

interface TranslationListProps {
  height: number;
}

const displayLanguageSize = 2;

function TranslationList({ height }: TranslationListProps) {
  const { palette } = useTheme();

  const translations = useNamespaceTranslations();

  return (
    <FixedSizeList
      width={400}
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
        const displayLanguageValues = languageValues.slice(0, displayLanguageSize);
        const restLanguageValues = languageValues.slice(displayLanguageSize);

        return (
          <ListItemButton
            style={style}
            sx={{
              padding: '16px',
            }}
          >
            <Stack sx={{ width: '100%' }}>
              <EllipsisText label={key} variant="body1" sx={{ color: palette.text.primary }} />

              <Box sx={{ marginTop: '8px', marginBottom: '4px' }}>
                {displayLanguageValues.map(([language, value]) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Typography variant="body2" sx={{ color: palette.text.secondary, fontWeight: 600 }}>
                      ({language})
                    </Typography>
                    <EllipsisText key={language} label={value} variant="body2" sx={{ color: palette.text.secondary }} hideTooltip />
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

export default TranslationList;
