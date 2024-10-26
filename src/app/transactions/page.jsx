import { getUser } from '@/actions/token';
import { myTransactions } from '@/actions/transactions';
import Transactions from '@/components/Transactions';

async function TransactionsPage() {
  const transactions = await myTransactions();
  const user = await getUser();

  return <Transactions transactions={transactions} user={user} />;
}

export default TransactionsPage;
