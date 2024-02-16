import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

type ReturnType = boolean;

export function useActiveLink(path: string): ReturnType {
  const pathname = usePathname();

  const checkPath = path.startsWith('#');

  const currentPath = path === '/' ? '/' : path;

  return !checkPath && pathname.startsWith(currentPath);
}
