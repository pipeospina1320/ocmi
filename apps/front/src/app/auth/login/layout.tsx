'use client';

import { GuestGuard } from 'apps/front/src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <GuestGuard>{children}</GuestGuard>;
}
