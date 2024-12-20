'use client';

import { logout } from '@/actions/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { formatCurrency } from '@/lib/utils';
import { ChevronsUpDown, UserIcon } from 'lucide-react';
import Link from 'next/link';

export function NavUser({ user, me }) {
  const { isMobile } = useSidebar();
  const baseUrl = 'https://react-bank-project.eapi.joincoded.com';
  const balance = formatCurrency(me.balance);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 border border-border'>
                <AvatarImage src={`${baseUrl}/${user.image}`} alt='User' />
                <AvatarFallback>
                  <UserIcon className='h-5 w-5' />
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{'Hi, ' + me.username}!</span>
                <span className='truncate text-xs'>Member since 2024</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={`${baseUrl}/${user.image}`} alt='User' />
                  <AvatarFallback>
                    <UserIcon className='h-5 w-5' />
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{me.username}</span>
                  <span className='truncate text-xs'>{balance}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href='/dashboard/profile'>My Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href='/'>Back to Home</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className='cursor-pointer text-destructive'>
              {/* <LogOut /> */}
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
