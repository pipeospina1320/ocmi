import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import { Stack, MenuItem, Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from '@front/routes/paths';
import { useRouter } from '@front/routes/hooks';

import { onPost, onPatch } from '@front/utils/axios';

import { endpoints } from '@front/api/endpoints';

import FormAction from '@front/components/hook-form/form-actions';
import { useSnackbar } from '@front/components/snackbar';
import FormProvider, { RHFDatePickerField } from '@front/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  currentTimeSheet?: any;
  isLoading?: boolean;
};

export function TimeSheetForm({ currentTimeSheet, isLoading = false }: Props) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    periodPayStart: Yup.string().required('Valor requerido'),
    periodPayEnd: Yup.string().required('Valor requerido'),
  });

  const defaultValues = useMemo(
    () => ({
      periodPayStart: currentTimeSheet?.period_pay_start || null,
      periodPayEnd: currentTimeSheet?.period_pay_end || null,
    }),
    [currentTimeSheet],
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

  // const values = watch();

  useEffect(() => {
    if (currentTimeSheet) {
      reset(defaultValues);
    }
  }, [currentTimeSheet, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentTimeSheet) {
        await onPatch(endpoints.timeSheet.patch(currentTimeSheet.id), {
          data,
        });
      } else {
        await onPost(endpoints.timeSheet.create, {
          data,
        });
      }
      reset();

      router.push(paths.app.timeSheet.root);
    } catch (error: any) {
      enqueueSnackbar(error?.description, { variant: 'error' });
    }
  });

  const onCancel = () => {
    reset();
    router.push(paths.app.timeSheet.root);
  };

  const renderDetails = (
    <Stack spacing={2}>
      <Grid container direction="row" spacing={2}>
        <Grid xs={12} md={6}>
          <RHFDatePickerField name="periodPayStart" label="Periodo inicio" />
        </Grid>
        <Grid xs={12} md={6}>
          <RHFDatePickerField name="periodPayEnd" label="Periodo fin" />
        </Grid>
      </Grid>
    </Stack>
  );

  const renderActions = (
    <Grid
      xs={12}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
    >
      <FormAction
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        isUpdate={!!currentTimeSheet}
      />
    </Grid>
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Card sx={{ p: 3 }}>
              {!isLoading && renderDetails}

              {!isLoading && renderActions}
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
