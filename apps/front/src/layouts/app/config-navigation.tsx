import { useMemo } from 'react';

import { paths } from '../../routes/paths';

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      {
        title: 'Empleados',
        path: paths.app.employee.root,
      },
      {
        title: 'Nomina',
        path: paths.app.timeSheet.root,
      },
    ],
    [],
  );

  return data;
}
