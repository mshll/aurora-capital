import { getUser } from '@/actions/token';
import { myTransactions } from '@/actions/transactions';
import Transactions from '@/components/Transactions';
import TransactionTable from '@/components/TransactionTable';

async function TransactionsPage() {
  const transactions = await myTransactions();
  const user = await getUser();

  return <TransactionTable transactions={transactions} user={user} />;
  // return <Transactions transactions={transactions} user={user} />;

}

export default TransactionsPage;
