'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, formatCurrency } from '@/lib/utils';
import { CornerUpRightIcon, Search, UserIcon } from 'lucide-react';
import { useState } from 'react';
import TransferForm from './TransferForm';

function GetAllUsers({ baseUrl, users, singleCol = false }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username?.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'all' || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  const userList = filteredUsers.map((user) => {
    const balance = formatCurrency(user.balance);

    return (
      <Card key={`get-all-users-${user._id}`}>
        <CardContent className='flex items-center justify-start gap-4 px-6 py-6'>
          <div className='flex flex-1 flex-row items-center justify-start gap-4 overflow-hidden text-ellipsis'>
            <Avatar className='h-12 w-12'>
              <AvatarImage src={`${baseUrl}/${user.image}`} alt='User' className='bg-muted' />
              <AvatarFallback>
                <UserIcon className='h-5 w-5' />
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col gap-1 overflow-hidden text-ellipsis'>
              <h3 className='overflow-hidden text-ellipsis text-xl font-medium'>{user.username}</h3>
              <p
                className={`text-sm ${user.balance > 1000000 ? 'font-semibold text-amber-700 dark:text-amber-500' : 'text-muted-foreground'}`}
              >
                {balance}
              </p>
            </div>
          </div>

          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DialogTrigger asChild>
                    <div className={cn('h-9 w-9 p-0', buttonVariants({ variant: 'ghost' }))}>
                      <CornerUpRightIcon className='h-5 w-5' />
                    </div>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Transfer funds to {user.username}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Transfer to {user.username}</DialogTitle>
                <DialogDescription>Please enter the amount you&apos;d like to transfer</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='flex'>
                  <TransferForm username={user.username} />
                </div>
              </div>
              <DialogFooter className={'gap-4'}>
                <DialogClose asChild>
                  <Button variant={'destructive'}>Cancel</Button>
                </DialogClose>

                <Button variant={'secondary'}>
                  <label htmlFor='submit-transfer-form' tabIndex='0'>
                    Transfer
                  </label>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  });

  return (
    <div className='flex h-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm'>
      <div className='sticky top-0 z-10 w-full bg-card px-4 py-6'>
        <Search className='absolute left-8 top-8 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search for a user'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='pl-14'
        />
      </div>

      <div className='flex-1 overflow-y-auto px-4 pb-4'>
        <div className={cn(`grid gap-4`, singleCol ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3')}>{userList}</div>
      </div>
    </div>
  );
}

export default GetAllUsers;
