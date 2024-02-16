import { StackProps } from '@mui/material/Stack';

import { ListItemButtonProps } from '@mui/material/ListItemButton';

// ----------------------------------------------------------------------

export type NavItemBaseProps = {
  title: string;
  path: string;
};

export type NavProps = StackProps & {
  data: NavItemBaseProps[];
};

export type NavItemProps = ListItemButtonProps &
  NavItemStateProps &
  NavItemBaseProps;

export type NavItemStateProps = {
  depth?: number;
  open?: boolean;
  active?: boolean;
  hasChild?: boolean;
};
