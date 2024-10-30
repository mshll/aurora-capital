import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BadgeCheck, LayoutDashboard, LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/actions/auth';
import { myProfile } from '@/actions/users';
import { baseUrl } from '@/actions/config';
import { getGreeting } from '@/lib/utils';

async function ProfileMenu() {
  const user = await myProfile();

  const profileItems = [
    { name: 'My Account', href: '/profile', icon: <BadgeCheck /> },
    { name: 'View Dashboard', href: '/dashboard', icon: <LayoutDashboard /> },
    // { name: 'Transactions', href: '/transactions' },
    // { name: 'Users', href: '/users' },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='cursor-pointer'>
          <Avatar className='h-9 w-9 border border-border'>
            <AvatarImage src={`${baseUrl}/${user.image}`} alt='ACB' />
            <AvatarFallback>
              <UserIcon className='h-5 w-5' />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end'>
          <DropdownMenuLabel>
            {getGreeting()}, {user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}!
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profileItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <DropdownMenuItem>
                {/* {item.icon} */}
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className='cursor-pointer text-destructive'>
            {/* <LogOutIcon /> */}
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default ProfileMenu;
