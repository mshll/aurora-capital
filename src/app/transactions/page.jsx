import { getUser } from '@/actions/token';
import { myTransactions } from '@/actions/transactions';
import MainLayout from '@/components/MainLayout';
import Transactions from '@/components/Transactions';
import TransactionTable from '@/components/TransactionTable';

async function TransactionsPage() {
  const transactions = await myTransactions();
  const user = await getUser();

  return (
    <MainLayout>
      <Transactions transactions={transactions} user={user} />
    </MainLayout>
  );
}

export default TransactionsPage;
