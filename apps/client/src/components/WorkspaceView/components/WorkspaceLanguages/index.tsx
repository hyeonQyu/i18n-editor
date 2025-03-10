import PaperSection from '@components/PaperSection';
import useLanguageCodes from '@hooks/language/useLanguageCodes';
import { Box, Chip } from '@mui/material';

function WorkspaceLanguages() {
  const languageCodes = useLanguageCodes();

  return (
    <PaperSection titleProps={{ children: '언어' }} sx={{ padding: '16px' }}>
      <Box component={'ul'} sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
        {languageCodes.map((languageCode) => (
          <li key={languageCode}>
            <Chip label={languageCode} color="primary" sx={{ fontSize: '18px' }} />
          </li>
        ))}
      </Box>
    </PaperSection>
  );
}

export default WorkspaceLanguages;
