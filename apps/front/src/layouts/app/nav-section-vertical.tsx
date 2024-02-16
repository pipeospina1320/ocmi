import { memo } from 'react';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';
import { NavProps } from './types';

// ----------------------------------------------------------------------

function NavSectionVertical({ data, ...other }: NavProps) {
  return (
    <Stack component="nav" id="nav-section-vertical" {...other}>
      {data.map((item, index) => (
        <Stack key={`${item.path}-${index}`} sx={{ px: 2 }}>
          <NavList
            key={`${item.path}-${index}`}
            path={item.path}
            title={item.title}
          />
        </Stack>
      ))}
    </Stack>
  );
}

export default memo(NavSectionVertical);
