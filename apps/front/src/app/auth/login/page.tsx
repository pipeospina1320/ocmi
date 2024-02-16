import { Stack } from '@mui/material';
import { LoginView } from '../../../sections/auth';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        pt: { xs: 15, md: 20 },
        pb: { xs: 15, md: 0 },
      }}
    >
      <LoginView />
    </Stack>
  );
}
