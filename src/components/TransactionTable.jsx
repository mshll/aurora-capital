'use client';

import { ArrowDownIcon, ArrowUpIcon, CalendarIcon, DollarSign, MoreHorizontal, Search } from 'lucide-react';
import { format, parseISO, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useRef, useEffect } from 'react';

function TransactionTable({ transactions, user }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [date, setDate] = useState();
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const headerRef = useRef(null);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleClickOutside = (event) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      setSortField(null); // Deselect the active sort field when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sortedTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = ('' + transaction.amount).startsWith(query);
      const matchesFilter = filter === 'all' || transaction.type === filter;
      const matchesDate = !date || isSameDay(parseISO(transaction.createdAt), date);
      return matchesSearch && matchesFilter && matchesDate;
    })
    .sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortField === 'amount') {
        if (sortOrder === 'asc') {
          if (a.amount < 0 && b.amount >= 0) return -1;
          if (a.amount >= 0 && b.amount < 0) return 1;
          return a.amount - b.amount; // Regular ascending for same sign
        } else {
          if (a.amount >= 0 && b.amount < 0) return -1;
          if (a.amount < 0 && b.amount >= 0) return 1;
          return b.amount - a.amount; // Regular descending for same sign
        }
      } else if (sortField === 'type') {
        return sortOrder === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
      }
      return 0;
    });

  const transactionList = sortedTransactions.map((transaction) => {
    let isRed = false;
    if (transaction.type === 'transfer' && transaction.from === user._id) isRed = true;
    if (transaction.type === 'withdraw') isRed = true;

    const amount = Number.isInteger(transaction.amount) ? transaction.amount : transaction.amount.toFixed(3);

    return (
      <TableRow key={transaction._id} className='h-16'>
        <TableCell className='text-left text-lg'>
          {format(parseISO(transaction.createdAt), 'MMMM dd, yyyy, hh:mm a')}
        </TableCell>
        <TableCell className='w-1/4 text-center text-lg'>
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </TableCell>
        <TableCell className='w-1/4 text-center text-lg'>
          <span className={isRed ? 'text-red-500' : 'text-green-500'}>
            {isRed ? (
              <ArrowDownIcon className='mr-1 inline h-5 w-5' />
            ) : (
              <ArrowUpIcon className='mr-1 inline h-5 w-5' />
            )}
            ${amount}
          </span>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div className='no-scrollbar h-full overflow-hidden rounded-lg border bg-card px-6 text-card-foreground shadow-sm'>
      {/* Sticky container for the title and filter/search bar */}
      <div className='sticky top-0 z-10 flex flex-col gap-2 gap-y-2 bg-card pb-5 pt-5 shadow-md'>
        <h3 className='text-left text-lg font-semibold leading-none tracking-tight'>Recent Transactions</h3>
        <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-x-2 sm:space-y-0'>
          <div className='relative flex-1'>
            <Search className='absolute left-2.5 top-3 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search for a transaction'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='text-md h-10 pl-8'
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn('text-md justify-start text-left font-normal', !date && 'text-muted-foreground')}
              >
                <CalendarIcon className='mr-2 h-5 w-5' />
                {date ? format(date, 'MMMM dd, yyyy') : 'Filter by date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0' align='start'>
              <Calendar mode='single' selected={date} onSelect={(newDate) => setDate(newDate)} initialFocus />
            </PopoverContent>
          </Popover>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className='text-md h-auto w-full text-muted-foreground sm:w-[180px]'>
              <SelectValue placeholder='Filter by type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Transactions</SelectItem>
              <SelectItem value='withdraw'>Withdrawals</SelectItem>
              <SelectItem value='deposit'>Deposits</SelectItem>
              <SelectItem value='transfer'>Transfers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='no-scrollbar mt-4 max-h-[400px] overflow-y-auto'>
        <Table>
          <TableHeader className='sticky top-0 z-10 bg-card' ref={headerRef}>
            <TableRow className='h-12'>
              <TableHead
                className={cn(
                  'cursor-pointer text-left text-lg transition-colors',
                  sortField === 'date' ? 'bg-gray-300 text-gray-800' : 'hover:bg-gray-200 hover:text-gray-800',
                )}
                onClick={() => toggleSort('date')}
              >
                Date
              </TableHead>
              <TableHead
                className={cn(
                  'cursor-pointer text-center text-lg transition-colors',
                  sortField === 'type' ? 'bg-gray-300 text-gray-800' : 'hover:bg-gray-200 hover:text-gray-800',
                )}
                onClick={() => toggleSort('type')}
              >
                Type
              </TableHead>
              <TableHead
                className={cn(
                  'cursor-pointer text-center text-lg transition-colors',
                  sortField === 'amount' ? 'bg-gray-300 text-gray-800' : 'hover:bg-gray-200 hover:text-gray-800',
                )}
                onClick={() => toggleSort('amount')}
              >
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{transactionList}</TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TransactionTable;
