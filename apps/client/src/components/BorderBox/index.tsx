import { Box } from '@mui/material';
import { BoxProps } from '@mui/material/Box/Box';

function BorderBox(props: BoxProps) {
  const { sx, ...restProps } = props;

  return (
    <Box
      sx={{
        border: `1px solid rgba(25, 118, 210, 0.5)`,
        borderRadius: '4px',
        ...sx,
      }}
      {...restProps}
    ></Box>
  );
}

export default BorderBox;
