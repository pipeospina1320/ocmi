import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';

// ----------------------------------------------------------------------

type EmptyContentProps = StackProps & {
  title?: string;
};

export default function EmptyContent({
  title,
  sx,
  ...other
}: EmptyContentProps) {
  return (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      sx={{
        px: 3,
        height: 1,
        ...sx,
      }}
      {...other}
    >
      <Box sx={{ width: 1, maxWidth: 160 }} />

      <Typography
        variant="h6"
        component="span"
        sx={{ mt: 1, color: 'text.disabled', textAlign: 'center' }}
      >
        {title}
      </Typography>
    </Stack>
  );
}
