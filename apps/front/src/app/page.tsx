'use client';

import { PATH_AFTER_LOGIN } from '@front/config-global';
import { useRouter } from '@front/routes/hooks';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(PATH_AFTER_LOGIN);
  }, [router]);

  return null;
}
