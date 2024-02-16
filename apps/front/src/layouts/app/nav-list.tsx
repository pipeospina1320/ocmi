import NavItem from './nav-item';
import { NavItemBaseProps } from './types';
import { useActiveLink } from '../../routes/hooks';

// ----------------------------------------------------------------------

export default function NavList({ title, path }: NavItemBaseProps) {
  const active = useActiveLink(path);


  return (
    <NavItem
      title={title}
      path={path}
      active={active}
      className={active ? 'active' : ''}
    />
  );
}
