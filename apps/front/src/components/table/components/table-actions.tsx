import { Button, MenuItem, IconButton } from '@mui/material';

import { useBoolean } from '../../../hooks/use-boolean';

import Iconify from '../../../components/iconify';
import { ConfirmDialog } from '../../../components/custom-dialog';
import CustomPopover, { usePopover } from '../../../components/custom-popover';

interface TableActionProps {
  onEditRow: () => void;
  onDeleteRow: () => void;
}

export function TableActions({ onEditRow, onDeleteRow }: TableActionProps) {
  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <IconButton
        color={popover.open ? 'inherit' : 'default'}
        onClick={popover.onOpen}
      >
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Eliminar
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Editar
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={'Eliminar'}
        content={'¿Estás seguro de que quieres eliminar el registro?'}
        cancelTitle={'Cancelar'}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Eliminar
          </Button>
        }
      />
    </>
  );
}
