'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

function NavLink({ href, children, ...props }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const activeClasses = 'bg-accent text-accent-foreground font-semibold';
  return (
    <Link href={href}>
      <Button variant='ghost' size='sm' className={isActive ? activeClasses : ''} {...props}>
        {children}
      </Button>
    </Link>
  );
}
export default NavLink;
