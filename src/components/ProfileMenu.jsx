import { logout } from '@/actions/auth';
import { baseUrl } from '@/actions/config';
import { myProfile } from '@/actions/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getGreeting } from '@/lib/utils';
import { BadgeCheck, LayoutDashboard, UserIcon } from 'lucide-react';
import Link from 'next/link';

async function ProfileMenu() {
  const user = await myProfile();

  const profileItems = [
    { name: 'My Account', href: '/dashboard/profile', icon: <BadgeCheck /> },
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
