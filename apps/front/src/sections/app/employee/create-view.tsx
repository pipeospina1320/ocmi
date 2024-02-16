'use client';

import React from 'react';
import Container from '@mui/material/Container';
import { EmployeeForm } from './form';

// ----------------------------------------------------------------------

export function EmployeeCreateView() {
  return (
    <Container maxWidth={'lg'}>
      <EmployeeForm isLoading={false} />
    </Container>
  );
}
