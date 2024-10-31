'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({ href, children, ...props }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const activeClasses = 'text-secondary font-bold';
  return (
    <Link href={href}>
      <Button
        variant='link'
        size='sm'
        className={`border-none tracking-wide text-muted-foreground hover:text-secondary hover:no-underline ${isActive ? activeClasses : ''}`}
        {...props}
      >
        {children}
      </Button>
    </Link>
  );
}
export default NavLink;
