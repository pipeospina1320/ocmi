import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import { Stack, MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from '../../../routes/paths';
import { useRouter } from '../../../routes/hooks';

import { onPost, onPatch } from '../../../utils/axios';

import { endpoints } from '../../../api/endpoints';

import FormAction from '../../../components/hook-form/form-actions';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from '../../../components/hook-form';
import { PayType } from '../../../enums/employee';

// ----------------------------------------------------------------------

type Props = {
  currentEmployee?: any;
  isLoading?: boolean;
};

export function EmployeeForm({
  currentEmployee,
  isLoading = false,
}: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const payTypes = Object.values(PayType);

  const Schema = Yup.object().shape({
    name: Yup.string().required('Valor requerido'),
    payType: Yup.string().required('Valor requerido'),
    payRate: Yup.string().required('Valor requerido'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentEmployee?.name || '',
      payType: currentEmployee?.payType || '',
      payRate: currentEmployee?.payRate || '',
    }),
    [currentEmployee],
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentEmployee) {
      reset(defaultValues);
    }
  }, [currentEmployee, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentEmployee) {
        await onPatch(endpoints.employee.patch(currentEmployee.id), {
          data,
        });
      } else {
        await onPost(endpoints.employee.create, {
          data,
        });
      }
      reset();

      router.push(paths.app.employee.root);
    } catch (error: any) {
      enqueueSnackbar(error?.description, { variant: 'error' });
    }
  });

  const onCancel = () => {
    reset();
    router.push(paths.app.employee.root);
  };

  const renderDetails = (
    <Grid xs={12}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Grid container direction="row" spacing={2}>
            <Grid xs={12} md={6}>
              <RHFTextField name="name" label="Nombre" />
            </Grid>
            <Grid xs={12} md={3}>
              <RHFSelect
                fullWidth
                name="payType"
                label="Tipo de pago"
                InputLabelProps={{ shrink: true }}
              >
                {payTypes?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>

            <Grid xs={12} md={3}>
              <RHFTextField name="payRate" label="Tasa de pago" type="number" />
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </Grid>
  );

  const renderActions = (
    <Grid
      xs={12}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
    >
      <FormAction
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        isUpdate={!!currentEmployee}
      />
    </Grid>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {!isLoading && renderDetails}

        {!isLoading && renderActions}
      </Grid>
    </FormProvider>
  );
}
