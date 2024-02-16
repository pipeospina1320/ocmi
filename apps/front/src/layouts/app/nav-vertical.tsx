import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import NavSectionVertical from './nav-section-vertical';

import { useNavData } from './config-navigation';
import React from 'react';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const pathname = usePathname();

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Box
      sx={{
        flexShrink: 0,
        width: 280,
      }}
    >
      <Stack
        sx={{
          height: 1,
          position: 'fixed',
          width: 280,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <NavSectionVertical data={navData} />
      </Stack>
    </Box>
  );
}
