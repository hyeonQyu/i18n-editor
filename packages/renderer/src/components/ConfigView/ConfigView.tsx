import { ConfigBox, ConfigOptionDescription } from '@/components/ConfigView/components';
import { LineEndingSelect } from '@/components/LineEndingSelect';
import { ThemeModeSwitch } from '@/components/ThemeModeSwitch';
import { Box } from '@mui/material';

function ConfigView() {
  return (
    <Box
      sx={{
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
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
                <ThemeModeSwitch />
              </Box>
            ),
          },
        ]}
      />
      <ConfigBox
        title="편집기 설정"
        options={[
          {
            title: '개행 문자',
            children: (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <ConfigOptionDescription>JSON 파일 저장 시 사용할 개행 문자를 선택합니다.</ConfigOptionDescription>
                <LineEndingSelect />
              </Box>
            ),
          },
        ]}
      />
    </Box>
  );
}

export default ConfigView;
