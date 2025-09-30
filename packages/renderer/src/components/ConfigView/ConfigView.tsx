import { ConfigBox, ConfigOptionDescription } from '@/components/ConfigView/components';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { Box } from '@mui/material';

function ConfigView() {
  return (
    <Box
      sx={{
        padding: '36px',
      }}
    >
      <ConfigBox
        title="애플리케이션 설정"
        options={[
          {
            title: '테마',
            children: (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <ConfigOptionDescription>기본값으로 시스템 설정을 사용합니다.</ConfigOptionDescription>
                <ThemeSwitch />
              </Box>
            ),
          },
        ]}
      />
    </Box>
  );
}

export default ConfigView;
