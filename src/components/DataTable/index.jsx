'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn, formatCurrency } from '@/lib/utils';
import { format, isWithinInterval, parseISO } from 'date-fns';
import { CalendarIcon, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Calendar } from '../ui/calendar';
import { DataTableColumnHeader } from './ColumnHeader';
import { DataTableViewOptions } from './ViewOptions';

export function DataTable({ data, user, allUsers, showOptions = true, pageSize = 10 }) {
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const columns = [
    {
      accessorKey: '_id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Transaction ID' className='hidden md:inline-block' />
      ),
      cell: ({ row }) => (
        <Badge variant='outline' className='hidden text-xs md:inline-block'>
          {'...' + row.getValue('_id').slice(-8)}
        </Badge>
      ),
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Amount' />,
      cell: ({ row }) => {
        const amount = formatCurrency(parseFloat(row.getValue('amount')));
        return (
          <div className='font-medium'>
            {row.getValue('amount') > 0 ? '+' : ''}
            {amount}
          </div>
        );
      },
    },
    {
      accessorKey: 'type',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Transaction Type' />,
      cell: ({ row }) => {
        const isRed = row.getValue('amount') < 0;
        const type = row.getValue('type');
        return (
          <Badge variant='outline' className={`${isRed ? 'text-destructive' : 'text-success'}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Created At' />,
      cell: ({ row }) => {
        const date = row.getValue('createdAt');
        return <div>{format(parseISO(date), 'yyyy-MM-dd hh:mm:ss a')}</div>;
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue.from && !filterValue.to) return true;
        const rowDate = parseISO(row.getValue(columnId));
        return isWithinInterval(rowDate, {
          start: filterValue.from || new Date(-8640000000000000),
          end: filterValue.to || new Date(8640000000000000),
        });
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const transaction = row.original;
        const from =
          user._id === transaction.from ? 'You' : allUsers.find((user) => user._id === transaction.from)?.username;
        const to = user._id === transaction.to ? 'You' : allUsers.find((user) => user._id === transaction.to)?.username;
        const self = from === to;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {!self && (
                <>
                  <DropdownMenuLabel className='text-muted-foreground'>From: {from}</DropdownMenuLabel>
                  <DropdownMenuLabel className='text-muted-foreground'>To: {to}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction._id)}>
                Copy transaction ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = useState();
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);

  // Set the date range filter for the createdAt column
  useEffect(() => {
    setColumnFilters((filters) => [
      ...filters.filter((filter) => filter.id !== 'createdAt'),
      { id: 'createdAt', value: dateRange },
    ]);
  }, [dateRange]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
  });

  return (
    <div className='size-full'>
      <div className={cn('flex items-center justify-between py-4', !showOptions && 'hidden')}>
        <Input
          placeholder='Filter transactions...'
          value={globalFilter}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          className='max-w-sm'
        />
        <div className='flex gap-3'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id='date'
                variant='outline'
                className={cn(
                  'w-[300px] justify-start text-left font-normal',
                  !dateRange.from && 'text-muted-foreground',
                )}
              >
                <CalendarIcon />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'MMMM dd, yyyy')} - {format(dateRange.to, 'MMMM dd, yyyy')}
                    </>
                  ) : (
                    format(dateRange.from, 'MMMM dd, yyyy')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                initialFocus
                mode='range'
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={(newRange) => setDateRange(newRange || { from: null, to: null })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='ps-6'>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='ps-6'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
