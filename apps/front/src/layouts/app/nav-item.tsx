import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { alpha, styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { NavItemProps, NavItemStateProps } from './types';
import { RouterLink } from '../../routes/components';

// ----------------------------------------------------------------------

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ title, path, active, ...other }, ref) => {
    const renderContent = (
      <StyledNavItem ref={ref} disableGutters active={active} {...other}>
        <Box component="span" className="sub-icon" />

        <Box component="span" sx={{ flex: '1 1 auto', minWidth: 0 }}>
          <Box component="span" className="label">
            {title}
          </Box>
        </Box>
      </StyledNavItem>
    );

    return (
      <Link
        component={RouterLink}
        href={path}
        color="inherit"
        underline="none"
        sx={{
          ...{
            cursor: 'default',
          },
        }}
      >
        {renderContent}
      </Link>
    );
  },
);

export default NavItem;

// ----------------------------------------------------------------------

const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<NavItemStateProps>(({ active, theme }) => {
  const baseStyles = {
    item: {
      marginBottom: 4,
      borderRadius: 8,
      color: theme.palette.text.secondary,
      padding: theme.spacing(0.5, 1, 0.5, 1.5),
    },
  } as const;

  return {
    ...{
      ...baseStyles.item,
      minHeight: 44,
      ...(active && {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.primary.main
            : theme.palette.primary.light,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
      }),
    },
  };
});
