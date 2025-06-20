import PaperSection from '@components/PaperSection';
import AddablePaperSectionTitle from '@components/WorkspaceView/components/AddablePapaerSectionTitle';
import useConfirmDeleteLanguageClickHandler from '@components/WorkspaceView/hooks/useConfirmDeleteLanguageClickHandler';
import useOpenAddLanguagesDialogClickHandler from '@components/WorkspaceView/hooks/useOpenAddLanguagesDialogClickHandler';
import useLanguageCodes from '@hooks/language/useLanguageCodes';
import { Box, Chip } from '@mui/material';

function WorkspaceLanguages() {
  const languageCodes = useLanguageCodes();

  const handleClickAddLanguages = useOpenAddLanguagesDialogClickHandler();
  const handleClickDeleteLanguage = useConfirmDeleteLanguageClickHandler();

  return (
    <PaperSection
      titleProps={{
        children: <AddablePaperSectionTitle onClick={handleClickAddLanguages}>언어</AddablePaperSectionTitle>,
      }}
      sx={{ padding: '16px' }}
    >
      <Box component={'ul'} sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
        {languageCodes.map((languageCode) => (
          <li key={languageCode}>
            <Chip label={languageCode} color="primary" sx={{ fontSize: '18px' }} onDelete={() => handleClickDeleteLanguage(languageCode)} />
          </li>
        ))}
      </Box>
    </PaperSection>
  );
}

export default WorkspaceLanguages;
