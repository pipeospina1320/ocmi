// import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Stack, Button } from '@mui/material';

interface FormActionProps {
  onCancel: () => void;
  isUpdate: boolean;
  isSubmitting: boolean;
}

export default function FormAction({ onCancel, isUpdate, isSubmitting }: FormActionProps) {

  return (
    <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
      <Button color="inherit" size="large" variant="outlined" onClick={onCancel}>
        Cancelar
      </Button>

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {isUpdate ? 'Actualizar': 'Crear'}
      </LoadingButton>
    </Stack>
  );
}
