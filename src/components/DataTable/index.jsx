'use client';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { CalendarIcon, MoreHorizontal } from 'lucide-react';
import { ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, parseISO } from 'date-fns';
import { DataTableColumnHeader } from './ColumnHeader';
import { DataTablePagination } from './Pagination';
import { DataTableViewOptions } from './ViewOptions';
import { cn, formatCurrency } from '@/lib/utils';
import { Calendar } from '../ui/calendar';

export function DataTable({ data, user, showOptions = true, pageSize = 10 }) {
  const columns = [
    {
      accessorKey: '_id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Transaction ID' className={'hidden md:inline-block'} />
      ),
      cell: ({ row }) => {
        return (
          <Badge variant='outline' className={'hidden text-xs md:inline-block'}>
            {'...' + row.getValue('_id').slice(-8)}
          </Badge>
        );
      },
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
        let isRed = row.getValue('amount') < 0;
        const type = row.getValue('type');
        return (
          <Badge
            variant='outline'
            className={`${isRed ? 'bg-red-200 dark:bg-red-800' : 'bg-green-200 dark:bg-green-800'}`}
          >
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
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const transaction = row.original;

        // TODO: Implement actions
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel className='text-muted-foreground'>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction._id)}>
                Copy transaction ID
              </DropdownMenuItem>
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View transaction details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = useState();
  const [globalFilter, setGlobalFilter] = useState('');
  const [date, setDate] = useState();
  const [columnFilters, setColumnFilters] = useState();

  useEffect(() => {
    const filterDate = date ? format(date, 'yyyy-MM-dd') : null;
    table.getColumn('createdAt')?.setFilterValue(filterDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
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
    // initialState: {
    //   pagination: {
    //     pageSize,
    //   },
    // },
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
          {/* FILTER BY DATE */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' size='sm' className={cn('ml-auto h-8 ps-3', !date && 'text-muted-foreground')}>
                <CalendarIcon className='mr-1 h-4 w-4' />
                {date ? format(date, 'MMMM dd, yyyy') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full p-0' align='start'>
              <Calendar mode='single' selected={date} onSelect={(newDate) => setDate(newDate)} initialFocus />
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
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='ps-6'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
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
      {/* <div className={cn('flex items-center justify-end space-x-2 py-4', !showOptions && 'hidden')}>
        <DataTablePagination table={table} />
      </div> */}
    </div>
  );
}
