'use client';

import * as React from 'react';
import {
  BookOpen,
  Bot,
  Command,
  Forward,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from 'lucide-react';
import { ArrowLeftRight, ArrowUpFromLine, ArrowDownFromLine, Wallet, HandCoins, LinkIcon, Users } from 'lucide-react';

import { NavMain } from '@/components/dashboard/nav-main';
import { NavProjects } from '@/components/dashboard/nav-projects';
import { NavSecondary } from '@/components/dashboard/nav-secondary';
import { NavUser } from '@/components/dashboard/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import siteLogo from '@/images/logo.svg';
import Link from 'next/link';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DashboardIcon } from '@radix-ui/react-icons';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: DashboardIcon,
    },
    {
      name: 'Transactions',
      url: '/dashboard/transactions',
      icon: ArrowLeftRight,
    },
    {
      name: 'Deposit',
      url: '/dashboard/deposit-withdraw?tab=deposit',
      icon: ArrowUpFromLine,
    },
    {
      name: 'Withdraw',
      url: '/dashboard/deposit-withdraw?tab=withdraw',
      icon: ArrowDownFromLine,
    },
    {
      name: 'Transfer funds',
      url: '/dashboard/transfer?tab=transfer',
      icon: Forward,
    },
    {
      name: 'Pay me',
      url: '/dashboard/transfer?tab=pay-me',
      icon: LinkIcon,
    },
    {
      name: 'Beneficiaries',
      url: '/dashboard/users',
      icon: Users,
    },
  ],
};

export function AppSidebar({ user, me, ...props }) {
  return (
    <Sidebar variant='inset' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <TooltipProvider>
              <Tooltip>
                <SidebarMenuButton size='lg' asChild>
                  <TooltipTrigger asChild>
                    <Link href='/dashboard'>
                      <div className='flex aspect-square size-8 items-center justify-center'>
                        <Image src={siteLogo} alt='Logo' width={64} height={64} className='mb-2 dark:invert' />
                      </div>
                      <div className='ms-1 grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-semibold'>Aurora Capital</span>
                        <span className='truncate text-xs text-muted-foreground'>User Dashboard</span>
                      </div>
                    </Link>
                  </TooltipTrigger>
                </SidebarMenuButton>
                <TooltipContent>
                  <p>Go to Home</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} me={me} />
      </SidebarFooter>
    </Sidebar>
  );
}
