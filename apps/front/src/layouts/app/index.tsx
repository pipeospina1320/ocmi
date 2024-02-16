import Box from '@mui/material/Box';

import { useBoolean } from '../../hooks/use-boolean';

import NavVertical from './nav-vertical';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const nav = useBoolean();

  const renderNavVertical = (
    <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />
  );

  return (
    <>
      <Box
        sx={{
          width: 'auto',
          height: 30,
          display: 'flex',
          flexDirection: 'row',
        }}
      />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {renderNavVertical}

        {children}
      </Box>
    </>
  );
}
