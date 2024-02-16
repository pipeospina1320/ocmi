'use client';

import React from 'react';
import Container from '@mui/material/Container';

import { TimeSheetForm } from './form';

// ----------------------------------------------------------------------

export function TimeSheetCreateView() {
  return (
    <Container maxWidth={'lg'}>
      <TimeSheetForm isLoading={false} />
    </Container>
  );
}
