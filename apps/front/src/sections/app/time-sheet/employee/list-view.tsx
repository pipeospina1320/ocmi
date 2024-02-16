'use client';

import { TextField } from '@mui/material';
import { ServerSideTable, TableHead } from '@front/components/table';
import { endpoints } from '@front/api/endpoints';
import { onPatch } from '@front/utils/axios';
import { useRouter } from '@front/routes/hooks';
import { PayType } from '@front/enums/employee';

// ----------------------------------------------------------------------
interface Props {
  timeSheetId: string;
}

export function TimeSheetEmployeeListView({ timeSheetId }: Props) {
  const router = useRouter();

  const onUpdateHour = async (id: string, hours: string) => {
    if (hours) {
      await onPatch(endpoints.timeSheet.employee.updateHour(id), {
        data: {
          hours,
        },
      });
    }
  };

  const headConfig: TableHead[] = [
    { id: 'employee.name', label: 'Nombre' },
    { id: 'pay_type', label: 'Tipo de Pago' },
    { id: 'pay_rate', label: 'Tasa de pago' },
    { id: 'hours', label: 'Horas' },
    {
      id: 'hours-field',
      label: 'Actualizar horas',
      component: (row, onMutate) => {
        if (row.pay_type === PayType.SALARY) return row.hours;
        return (
          <TextField
            size="small"
            type="number"
            onBlur={async (value) => {
              await onUpdateHour(row.id, value.target.value);
              onMutate();
            }}
          />
        );
      },
    },
    { id: 'gross_wage', label: 'Salario bruto' },
  ];

  return (
    <ServerSideTable
      url={endpoints.timeSheet.employee.list(timeSheetId)}
      headConfig={headConfig}
    />
  );
}
