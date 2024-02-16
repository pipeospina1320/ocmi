'use client';

import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const memoizedValue = useMemo(() => ({}), []);

  const theme = createTheme(memoizedValue as ThemeOptions);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
