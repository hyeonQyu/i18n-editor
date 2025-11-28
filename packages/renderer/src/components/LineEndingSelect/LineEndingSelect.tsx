import { useEditorConfig, useUpdateEditorConfig } from '@/hooks/domains/editor';
import { LineEnding } from '@i18n-editor/shared';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

const LINE_ENDING_OPTIONS: Array<{ value: LineEnding; label: string; osLabel: string }> = [
  { value: 'lf', label: 'LF', osLabel: '(Unix/Linux/macOS)' },
  { value: 'crlf', label: 'CRLF', osLabel: '(Windows)' },
];

function LineEndingSelect() {
  const editorConfig = useEditorConfig();
  const updateEditorConfig = useUpdateEditorConfig();

  const handleChange = async (event: SelectChangeEvent<LineEnding>) => {
    const lineEnding = event.target.value as LineEnding;
    await updateEditorConfig({
      jsonFormat: {
        ...editorConfig.jsonFormat,
        lineEnding,
      },
    });
  };

  return (
    <FormControl size="small" sx={{ width: 220 }}>
      <Select value={editorConfig.jsonFormat.lineEnding} onChange={handleChange} displayEmpty>
        {LINE_ENDING_OPTIONS.map(({ value, label, osLabel }) => (
          <MenuItem key={value} value={value}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component="span">{label}</Typography>
              <Typography component="span" variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                {osLabel}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LineEndingSelect;
