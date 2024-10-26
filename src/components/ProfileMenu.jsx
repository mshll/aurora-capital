import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserIcon } from 'lucide-react';
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

async function ProfileMenu() {
  const user = await myProfile();
  console.log(user);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Link href='/profile'>
            <Avatar className='h-9 w-9'>
              <AvatarImage src={`${baseUrl}/${user.image}`} alt='ACB' />
              <AvatarFallback>
                <UserIcon className='h-5 w-5' />
              </AvatarFallback>
            </Avatar>
          </Link>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>Hello, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default ProfileMenu;
