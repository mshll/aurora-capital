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
import { Label } from '@/components/ui/label';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, UserIcon } from 'lucide-react';
import Transactions from './Transactions';
import TransferForm from './TransferForm';

function GetAllUsers({ users }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username?.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'all' || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  const userList = filteredUsers.map((user) => {
    return (
      <Card key={user._id}>
        <CardHeader className='flex-col items-center justify-between'>
          <CardTitle className='text-2xl font-medium'>{user.username}</CardTitle>
          <Avatar className='h-14 w-14'>
            <AvatarImage src={`https://react-bank-project.eapi.joincoded.com/${user.image}`} alt='ACB' />
            <AvatarFallback>
              <UserIcon className='h-5 w-5' />
            </AvatarFallback>
          </Avatar>
        </CardHeader>

        <CardContent>
          <div className='flex flex-col items-center space-x-4'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm text-muted-foreground'>Balance: ${user.balance.toFixed(2)}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='outline'>Transfer</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Transfer</DialogTitle>
                    <DialogDescription>Enter the amount you'd like to transfer to {user.username} </DialogDescription>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <div className='flex'>
                      {/* <Label htmlFor='name' className='text-right'>
                        Amount
                      </Label> */}
                      {/*  */}
                      <TransferForm username={user.username} />

                      {/*  */}
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button>Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  });

  return (
    <div className='flex h-full flex-1 flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20'>
      <div className='no-scrollbar h-[500px] w-[900px] overflow-y-auto rounded-lg border bg-card p-6 text-card-foreground shadow-sm'>
        <div className='mb-6 flex flex-col space-y-1.5'>
          <h3 className='text-2xl font-semibold leading-none tracking-tight'>User List</h3>
        </div>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-x-2 sm:space-y-0'>
            <div className='relative w-full sm:max-w-sm'>
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

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>{userList}</div>
        </div>
      </div>
    </div>
  );
}

export default GetAllUsers;
