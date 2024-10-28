import { getUser } from '@/actions/token';
import { myTransactions } from '@/actions/transactions';
import Transactions from '@/components/Transactions';
import TransactionTable from '@/components/TransactionTable';
import TransferLinkWidget from '@/components/TransferLinkWidget';
import { getAllUsers, myProfile } from '@/actions/users';

async function TransactionsPage() {
  const transactions = await myTransactions();
  const me = await myProfile();
  const user = await getUser();
  const allUsers = await getAllUsers();

  return (
  // <TransactionTable transactions={transactions} user={user} />
  <TransferLinkWidget me={me} users={allUsers} />
  )

}

export default TransactionsPage;
