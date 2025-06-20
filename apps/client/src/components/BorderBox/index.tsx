import { Box, useTheme } from '@mui/material';
import { BoxProps } from '@mui/material/Box/Box';

function BorderBox(props: BoxProps) {
  const { sx, ...restProps } = props;

  const {
    palette: { primary },
  } = useTheme();

  return (
    <Box
      sx={{
        border: `1px solid ${primary.main}`,
        borderRadius: '4px',
        ...sx,
      }}
      {...restProps}
    ></Box>
  );
}

export default BorderBox;
