import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import siteLogo from '@/images/logo.svg';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import AuthButtons from './AuthButtons';
import NavLink from './NavLink';
import { ThemeToggler } from './ThemeToggler';

function NavBar() {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className='fixed top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-lg backdrop-filter'>
      <nav className='container mx-auto flex items-center justify-between p-3'>
        <div className='flex flex-1 items-center justify-center space-x-2 md:justify-start'>
          <Link href='/' className=''>
            <Image src={siteLogo} alt='Logo' width={64} height={64} className='mb-4 dark:invert' />
          </Link>
        </div>
        {/* Desktop navigation */}
        <div className='hidden items-center justify-center space-x-4 md:flex'>
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile navigation */}
        <div className='order-first flex-1 md:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon' className='h-9 w-9'>
                <HamburgerMenuIcon className='h-6 w-6' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel className='text-muted-foreground/50'>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {navItems.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <Link href={item.href}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex flex-1 items-center justify-end space-x-4'>
          <AuthButtons />
          <ThemeToggler />
        </div>
      </nav>
    </header>
  );
}
export default NavBar;
