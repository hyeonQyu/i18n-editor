import { ConfigOptionTitle } from '@/components/ConfigView/components/ConfigOptionTitle';
import { PaperSection } from '@/components/PaperSection';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface ConfigBoxProps {
  title: string;
  options: Array<{
    title: ReactNode;
    children: ReactNode;
  }>;
}

function ConfigBox({ title, options }: ConfigBoxProps) {
  return (
    <PaperSection titleProps={{ children: title }} sx={{ padding: '16px' }}>
      <Box component="ul" sx={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '24px' }}>
        {options.map((option, i) => (
          <Box component="li" key={i} sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <ConfigOptionTitle>{option.title}</ConfigOptionTitle>
            {option.children}
          </Box>
        ))}
      </Box>
    </PaperSection>
  );
}

export default ConfigBox;
