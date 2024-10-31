import { baseUrl } from '@/actions/config';
import { getUser } from '@/actions/token';
import { myTransactions } from '@/actions/transactions';
import { getAllUsers, myProfile } from '@/actions/users';
import DepositWithdrawWidget from '@/components/DepositWithdrawWidget';
import GetAllUsers from '@/components/GetAllUser';
import TransactionTable from '@/components/TransactionTable';
import TransferLinkWidget from '@/components/TransferLinkWidget';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Maximize2 } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const me = await myProfile();
  const user = await getUser();
  const allUsers = await getAllUsers();

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
    <div className='grid max-h-full grid-cols-1 gap-4 px-4 pt-0 lg:grid-cols-3'>
      <DepositWithdrawWidget className={'flex flex-1 flex-col'} />

      <TransferLinkWidget
        className={'flex flex-1 flex-col'}
        user={user}
        me={me}
        users={allUsers}
        defaultTab='pay-me'
        minTransfer={true}
      />

      <div className='order-last row-span-3 flex max-h-[calc(100vh-7rem)] min-h-0 flex-col lg:order-none lg:col-span-1'>
        <div className='mb-3 flex w-full flex-shrink-0 items-center justify-between px-2'>
          <h2 className='text-xl font-semibold'>Beneficiary List</h2>
          <Link className={cn(buttonVariants({ variant: 'ghost' }), 'h-8 w-8 p-0')} href={'/dashboard/users'}>
            <Maximize2 className='h-4 w-4' />
          </Link>
        </div>
        <div className='flex min-h-0 flex-1 flex-col overflow-hidden'>
          <GetAllUsers baseUrl={baseUrl} users={allUsers} singleCol />
        </div>
      </div>

      <div className='min-h-0 flex-1 rounded-xl lg:col-span-2'>
        <div className='container mx-auto'>
          <div className='mb-3 flex w-full items-center justify-between px-2'>
            <h2 className='text-xl font-semibold'>Recent Transactions</h2>
            <Link className={cn(buttonVariants({ variant: 'ghost' }), 'h-8 w-8 p-0')} href={'/dashboard/transactions'}>
              <Maximize2 className='h-4 w-4' />
            </Link>
          </div>
          <TransactionTable transactions={transactions} user={user} />
        </div>
      </div>
    </div>
  );
}
