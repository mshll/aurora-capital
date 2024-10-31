import { getUser } from '@/actions/token';
import { myTransactions } from '@/actions/transactions';
import { getAllUsers, myProfile } from '@/actions/users';
import { DataTable } from '@/components/DataTable';

async function TransactionsPage() {
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
    <div className='flex w-full auto-cols-auto auto-rows-min flex-col items-stretch gap-4'>
      <DataTable data={transactions} user={user} pageSize={12} allUsers={allUsers} />
    </div>
  );
}

export default TransactionsPage;
