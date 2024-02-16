'use client';

import Container from '@mui/material/Container';

import { TimeSheetForm } from './form';
import { useInitFormTimeSheet } from '@front/api/timeSheet/timeSheet';
import { Box } from '@mui/material';
import { TimeSheetEmployeeListView } from './employee/list-view';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export function TimeSheetEditView({ id }: Props) {
  const { timeSheet, isLoading } = useInitFormTimeSheet(id);

  return (
    <Container maxWidth={'lg'}>
      <TimeSheetForm currentTimeSheet={timeSheet} isLoading={isLoading} />
      <Box sx={{ marginTop: '20px' }}>
        {!isLoading && <TimeSheetEmployeeListView timeSheetId={id} />}
      </Box>
    </Container>
  );
}
