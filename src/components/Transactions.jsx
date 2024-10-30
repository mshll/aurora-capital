'use client';

import { ArrowDownIcon, ArrowUpIcon, CalendarIcon, DollarSign, MoreHorizontal, Search } from 'lucide-react';
import { format, parseISO, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

function Transactions({ transactions, user }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [date, setDate] = useState();

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = ('' + transaction.amount).startsWith(query);
    const matchesFilter = filter === 'all' || transaction.type === filter;
    const matchesDate = !date || isSameDay(parseISO(transaction.createdAt), date);
    return matchesSearch && matchesFilter && matchesDate;
  });

  const transactionList = filteredTransactions.map((transaction) => {
    let isRed = false;
    if (transaction.type === 'transfer' && transaction.from === user._id) isRed = true;
    if (transaction.type === 'withdraw') isRed = true;

    const amount = Number.isInteger(transaction.amount) ? transaction.amount : transaction.amount.toFixed(3);

    return (
      <Card key={`transactions-comp-${transaction._id}`}>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Download receipt</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-4'>
            <div className='flex-1 space-y-1'>
              <p className='flex items-center text-sm text-muted-foreground'>
                <CalendarIcon className='mr-1 h-4 w-4' />
                {format(parseISO(transaction.createdAt), 'MMMM dd, yyyy, hh:mm a')}
              </p>
              <p className='text-2xl font-bold'>
                <span className={isRed ? 'text-destructive' : 'text-success'}>
                  {isRed ? (
                    <ArrowDownIcon className='mr-1 inline h-5 w-5' />
                  ) : (
                    <ArrowUpIcon className='mr-1 inline h-5 w-5' />
                  )}
                  ${amount}
                </span>
              </p>
            </div>
            {/* <div className="flex flex-col items-end justify-between">
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="text-sm font-medium">${transaction.balance.toFixed(3)}</p>
                  </div> */}
          </div>
        </CardContent>
      </Card>
    );
  });

  return (
    <div className='flex h-full flex-1 flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20'>
      <div className='no-scrollbar h-[500px] w-[900px] overflow-y-auto rounded-lg border bg-card p-6 text-card-foreground shadow-sm'>
        <div className='mb-6 flex flex-col space-y-1.5'>
          <h3 className='text-2xl font-semibold leading-none tracking-tight'>Recent Transactions</h3>
        </div>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-x-2 sm:space-y-0'>
            <div className='relative w-full sm:max-w-sm'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search for a transaction'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='pl-8'
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'MMMM dd, yyyy') : 'Filter by date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar mode='single' selected={date} onSelect={(newDate) => setDate(newDate)} initialFocus />
              </PopoverContent>
            </Popover>

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className='w-full sm:w-[180px]'>
                <SelectValue placeholder='Filter by type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Transactions</SelectItem>
                <SelectItem value='withdraw'>Withdrawls</SelectItem>
                <SelectItem value='deposit'>Deposits</SelectItem>
                <SelectItem value='transfer'>Transfers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>{transactionList}</div>
        </div>
      </div>
    </div>
  );
}
export default Transactions;
