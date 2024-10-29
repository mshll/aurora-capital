import { myTransactions } from '@/actions/transactions';
import { myProfile } from '@/actions/users';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import TransactionTable from '@/components/TransactionTable';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Maximize2 } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await myProfile();
  const transactions = await myTransactions().then((data) => {
    return data.map((transaction) => {
      let isNegative = false;
      if (transaction.type === 'transfer' && transaction.from === user._id) isNegative = true;
      if (transaction.type === 'withdraw') isNegative = true;
      const newTransaction = { ...transaction, amount: isNegative ? -transaction.amount : transaction.amount };
      return newTransaction;
    });
  });

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
            <div className='aspect-video rounded-xl bg-muted/50' />
            <div className='aspect-video rounded-xl bg-muted/50' />
            <div className='aspect-video rounded-xl bg-muted/50' />
          </div>
          <div className='min-h-[100vh] flex-1 rounded-xl md:min-h-min'>
            <div className='container mx-auto'>
              <div className='mb-3 flex w-full items-center justify-between px-2'>
                <h2 className='text-xl font-semibold'>Recent Transactions</h2>
                <Link className={cn(buttonVariants({ variant: 'ghost' }), 'h-8 w-8 p-0')} href={'/transactions'}>
                  <Maximize2 className='h-4 w-4' />
                </Link>
              </div>
              <TransactionTable transactions={transactions} user={user} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
