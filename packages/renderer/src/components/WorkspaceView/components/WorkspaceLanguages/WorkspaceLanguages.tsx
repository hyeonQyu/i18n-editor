import { PaperSection } from '@/components/PaperSection';
import { AddablePaperSectionTitle } from '@/components/WorkspaceView/components/AddablePaperSectionTitle';
import { useConfirmDeleteWorkspaceLanguage, useOpenWorkspaceLanguageCodesDialog } from '@/components/WorkspaceView/hooks';
import { useLanguageCodes } from '@/hooks/domains/language';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { Box, Chip } from '@mui/material';

function WorkspaceLanguages() {
  const workspaceId = useWorkspaceId();
  const languageCodes = useLanguageCodes(workspaceId);

  const openLanguageCodesDialog = useOpenWorkspaceLanguageCodesDialog();
  const confirmDeleteLanguage = useConfirmDeleteWorkspaceLanguage();

  return (
    <PaperSection
      titleProps={{
        children: <AddablePaperSectionTitle onClick={() => openLanguageCodesDialog()}>언어</AddablePaperSectionTitle>,
      }}
      sx={{ padding: '16px' }}
    >
      <Box component={'ul'} sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
        {languageCodes.map((languageCode) => (
          <li key={languageCode}>
            <Chip label={languageCode} color="primary" sx={{ fontSize: '18px' }} onDelete={() => confirmDeleteLanguage(languageCode)} />
          </li>
        ))}
      </Box>
    </PaperSection>
  );
}

export default WorkspaceLanguages;
