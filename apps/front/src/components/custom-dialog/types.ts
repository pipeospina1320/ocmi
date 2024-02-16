import { DialogProps } from '@mui/material/Dialog';

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content' | 'cancelTitle'> & {
  title: React.ReactNode;
  content?: React.ReactNode;
  cancelTitle: string;
  action: React.ReactNode;
  onClose: VoidFunction;
};
