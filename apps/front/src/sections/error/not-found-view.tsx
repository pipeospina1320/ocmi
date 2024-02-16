'use client';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from '../../routes/components';
import { Container, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  return (
    <Container component="main">
      <Stack
        sx={{
          py: 12,
          m: 'auto',
          maxWidth: 400,
          minHeight: '100vh',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          Sorry, Page Not Found!
        </Typography>

        <Button
          component={RouterLink}
          href="/app"
          size="large"
          variant="contained"
        >
          Go to Home
        </Button>
      </Stack>
    </Container>
  );
}
