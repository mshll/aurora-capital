import { getUser } from '@/actions/token';
import { myTransactions } from '@/actions/transactions';
import MainLayout from '@/components/MainLayout';
import Transactions from '@/components/Transactions';
import TransactionTable from '@/components/TransactionTable';
import TransferLinkWidget from '@/components/TransferLinkWidget';
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
    <div className='flex w-full auto-cols-auto auto-rows-min items-stretch gap-4'>
      {/* <TransactionTable transactions={transactions} user={user} /> */}
      <DataTable data={transactions} user={user} pageSize={12} />
    </div>
    // <MainLayout>
    //   <TransferLinkWidget user={user} me={me} users={allUsers} />
    // </MainLayout>
  );
}

export default TransactionsPage;
