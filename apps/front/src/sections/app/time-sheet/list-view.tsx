'use client';

import Container from '@mui/material/Container';

import { paths } from '../../../routes/paths';
import { useRouter } from '../../../routes/hooks';

import { onDelete } from '../../../utils/axios';
import { endpoints } from '../../../api/endpoints';
import { ServerSideTable, TableHead } from '../../../components/table';
import { TableActions } from '../../../components/table/components/table-actions';
import { Box, Button, Stack } from '@mui/material';
import { RouterLink } from 'apps/front/src/routes/components';
import Iconify from 'apps/front/src/components/iconify';
import { fDate } from 'apps/front/src/utils/format-time';

// ----------------------------------------------------------------------

export function TimeSheetListView() {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    await onDelete(endpoints.timeSheet.delete(id));
  };

  const handleEdit = (id: string) => {
    router.push(paths.app.timeSheet.edit(id));
  };

  const headConfig: TableHead[] = [
    {
      id: 'period_pay_start',
      label: 'Fecha inicio',
      component: (row) => {
        return fDate(row.period_pay_start);
      },
    },
    {
      id: 'period_pay_end',
      label: 'Fecha fin',
      component: (row) => {
        return fDate(row.period_pay_end);
      },
    },
    {
      id: 'gross_payroll',
      label: 'Total',
    },
    {
      id: 'actions',
      label: 'Acciones',
      width: 80,
      component: (row, onMutate) => (
        <TableActions
          onDeleteRow={async () => {
            await handleDelete(row.id);
            onMutate();
          }}
          onEditRow={() => handleEdit(row.id)}
        />
      ),
    },
  ];

  return (
    <Container maxWidth={'xl'}>
      <Box
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Stack direction="row" alignItems="center">
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexShrink: 0 }}>
            <Button
              component={RouterLink}
              href={paths.app.timeSheet.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Nuevo
            </Button>
          </Box>
        </Stack>
      </Box>

      <ServerSideTable url={endpoints.timeSheet.list} headConfig={headConfig} />
    </Container>
  );
}
