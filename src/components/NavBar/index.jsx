import Link from 'next/link';
import NavLink from './NavLink';
import AuthButtons from './AuthButtons';
import { metadata } from '@/app/layout';
import { ThemeToggler } from './ThemeToggler';
import Image from 'next/image';
import siteLogo from '@/images/logo.svg';

function NavBar() {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/aboutUs' },
    { name: 'Contact', href: '/contact' },
    // { name: 'Profile', href: '/profile' },
  ];

  return (
    <header className='fixed top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-lg backdrop-filter'>
      <nav className='container mx-auto flex items-center justify-between p-3'>
        <div className='flex flex-1 items-center justify-start space-x-2'>
          <Link href='/' className=''>
            <Image src={siteLogo} alt='Logo' width={64} height={64} className='mb-4 dark:invert' />
          </Link>
        </div>
        <div className='flex items-center justify-center space-x-4'>
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.name}
            </NavLink>
          ))}
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
