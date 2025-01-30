import PaperSection from '@components/PaperSection';
import AddablePaperSectionTitle from '@components/WorkspaceView/components/AddablePapaerSectionTitle';
import useOpenAddLanguagesDialogClickHandler from '@components/WorkspaceView/hooks/useOpenAddLanguagesDialogClickHandler';
import useLanguageCodes from '@hooks/language/useLanguageCodes';
import { Box, Chip } from '@mui/material';

function WorkspaceLanguages() {
  const languageCodes = useLanguageCodes();

  const handleClickAddLanguages = useOpenAddLanguagesDialogClickHandler();

  return (
    <PaperSection
      titleProps={{
        children: <AddablePaperSectionTitle title="언어" onClick={handleClickAddLanguages} />,
      }}
      sx={{ padding: '16px' }}
    >
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
