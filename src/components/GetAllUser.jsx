'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CornerUpRightIcon, Search, UserIcon } from 'lucide-react';
import TransferForm from './TransferForm';

function GetAllUsers({ baseUrl, users }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username?.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'all' || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  const userList = filteredUsers.map((user) => {
    const balance = Number.isInteger(user.balance) ? user.balance : user.balance.toFixed(3);
    return (
      <Card key={user._id}>
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
                className={`text-sm ${balance > 1000000 ? 'font-semibold text-amber-700 dark:text-amber-500' : 'text-muted-foreground'}`}
              >
                {balance > 0 ? '$' + balance : 'Broke :('}
              </p>
            </div>
          </div>

          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DialogTrigger asChild>
                    <div className='hover:cursor-pointer'>
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
                <DialogTitle>Transfer</DialogTitle>
                <DialogDescription>Enter the amount you&apos;d like to transfer to {user.username}</DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='flex'>
                  <TransferForm username={user.username} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  });

  return (
    <div className='flex h-full flex-1 flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20'>
      <div className='no-scrollbar h-[500px] w-[900px] overflow-y-auto rounded-lg border bg-card p-6 text-card-foreground shadow-sm'>
        <div className='mb-6 flex w-full items-center justify-center gap-2'>
          <h3 className='flex-1 text-2xl font-semibold leading-none tracking-tight'>User List</h3>
          <div className='flex flex-1 flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-x-2 sm:space-y-0'>
            <div className='relative w-full'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search for a user'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='pl-8'
              />
            </div>

            {/* <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className='w-full sm:w-[180px]'>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Users</SelectItem>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='inactive'>Inactive</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </div>
        <div className='flex flex-col space-y-4'>
          <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-2'>{userList}</div>
        </div>
      </div>
    </div>
  );
}

export default GetAllUsers;
