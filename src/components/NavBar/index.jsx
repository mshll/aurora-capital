import Link from 'next/link';
import NavLink from './NavLink';
import AuthButtons from './AuthButtons';
import { metadata } from '@/app/layout';
import { ThemeToggler } from './ThemeToggler';
import siteLogo from '@/images/logo.svg';
import Image from 'next/image';

function NavBar() {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Transactions', href: '/transactions' },
    { name: 'Users', href: '/users' },
    // { name: 'Profile', href: '/profile' },
  ];

  return (
    <header className='sticky top-0 w-full border-b border-border bg-background'>
      <nav className='container mx-auto flex items-center justify-between p-3'>
        <Link href='/' className='flex items-center justify-center space-x-2'>
          <Image src={siteLogo} alt='Logo' width={40} height={40} className='mb-2' />
          {/* <h1 className='font-semibold tracking-tight'>{metadata.title}</h1> */}
        </Link>
        <div className='flex flex-1 items-center justify-center space-x-4'>
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className='flex items-center justify-center space-x-4'>
          <AuthButtons />
          <ThemeToggler />
        </div>
      </nav>
    </header>
  );
}
export default NavBar;
